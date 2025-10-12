const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

console.log('=== Railway Server Starting ===');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('RAILWAY_ENVIRONMENT:', process.env.RAILWAY_ENVIRONMENT);
console.log('=====================================');

app.use(express.json());

// 모든 요청에 대한 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// 간단한 테스트 엔드포인트
app.get('/', (req, res) => {
  console.log('Root endpoint accessed');
  res.json({
    message: 'Railway server is running!',
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV
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

// 404 핸들러
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Server started successfully!');
  console.log(`📍 Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🏠 Root: http://localhost:${PORT}/`);
  console.log('🚀 Ready for requests!');
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err.message);
  process.exit(1);
});

console.log('📦 Server module loaded');