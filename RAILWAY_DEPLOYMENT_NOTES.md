# Railway 배포 개발 노트

## 📋 **프로젝트 개요**
- **프로젝트명**: Login System
- **프론트엔드**: React (Vercel 배포)
- **백엔드**: Node.js Express (Railway 배포)
- **개발자**: 1인 개발 프로젝트

## 🚀 **Railway 배포 설정**

### **플랫폼 정보**
- **배포 플랫폼**: Railway.app
- **프로젝트명**: test
- **서비스명**: test
- **배포 URL**: `https://test-production-asia-southeast1-eqsg3a.railway.app`

### **버전 정보**
- **Node.js**: 18.20.8
- **npm**: 10.8.2 (Railway 환경)
- **Express**: 4.18.2
- **빌더**: NIXPACKS (Docker 없음)

### **환경변수 설정**
```
JWT_SECRET=india_production_secret_2024
NODE_ENV=production
TZ=Asia/Kolkata
```

### **프로젝트 구조**
```
login-system/
├── package.json              # 루트 package.json (Express 의존성 포함)
├── package-lock.json         # 업데이트된 lock 파일
├── server/
│   ├── index.js             # Express 서버 (간단한 버전)
│   └── package.json         # 서버 전용 package.json
└── client/                  # React 프론트엔드 (Vercel 배포)
```

## 🔧 **배포 설정**

### **package.json 설정**
```json
{
  "name": "login-system",
  "version": "1.0.0",
  "main": "server/index.js",
  "scripts": {
    "start": "node server/index.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### **서버 코드 특징**
- **포트**: `process.env.PORT || 5000`
- **호스트**: `0.0.0.0` (Railway 호환)
- **의존성**: Express.js만 사용 (최소화)
- **헬스체크**: `/api/health` 엔드포인트

## 📊 **배포 과정에서 해결한 문제들**

### **1. Docker 문제**
- **문제**: Railway가 자동으로 Docker 사용
- **해결**: railway.json 파일 제거, NIXPACKS 빌더 사용

### **2. Express 모듈 오류**
- **문제**: `Cannot find module 'express'`
- **해결**: 루트 package.json에 Express 의존성 추가

### **3. package-lock.json 동기화**
- **문제**: package.json과 package-lock.json 불일치
- **해결**: 로컬에서 `npm install` 실행하여 동기화

### **4. npm 버전 호환성**
- **문제**: npm 9.x 요구사항과 실제 npm 10.8.2 충돌
- **해결**: engines 설정에서 npm 버전 요구사항 제거

## 🎯 **API 엔드포인트**

### **기본 엔드포인트**
- `GET /` - 서버 상태 확인
- `GET /api/health` - 헬스체크 (Railway용)

### **인증 엔드포인트**
- `POST /api/login` - 로그인
- `POST /api/register` - 회원가입
- `GET /api/user` - 사용자 정보

### **테스트 계정**
- **사용자명**: admin
- **비밀번호**: password123

## 📝 **배포 명령어**

### **로컬 개발**
```bash
# 의존성 설치
npm install

# 서버 시작
npm start

# 개발 모드 (서버 + 클라이언트)
npm run dev
```

### **Railway 배포**
```bash
# 코드 변경 후
git add .
git commit -m "fix: 설명"
git push origin main

# Railway에서 자동 배포 실행
```

## 🔍 **배포 확인 방법**

### **성공 시 예상 로그**
```
🚀 Starting simple Node.js server...
📍 Port: 5000
✅ Server started successfully!
📍 Running on port 5000
🔗 Health check: http://localhost:5000/api/health
🏠 Root: http://localhost:5000/
```

### **헬스체크 응답**
```json
{
  "status": "OK",
  "message": "Health check passed",
  "timestamp": "2024-01-XX...",
  "port": "5000"
}
```

## ⚠️ **주의사항**

1. **Docker 사용 안함**: 1인 개발 프로젝트이므로 Docker 설정 제거
2. **의존성 최소화**: Express.js만 사용하여 복잡성 감소
3. **환경변수 필수**: Railway 대시보드에서 환경변수 설정 필요
4. **자동 배포**: GitHub 푸시 시 Railway에서 자동 배포 실행

## 📞 **문제 해결**

### **배포 실패 시**
1. Railway 대시보드 → Logs 탭에서 오류 확인
2. package-lock.json 동기화 확인
3. 환경변수 설정 확인
4. 수동 재배포 실행

### **헬스체크 실패 시**
1. 서버 시작 로그 확인
2. 포트 바인딩 확인
3. API 엔드포인트 접근 테스트

---
**최종 업데이트**: 2024년 1월
**배포 상태**: ✅ 성공
**다음 단계**: Vercel 프론트엔드 배포 연동
