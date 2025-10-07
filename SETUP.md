# 데이터베이스 설정 가이드

## PostgreSQL 설치 및 설정

### 1. PostgreSQL 설치
- Windows: https://www.postgresql.org/download/windows/
- macOS: `brew install postgresql`
- Ubuntu: `sudo apt-get install postgresql postgresql-contrib`

### 2. 데이터베이스 생성
```sql
-- PostgreSQL에 접속 후 실행
CREATE DATABASE test_db;
```

### 3. 테이블 생성
```bash
# 프로젝트 루트에서 실행
psql -h localhost -U postgres -d test_db -f database/init.sql
```

### 4. 환경 변수 설정
1. `server/env.example` 파일을 복사하여 `server/.env` 파일 생성
2. 데이터베이스 연결 정보 수정:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=test_db
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

## 실행 방법

### 개발 모드 실행
```bash
npm run dev
```

### 개별 실행
```bash
# 백엔드만 실행
npm run server

# 프론트엔드만 실행
npm run client
```

## 테스트 계정
- 사용자명: admin, 비밀번호: password123
- 사용자명: testuser, 비밀번호: password123

## API 엔드포인트
- POST /api/login - 로그인
- POST /api/register - 회원가입
- GET /api/user - 사용자 정보 조회
- GET /api/health - 서버 상태 확인
