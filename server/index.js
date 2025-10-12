const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

console.log('=== Railway Server Starting ===');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('RAILWAY_ENVIRONMENT:', process.env.RAILWAY_ENVIRONMENT);
console.log('Current working directory:', process.cwd());
console.log('Server file path:', __filename);
console.log('================================');

app.use(express.json());

// 루트 경로 핸들러 (명시적)
app.get('/', (req, res) => {
  console.log('Root path accessed, serving React app');
  const indexPath = path.join(__dirname, '../client/build', 'index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

// API 라우트
app.get('/api/health', (req, res) => {
  console.log('Health check accessed');
  res.json({
    status: 'OK',
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/login', (req, res) => {
  console.log('Login accessed');
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'password123') {
    res.json({
      message: 'Login successful',
      token: 'dummy_token_123',
      user: { id: 1, username: 'admin', email: 'admin@example.com' }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/register', (req, res) => {
  console.log('Register accessed');
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  res.status(201).json({
    message: 'Registration successful',
    user: { id: 2, username, email }
  });
});

// 정적 파일 서빙 (프론트엔드)
const staticPath = path.join(__dirname, '../client/build');
console.log('Static files path:', staticPath);
app.use(express.static(staticPath));

// React 앱 라우팅 (API가 아닌 모든 경로)
app.get('*', (req, res) => {
  console.log('Frontend route:', req.path);
  const indexPath = path.join(__dirname, '../client/build', 'index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

console.log('About to start server...');

// 서버 시작
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Server started successfully!');
  console.log(`📍 Port: ${PORT}`);
  console.log('🚀 Ready!');
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🏠 Frontend: http://localhost:${PORT}/`);
  
  // Railway가 서버를 인식할 수 있도록 추가 로그
  console.log('Server is listening on all interfaces');
  console.log('Railway should be able to reach this server');
});

// 에러 핸들링
server.on('error', (err) => {
  console.error('❌ Server error:', err.message);
  console.error('❌ Error details:', err);
  process.exit(1);
});

// 프로세스 종료 핸들링
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

console.log('Server setup completed');