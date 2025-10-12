const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

console.log('=== Railway Test Server Starting ===');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Current working directory:', process.cwd());
console.log('=====================================');

app.use(express.json());

// 간단한 테스트 엔드포인트
app.get('/', (req, res) => {
  console.log('Root endpoint accessed');
  res.json({
    message: 'Railway server is running!',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.get('/api/health', (req, res) => {
  console.log('Health check endpoint accessed');
  res.json({
    status: 'OK',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.get('/api/test', (req, res) => {
  console.log('Test endpoint accessed');
  res.json({
    message: 'Test endpoint working',
    timestamp: new Date().toISOString()
  });
});

// 모든 요청에 대한 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Test server started successfully!');
  console.log(`📍 Port: ${PORT}`);
  console.log('🚀 Ready for testing!');
}).on('error', (err) => {
  console.error('❌ Server error:', err.message);
  process.exit(1);
});

console.log('Test server setup completed');