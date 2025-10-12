const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; // Railway 기본값에 맞춤

// 최대한 상세한 디버깅 로깅
console.log('🚀🚀🚀 RAILWAY DEPLOYMENT STARTING - VERSION 2.0 🚀🚀🚀');
console.log('==========================================');
console.log('🔄 FORCE DEPLOYMENT TRIGGERED');
console.log('==========================================');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('RAILWAY_ENVIRONMENT:', process.env.RAILWAY_ENVIRONMENT);
console.log('RAILWAY_PROJECT_ID:', process.env.RAILWAY_PROJECT_ID || 'NOT_SET');
console.log('RAILWAY_SERVICE_ID:', process.env.RAILWAY_SERVICE_ID || 'NOT_SET');
console.log('RAILWAY_PUBLIC_DOMAIN:', process.env.RAILWAY_PUBLIC_DOMAIN || 'NOT_SET');
console.log('RAILWAY_STATIC_URL:', process.env.RAILWAY_STATIC_URL || 'NOT_SET');
console.log('RAILWAY_SERVICE_TEST_URL:', process.env.RAILWAY_SERVICE_TEST_URL || 'NOT_SET');
console.log('RAILWAY_PRIVATE_DOMAIN:', process.env.RAILWAY_PRIVATE_DOMAIN || 'NOT_SET');
console.log('Current working directory:', process.cwd());
console.log('Server file path:', __filename);
console.log('Process ID:', process.pid);
console.log('Node version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('Memory usage:', process.memoryUsage());
console.log('==========================================');

console.log('📝 Setting up Express app...');
app.use(express.json());
console.log('✅ Express JSON middleware setup complete');

// 모든 요청에 대한 최대한 상세한 로깅
app.use((req, res, next) => {
  console.log('🔥🔥🔥🔥🔥 REQUEST RECEIVED 🔥🔥🔥🔥🔥');
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('URL:', req.url);
  console.log('Original URL:', req.originalUrl);
  console.log('Base URL:', req.baseUrl);
  console.log('Protocol:', req.protocol);
  console.log('Secure:', req.secure);
  console.log('Host:', req.get('host'));
  console.log('User-Agent:', req.get('user-agent'));
  console.log('Accept:', req.get('accept'));
  console.log('Content-Type:', req.get('content-type'));
  console.log('Referer:', req.get('referer'));
  console.log('Origin:', req.get('origin'));
  console.log('X-Forwarded-For:', req.get('x-forwarded-for'));
  console.log('X-Forwarded-Proto:', req.get('x-forwarded-proto'));
  console.log('X-Forwarded-Host:', req.get('x-forwarded-host'));
  console.log('X-Real-IP:', req.get('x-real-ip'));
  console.log('CF-Connecting-IP:', req.get('cf-connecting-ip'));
  console.log('X-Forwarded-Port:', req.get('x-forwarded-port'));
  console.log('X-Forwarded-Scheme:', req.get('x-forwarded-scheme'));
  console.log('All Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Query:', req.query);
  console.log('Body:', req.body);
  console.log('IP:', req.ip);
  console.log('IPs:', req.ips);
  console.log('Timestamp:', new Date().toISOString());
  console.log('🔥🔥🔥🔥🔥 END REQUEST LOG 🔥🔥🔥🔥🔥');
  next();
});

console.log('✅ Request logging middleware setup complete');

// 모든 미들웨어와 라우트 디버깅
console.log('🔍 Setting up routes...');
console.log('📝 Current route stack:', app._router.stack.map(layer => ({
  name: layer.name,
  regexp: layer.regexp.toString(),
  path: layer.route ? layer.route.path : 'middleware'
})));

console.log('✅ Root route setup complete');

// 테스트 라우트 추가
app.get('/test-debug', (req, res) => {
  console.log('🧪 TEST DEBUG ROUTE ACCESSED');
  res.json({
    message: 'Debug route working',
    timestamp: new Date().toISOString(),
    version: '2.0',
    routes: ['/test-debug', '/api/health', '/api/test']
  });
});

console.log('✅ Test debug route setup complete');

// API 엔드포인트들 (더 명확하게 정의)
app.get('/api/health', (req, res) => {
  console.log('✅✅✅✅✅ Health check endpoint accessed ✅✅✅✅✅');
  console.log('Sending health check response');
    res.json({
    status: 'OK',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    port: PORT,
    deployment: 'successful',
    debug: 'Health endpoint working',
    publicDomain: process.env.RAILWAY_PUBLIC_DOMAIN,
    staticUrl: process.env.RAILWAY_STATIC_URL,
    privateDomain: process.env.RAILWAY_PRIVATE_DOMAIN
  });
  console.log('✅ Health check response sent');
});

app.get('/api/test', (req, res) => {
  console.log('✅✅✅✅✅ Test endpoint accessed ✅✅✅✅✅');
  console.log('Sending test response');
  res.json({
    message: 'Test endpoint working',
    timestamp: new Date().toISOString(),
    port: PORT,
    deployment: 'successful',
    debug: 'Test endpoint working',
    publicDomain: process.env.RAILWAY_PUBLIC_DOMAIN,
    staticUrl: process.env.RAILWAY_STATIC_URL,
    privateDomain: process.env.RAILWAY_PRIVATE_DOMAIN
  });
  console.log('✅ Test endpoint response sent');
});

// API 라우트 그룹 (더 명확하게)
app.use('/api', (req, res, next) => {
  console.log('🚨🚨🚨🚨🚨 API ROUTE GROUP TRIGGERED 🚨🚨🚨🚨🚨');
  console.log('Request path:', req.path);
  console.log('Request URL:', req.url);
  console.log('This should not happen for defined API routes!');
  console.log('🚨🚨🚨🚨🚨 END API ROUTE GROUP LOG 🚨🚨🚨🚨🚨');
  next();
});

console.log('✅ API routes setup complete');
console.log('📝 Route stack after API routes:', app._router.stack.length);

// 404 핸들러
app.use('*', (req, res) => {
  console.log('❌❌❌❌❌ 404 - Route not found ❌❌❌❌❌');
  console.log('Method:', req.method);
  console.log('Original URL:', req.originalUrl);
  console.log('Path:', req.path);
  console.log('URL:', req.url);
  console.log('Available routes: /, /api/health, /api/test');
  console.log('❌❌❌❌❌ END 404 LOG ❌❌❌❌❌');
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
    availableRoutes: ['/', '/api/health', '/api/test'],
    debug: 'Route not found',
    publicDomain: process.env.RAILWAY_PUBLIC_DOMAIN,
    staticUrl: process.env.RAILWAY_STATIC_URL,
    privateDomain: process.env.RAILWAY_PRIVATE_DOMAIN
  });
});

