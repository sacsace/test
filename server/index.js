// Railway용 간단한 Express 서버
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('=== Railway Server Starting ===');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('==============================');

// 미들웨어
app.use(express.json());

// 루트 엔드포인트
app.get('/', (req, res) => {
  console.log('Root endpoint accessed');
  res.json({ 
    status: 'OK', 
    message: 'Railway Express server is running',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// 헬스체크 엔드포인트
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
  console.log('Login endpoint accessed');
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
  console.log('Register endpoint accessed');
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
  console.log('User endpoint accessed');
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
console.log('Starting Express server...');
const server = app.listen(PORT, () => {
  console.log('✅ Express server started successfully!');
  console.log(`📍 Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🏠 Root: http://localhost:${PORT}/`);
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

console.log('📦 Express server module loaded');