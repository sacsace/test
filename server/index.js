const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

console.log('=== Simple Railway Server Starting ===');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
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
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Server started successfully!');
  console.log(`📍 Server running on port ${PORT}`);
  console.log('🚀 Ready for requests!');
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err.message);
  process.exit(1);
});