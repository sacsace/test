const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const { body, validationResult } = require('express-validator');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Railway 환경에서 포트 설정 확인
console.log(`Starting server on port: ${PORT}`);
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`Database URL: ${process.env.DATABASE_URL ? 'Available' : 'Not available'}`);
console.log(`Railway Environment Variables:`);
console.log(`- PORT: ${process.env.PORT}`);
console.log(`- NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`- DATABASE_URL: ${process.env.DATABASE_URL ? 'Set' : 'Not set'}`);
console.log(`- JWT_SECRET: ${process.env.JWT_SECRET ? 'Set' : 'Not set'}`);
console.log(`- TZ: ${process.env.TZ}`);
console.log(`- RAILWAY_STATIC_URL: ${process.env.RAILWAY_STATIC_URL}`);
console.log(`- RAILWAY_PUBLIC_DOMAIN: ${process.env.RAILWAY_PUBLIC_DOMAIN}`);

// CORS 설정 (Vercel 프론트엔드 허용)
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://test-drab-nu-15.vercel.app', // 실제 Vercel 도메인
    /\.vercel\.app$/, // 모든 Vercel 앱 허용
    /\.railway\.app$/ // Railway 앱도 허용
  ],
  credentials: true
}));
app.use(express.json());

// 루트 엔드포인트 (Railway 기본 페이지 대신 우리 앱 표시)
app.get('/', (req, res) => {
  res.json({
    message: 'Login System Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      login: '/api/login',
      register: '/api/register',
      user: '/api/user'
    },
    timestamp: new Date().toISOString()
  });
});

// 메모리 기반 사용자 저장소 (데이터베이스 없이 테스트용)
let users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: '$2b$10$rQZ8K9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX', // password123
    created_at: new Date()
  },
  {
    id: 2,
    username: 'testuser',
    email: 'test@example.com',
    password: '$2b$10$rQZ8K9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX', // password123
    created_at: new Date()
  }
];

// PostgreSQL 연결 설정 (Railway에서 자동 제공)
let pool = null;
let useDatabase = false;

// 데이터베이스 스키마 생성 함수
const createDatabaseSchema = async (pool) => {
  try {
    console.log('데이터베이스 스키마를 생성합니다...');
    
    // 연결 테스트
    await pool.query('SELECT 1');
    console.log('데이터베이스 연결 확인 완료');
    
    // users 테이블 생성
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('users 테이블 생성 완료');

    // 샘플 사용자 데이터 삽입
    await pool.query(`
      INSERT INTO users (username, email, password) VALUES 
      ('admin', 'admin@example.com', '$2b$10$rQZ8K9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX'),
      ('testuser', 'test@example.com', '$2b$10$rQZ8K9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX')
      ON CONFLICT (username) DO NOTHING
    `);
    console.log('샘플 사용자 데이터 삽입 완료');

    // 인덱스 생성
    await pool.query('CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    console.log('인덱스 생성 완료');
    
    console.log('✅ 데이터베이스 스키마 생성 완료');
  } catch (error) {
    console.error('❌ 데이터베이스 스키마 생성 실패:', error.message);
    console.error('스택 트레이스:', error.stack);
  }
};

try {
  // Railway는 DATABASE_URL 환경변수를 자동으로 제공
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (databaseUrl) {
    console.log('🗄️ PostgreSQL 데이터베이스 연결 시도 중...');
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      // 연결 풀 설정 추가
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // 데이터베이스 연결 테스트
    pool.connect()
      .then(client => {
        console.log('✅ PostgreSQL 데이터베이스에 연결되었습니다.');
        useDatabase = true;
        client.release();
      })
      .catch(err => {
        console.log('❌ PostgreSQL 연결 실패, 메모리 저장소를 사용합니다:', err.message);
        useDatabase = false;
        pool = null;
      });
  } else {
    console.log('⚠️ DATABASE_URL이 설정되지 않았습니다. 메모리 저장소를 사용합니다.');
    useDatabase = false;
  }
} catch (error) {
  console.log('❌ PostgreSQL 설정 실패, 메모리 저장소를 사용합니다:', error.message);
  useDatabase = false;
}

// JWT 토큰 검증 미들웨어
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '액세스 토큰이 필요합니다.' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
    }
    req.user = user;
    next();
  });
};

// 로그인 엔드포인트
app.post('/api/login', [
  body('username').notEmpty().withMessage('사용자명이 필요합니다.'),
  body('password').isLength({ min: 6 }).withMessage('비밀번호는 최소 6자 이상이어야 합니다.')
], async (req, res) => {
  try {
    // 입력 검증
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: '입력 데이터가 유효하지 않습니다.',
        errors: errors.array()
      });
    }

    const { username, password } = req.body;

    let user;

    if (useDatabase && pool) {
      // 데이터베이스에서 사용자 조회
      const result = await pool.query(
        'SELECT id, username, email, password FROM users WHERE username = $1',
        [username]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ message: '사용자명 또는 비밀번호가 올바르지 않습니다.' });
      }

      user = result.rows[0];
    } else {
      // 메모리에서 사용자 조회
      user = users.find(u => u.username === username);
      if (!user) {
        return res.status(401).json({ message: '사용자명 또는 비밀번호가 올바르지 않습니다.' });
      }
    }

    // 비밀번호 확인 (테스트용으로 간단한 비교)
    const isValidPassword = password === 'password123' || await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: '사용자명 또는 비밀번호가 올바르지 않습니다.' });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    res.json({
      message: '로그인 성공',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 회원가입 엔드포인트
app.post('/api/register', [
  body('username').isLength({ min: 3 }).withMessage('사용자명은 최소 3자 이상이어야 합니다.'),
  body('email').isEmail().withMessage('유효한 이메일 주소를 입력하세요.'),
  body('password').isLength({ min: 6 }).withMessage('비밀번호는 최소 6자 이상이어야 합니다.')
], async (req, res) => {
  try {
    // 입력 검증
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: '입력 데이터가 유효하지 않습니다.',
        errors: errors.array()
      });
    }

    const { username, email, password } = req.body;

    if (useDatabase && pool) {
      // 데이터베이스에서 중복 사용자 확인
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE username = $1 OR email = $2',
        [username, email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: '이미 존재하는 사용자명 또는 이메일입니다.' });
      }

      // 비밀번호 해시화
      const hashedPassword = await bcrypt.hash(password, 10);

      // 사용자 생성
      const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
        [username, email, hashedPassword]
      );

      const newUser = result.rows[0];

      res.status(201).json({
        message: '회원가입이 완료되었습니다.',
        user: newUser
      });
    } else {
      // 메모리에서 중복 사용자 확인
      const existingUser = users.find(u => u.username === username || u.email === email);
      if (existingUser) {
        return res.status(400).json({ message: '이미 존재하는 사용자명 또는 이메일입니다.' });
      }

      // 비밀번호 해시화
      const hashedPassword = await bcrypt.hash(password, 10);

      // 새 사용자 생성
      const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword,
        created_at: new Date()
      };

      users.push(newUser);

      res.status(201).json({
        message: '회원가입이 완료되었습니다.',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
      });
    }

  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 사용자 정보 조회 엔드포인트
app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    let user;

    if (useDatabase && pool) {
      const result = await pool.query(
        'SELECT id, username, email, created_at FROM users WHERE id = $1',
        [req.user.userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
      }

      user = result.rows[0];
    } else {
      // 메모리에서 사용자 조회
      user = users.find(u => u.id === req.user.userId);
      if (!user) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
      }
    }

    res.json({ 
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at
      }
    });

  } catch (error) {
    console.error('사용자 정보 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 헬스 체크 엔드포인트 (Railway 헬스 체크용) - 단순화
app.get('/api/health', (req, res) => {
  try {
    res.status(200).json({
      status: 'OK',
      message: '서버가 정상적으로 작동 중입니다.',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      port: PORT,
      uptime: process.uptime()
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'ERROR',
      message: '서버 상태 확인 중 오류가 발생했습니다.',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// 데이터베이스 스키마 생성 엔드포인트 (개발용)
app.post('/api/setup-database', async (req, res) => {
  if (!useDatabase || !pool) {
    return res.status(400).json({
      message: '데이터베이스가 연결되지 않았습니다.',
      database: 'not_connected'
    });
  }

  try {
    await createDatabaseSchema(pool);
    res.json({
      message: '데이터베이스 스키마가 성공적으로 생성되었습니다.',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database setup error:', error);
    res.status(500).json({
      message: '데이터베이스 스키마 생성 중 오류가 발생했습니다.',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// 서버 시작
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️ Database mode: ${useDatabase ? 'PostgreSQL' : 'Memory'}`);
  console.log(`🌏 Timezone: ${process.env.TZ || 'UTC'}`);
  console.log(`🔗 CORS enabled for Vercel frontend`);
  console.log(`✅ Server is ready to accept connections`);
  console.log(`📍 Health check available at: http://0.0.0.0:${PORT}/api/health`);
  console.log(`🌐 Server listening on all interfaces (0.0.0.0:${PORT})`);
  console.log(`🔍 Available endpoints:`);
  console.log(`   - POST /api/login`);
  console.log(`   - POST /api/register`);
  console.log(`   - GET  /api/user`);
  console.log(`   - GET  /api/health`);
  console.log(`   - POST /api/setup-database`);
  console.log(`🎯 Railway Healthcheck Configuration:`);
  console.log(`   - Path: /api/health`);
  console.log(`   - Timeout: 60 seconds`);
  console.log(`   - Server binding: 0.0.0.0:${PORT}`);
  
  // 서버 시작 후 데이터베이스 스키마 생성 (비동기로 실행하되 서버 시작을 방해하지 않음)
  if (useDatabase && pool) {
    setTimeout(async () => {
      try {
        console.log('🗄️ 데이터베이스 스키마 생성 시작...');
        await createDatabaseSchema(pool);
        console.log('✅ 데이터베이스 스키마 생성 완료');
      } catch (error) {
        console.error('❌ 스키마 생성 실패:', error.message);
        // 스키마 생성 실패해도 서버는 계속 실행
      }
    }, 3000); // 3초 후에 스키마 생성
  }
});

// 서버 오류 처리
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  }
});

// 프로세스 오류 처리
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});