console.log('✅ 404 handler setup complete');

// React 프론트엔드 서빙 설정
const staticPath = path.join(process.cwd(), 'client/build');
console.log('📁 Static files path:', staticPath);

// 빌드 디렉토리 존재 확인
const fs = require('fs');
console.log('🔍 Checking React build directory...');
console.log('📁 Current working directory:', process.cwd());
console.log('📁 Static path to check:', staticPath);

if (fs.existsSync(staticPath)) {
  console.log('✅ React build directory exists');
  const files = fs.readdirSync(staticPath);
  console.log('📁 Build files:', files);
  
  // index.html 파일 확인
  const indexPath = path.join(staticPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ index.html exists in build directory');
  } else {
    console.log('❌ index.html missing in build directory');
  }
} else {
  console.log('❌ React build directory does not exist');
  console.log('📁 Available directories in root:', fs.readdirSync(process.cwd()));
  
  // client 디렉토리 확인
  const clientPath = path.join(process.cwd(), 'client');
  if (fs.existsSync(clientPath)) {
    console.log('📁 Client directory exists');
    console.log('📁 Client directory contents:', fs.readdirSync(clientPath));
  } else {
    console.log('❌ Client directory does not exist');
  }
}

// 정적 파일 서빙
app.use(express.static(staticPath));
console.log('✅ Static files serving setup complete');
console.log('📝 Route stack after static files:', app._router.stack.length);

// SPA 라우팅을 위한 catch-all 핸들러
app.get('*', (req, res) => {
  console.log('🌐 SPA route accessed:', req.path);
  console.log('🌐 Static path:', staticPath);
  console.log('🌐 Index.html path:', path.join(staticPath, 'index.html'));
  
  // index.html 파일 존재 확인
  const indexPath = path.join(staticPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ index.html exists, sending file');
    res.sendFile(indexPath);
  } else {
    console.log('❌ index.html does not exist');
    console.log('📁 Static directory contents:', fs.existsSync(staticPath) ? fs.readdirSync(staticPath) : 'Directory does not exist');
    res.status(404).json({
      error: 'React build not found',
      message: 'React frontend build files are missing',
      timestamp: new Date().toISOString(),
      staticPath: staticPath,
      indexPath: indexPath,
      staticPathExists: fs.existsSync(staticPath),
      indexPathExists: fs.existsSync(indexPath),
      availableRoutes: ['/api/health', '/api/test'],
      debug: 'React build files missing - check build process'
    });
  }
});

