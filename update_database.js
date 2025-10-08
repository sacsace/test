const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
  connectionString: 'postgresql://postgres:fcHTXObYvxOhCEpbIdabJKYOEcwCzPyX@hopper.proxy.rlwy.net:30286/railway'
});

async function updateDatabase() {
  try {
    await client.connect();
    console.log('🔗 Railway PostgreSQL에 연결되었습니다.');

    // 현재 데이터 확인
    console.log('\n📋 현재 사용자 데이터:');
    const currentUsers = await client.query('SELECT id, username, email, created_at FROM users ORDER BY id;');
    console.log(currentUsers.rows);

    // 비밀번호 해시 생성
    console.log('\n🔐 비밀번호 해시 생성 중...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const newHashedPassword = await bcrypt.hash('userpass456', 10);

    // 기존 사용자 비밀번호 업데이트
    console.log('\n🔄 기존 사용자 비밀번호 업데이트 중...');
    await client.query('UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE username = $2', 
      [hashedPassword, 'admin']);
    console.log('✅ admin 사용자 비밀번호 업데이트 완료');

    await client.query('UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE username = $2', 
      [hashedPassword, 'testuser']);
    console.log('✅ testuser 사용자 비밀번호 업데이트 완료');

    // 새로운 사용자 추가
    console.log('\n➕ 새로운 사용자 추가 중...');
    await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) ON CONFLICT (username) DO NOTHING', 
      ['manager', 'manager@example.com', newHashedPassword]);
    console.log('✅ manager 사용자 추가 완료');

    await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) ON CONFLICT (username) DO NOTHING', 
      ['staff', 'staff@example.com', newHashedPassword]);
    console.log('✅ staff 사용자 추가 완료');

    await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) ON CONFLICT (username) DO NOTHING', 
      ['customer', 'customer@example.com', newHashedPassword]);
    console.log('✅ customer 사용자 추가 완료');

    // 업데이트된 데이터 확인
    console.log('\n👥 최종 사용자 목록:');
    const finalUsers = await client.query('SELECT id, username, email, created_at, updated_at FROM users ORDER BY id;');
    console.log(finalUsers.rows);

    console.log('\n🎉 데이터베이스 업데이트가 완료되었습니다!');

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  } finally {
    await client.end();
  }
}

updateDatabase();
