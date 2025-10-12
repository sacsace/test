const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 기본 미들웨어
app.use(cors());
app.use(express.json());

// Railway 환경 정보 로깅
console.log('=== Railway Environment Info ===');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('RAILWAY_STATIC_URL:', process.env.RAILWAY_STATIC_URL);
console.log('RAILWAY_PUBLIC_DOMAIN:', process.env.RAILWAY_PUBLIC_DOMAIN);
console.log('================================');

// 루트 엔드포인트
app.get('/', (req, res) => {
  res.json({
    message: 'Login System Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

// 헬스체크 엔드포인트 (Railway용)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    port: PORT,
    uptime: process.uptime()
  });
});

// 로그인 엔드포인트 (간단한 버전)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'password123') {
    res.json({
      message: 'Login successful',
      token: 'dummy_token_123',
      user: {
        id: 1,
        username: 'admin',
        email: 'admin@example.com'
      }
    });
  } else {
    res.status(401).json({
      message: 'Invalid credentials'
    });
  }
});

// 회원가입 엔드포인트 (간단한 버전)
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }
  
  res.status(201).json({
    message: 'Registration successful',
    user: {
      id: 2,
      username,
      email
    }
  });
});

// 사용자 정보 엔드포인트
app.get('/api/user', (req, res) => {
  res.json({
    user: {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      created_at: new Date().toISOString()
    }
  });
});

// 서버 시작
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Server started successfully!');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 Listening on: 0.0.0.0:${PORT}`);
  console.log(`🔗 Health check: http://0.0.0.0:${PORT}/api/health`);
  console.log(`🏠 Root endpoint: http://0.0.0.0:${PORT}/`);
  console.log('✅ All endpoints ready!');
});

// 에러 핸들링
server.on('error', (error) => {
  console.error('❌ Server error:', error);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

console.log('📦 Server module loaded successfully');