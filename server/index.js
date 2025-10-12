// Railway Node.js 직접 배포용 서버
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

// Railway 환경 정보 로깅
console.log('=== Railway Node.js Environment ===');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Process started at:', new Date().toISOString());
console.log('===================================');

// 모든 인터페이스에서 수신 대기
const HOST = '0.0.0.0';

// 루트 엔드포인트
app.get('/', (req, res) => {
  console.log('Root endpoint accessed');
  res.json({ 
    status: 'OK', 
    message: 'Node.js server is running',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// 헬스체크 엔드포인트 (Railway 헬스체크용)
app.get('/api/health', (req, res) => {
  console.log('Health check endpoint accessed');
  res.status(200).json({ 
    status: 'OK', 
    message: 'Health check passed',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// 로그인 엔드포인트
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

// 회원가입 엔드포인트
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
console.log('Starting Node.js server...');
const server = app.listen(PORT, HOST, () => {
  console.log('✅ Node.js server started successfully!');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 Host: ${HOST}`);
  console.log(`🔗 Health check URL: http://${HOST}:${PORT}/api/health`);
  console.log(`🏠 Root URL: http://${HOST}:${PORT}/`);
  console.log('🚀 Railway deployment ready!');
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
  console.error('❌ Unhandled Rejection:', reason);
});

console.log('📦 Node.js server module loaded');