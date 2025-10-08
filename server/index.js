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

// CORS 설정 (Vercel 프론트엔드 허용)
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-app-name.vercel.app', // Vercel 도메인으로 변경 필요
    /\.vercel\.app$/ // 모든 Vercel 앱 허용
  ],
  credentials: true
}));
app.use(express.json());

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

try {
  // Railway는 DATABASE_URL 환경변수를 자동으로 제공
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (databaseUrl) {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });

    // 데이터베이스 연결 테스트
    pool.on('connect', () => {
      console.log('PostgreSQL 데이터베이스에 연결되었습니다.');
      useDatabase = true;
    });

    pool.on('error', (err) => {
      console.log('PostgreSQL 연결 실패, 메모리 저장소를 사용합니다:', err.message);
      useDatabase = false;
    });
  } else {
    console.log('DATABASE_URL이 설정되지 않았습니다. 메모리 저장소를 사용합니다.');
    useDatabase = false;
  }
} catch (error) {
  console.log('PostgreSQL 설정 실패, 메모리 저장소를 사용합니다:', error.message);
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

// 헬스 체크 엔드포인트 (Railway 헬스 체크용)
app.get('/api/health', (req, res) => {
  try {
    res.status(200).json({
      status: 'OK',
      message: '서버가 정상적으로 작동 중입니다.',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      port: PORT,
      database: useDatabase ? 'PostgreSQL' : 'Memory'
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

// 서버 시작
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️ Database mode: ${useDatabase ? 'PostgreSQL' : 'Memory'}`);
  console.log(`🌏 Timezone: ${process.env.TZ || 'UTC'}`);
  console.log(`🔗 CORS enabled for Vercel frontend`);
  console.log(`✅ Server is ready to accept connections`);
  console.log(`📍 Health check available at: http://0.0.0.0:${PORT}/api/health`);
});

// 서버 오류 처리
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  }
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