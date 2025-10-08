# 🗄️ Railway PostgreSQL 데이터베이스 스키마 생성 가이드

## 📋 현재 상황
- ✅ PostgreSQL 데이터베이스 서비스 생성 완료
- ❌ 테이블이 없는 상태 ("You have no tables")
- 🔧 데이터베이스 스키마 생성 필요

## 🚀 데이터베이스 스키마 생성 방법

### 방법 1: Railway 대시보드에서 직접 생성

#### 1단계: Railway PostgreSQL 연결
1. Railway 대시보드에서 "Postgres" 서비스 클릭
2. "Connect" 버튼 클릭
3. 연결 정보 복사

#### 2단계: 테이블 생성
Railway 대시보드의 "Database" 탭에서 다음 SQL 실행:

```sql
-- user 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 샘플 사용자 데이터 삽입
INSERT INTO users (username, email, password) VALUES 
('admin', 'admin@example.com', '$2b$10$rQZ8K9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX'),
('testuser', 'test@example.com', '$2b$10$rQZ8K9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX')
ON CONFLICT (username) DO NOTHING;

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```

### 방법 2: 외부 PostgreSQL 클라이언트 사용

#### 1단계: 연결 정보 확인
Railway 대시보드 → Postgres → Variables에서:
- `PGHOST`
- `PGPORT` 
- `PGDATABASE`
- `PGUSER`
- `PGPASSWORD`

#### 2단계: psql로 연결
```bash
psql -h [PGHOST] -p [PGPORT] -U [PGUSER] -d [PGDATABASE]
```

#### 3단계: 스키마 실행
```bash
\i database/init.sql
```

### 방법 3: API 엔드포인트를 통한 자동 생성 (권장)

서버가 시작된 후 API를 통해 데이터베이스 스키마를 생성할 수 있습니다:

#### 1단계: 서버 상태 확인
```bash
curl https://your-railway-app.railway.app/api/health
```

#### 2단계: 데이터베이스 스키마 생성
```bash
curl -X POST https://your-railway-app.railway.app/api/setup-database
```

#### 3단계: 결과 확인
성공 응답:
```json
{
  "message": "데이터베이스 스키마가 성공적으로 생성되었습니다.",
  "timestamp": "2025-10-07T..."
}
```

### 방법 4: Railway 대시보드에서 직접 생성