console.log('✅ SPA routing setup complete');
console.log('📝 Final route stack:', app._router.stack.length);
console.log('📝 All routes:', app._router.stack.map(layer => ({
  name: layer.name,
  regexp: layer.regexp.toString(),
  path: layer.route ? layer.route.path : 'middleware'
})));
console.log('📝 About to start server...');

// 서버 시작 전 최종 빌드 상태 확인
console.log('🔍 Final build status check before server start...');
console.log('📁 Static path:', staticPath);
console.log('📁 Static path exists:', fs.existsSync(staticPath));
if (fs.existsSync(staticPath)) {
  console.log('📁 Build directory contents:', fs.readdirSync(staticPath));
  const indexPath = path.join(staticPath, 'index.html');
  console.log('📁 index.html exists:', fs.existsSync(indexPath));
}

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('🎉🎉🎉🎉🎉 SERVER STARTED SUCCESSFULLY! 🎉🎉🎉🎉🎉');
  console.log(`📍 Port: ${PORT}`);
  console.log(`📍 Host: 0.0.0.0 (all interfaces)`);
  console.log('🚀 Ready for debugging!');
  console.log(`🔗 Test URLs:`);
  console.log(`   - http://localhost:${PORT}/`);
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log(`   - http://localhost:${PORT}/api/test`);
  console.log(`🌐 Public Domain: ${process.env.RAILWAY_PUBLIC_DOMAIN}`);
  console.log(`🌐 Static URL: ${process.env.RAILWAY_STATIC_URL}`);
  console.log(`🌐 Private Domain: ${process.env.RAILWAY_PRIVATE_DOMAIN}`);
  console.log('🔍 Watch the logs for request details!');
  console.log('🎉🎉🎉🎉🎉 DEPLOYMENT COMPLETE! 🎉🎉🎉🎉🎉');
  
  // 서버 주소 정보 출력
  const address = server.address();
  console.log('📡 Server listening on:', address);
}).on('error', (err) => {
  console.error('❌❌❌❌❌ SERVER ERROR ❌❌❌❌❌');
  console.error('Error message:', err.message);
  console.error('Error code:', err.code);
  console.error('Error details:', err);
  console.error('❌❌❌❌❌ END ERROR LOG ❌❌❌❌❌');
  process.exit(1);
});

// 서버 이벤트 로깅
server.on('connection', (socket) => {
  console.log('🔌 New connection established');
  console.log('Socket remote address:', socket.remoteAddress);
  console.log('Socket remote port:', socket.remotePort);
  console.log('Socket local address:', socket.localAddress);
  console.log('Socket local port:', socket.localPort);
});

server.on('request', (req, res) => {
  console.log('📨 Server received request:', req.method, req.url);
});

server.on('close', () => {
  console.log('📝 Server closed');
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
});

// 프로세스 이벤트 로깅
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  console.error('Stack:', error.stack);
  // 서버를 종료하지 않고 계속 실행
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
  console.error('Promise:', promise);
  // 서버를 종료하지 않고 계속 실행
});

process.on('SIGTERM', () => {
  console.log('📝 SIGTERM received, shutting down gracefully');
  console.log('📝 Reason: Railway requested shutdown');
  server.close(() => {
    console.log('📝 Server closed gracefully');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('📝 SIGINT received, shutting down gracefully');
  console.log('📝 Reason: Manual shutdown');
  server.close(() => {
    console.log('📝 Server closed gracefully');
    process.exit(0);
  });
});

// 서버 안정성 모니터링
setInterval(() => {
  const memUsage = process.memoryUsage();
  console.log('📊 Memory usage:', {
    rss: Math.round(memUsage.rss / 1024 / 1024) + 'MB',
    heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB',
    heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
    external: Math.round(memUsage.external / 1024 / 1024) + 'MB'
  });
}, 30000); // 30초마다 메모리 사용량 로깅

console.log('📝 Debug server setup completed');
console.log('🚀🚀🚀🚀🚀 RAILWAY DEPLOYMENT READY 🚀🚀🚀🚀🚀');