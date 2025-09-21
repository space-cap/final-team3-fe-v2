# P05 - 배포 가이드 (Deployment Guide)

## 🚀 배포 개요

본 문서는 Final Team3 Frontend v2 프로젝트의 다양한 환경으로의 배포 방법을 상세히 설명합니다. 개발부터 프로덕션까지의 전체 배포 파이프라인을 다룹니다.

## 🏗 빌드 프로세스

### 1. 프로덕션 빌드
```bash
# 의존성 설치
npm ci

# 프로덕션 빌드
npm run build

# 빌드 결과 확인
ls -la dist/

# 빌드 사이즈 분석 (선택사항)
npm run build -- --mode=analyze
```

### 2. 빌드 최적화 설정
```javascript
// vite.config.ts - 프로덕션 최적화
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // 청크 분할 최적화
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-avatar', '@radix-ui/react-dialog'],
          'router-vendor': ['react-router-dom'],
          'utils-vendor': ['axios', 'clsx', 'tailwind-merge']
        }
      }
    },
    // 소스맵 생성 (개발환경에서만)
    sourcemap: process.env.NODE_ENV === 'development',
    // 최소화 설정
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 3. 환경별 빌드 스크립트
```json
// package.json scripts 확장
{
  "scripts": {
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "build:staging": "vite build --mode staging",
    "build:prod": "vite build --mode production",
    "build:analyze": "vite build --mode production && npx vite-bundle-analyzer dist",
    "preview": "vite preview",
    "preview:dist": "vite preview --port 4173 --host"
  }
}
```

## 🌍 환경 설정

### 1. 환경 변수 파일
```bash
# .env.development
NODE_ENV=development
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001
REACT_APP_APP_NAME=Final Team3 - Dev
REACT_APP_SENTRY_DSN=
REACT_APP_GOOGLE_ANALYTICS_ID=

# .env.staging
NODE_ENV=staging
REACT_APP_API_BASE_URL=https://staging-api.yourapp.com/api
REACT_APP_WS_URL=wss://staging-api.yourapp.com
REACT_APP_APP_NAME=Final Team3 - Staging
REACT_APP_SENTRY_DSN=your-staging-sentry-dsn
REACT_APP_GOOGLE_ANALYTICS_ID=

# .env.production
NODE_ENV=production
REACT_APP_API_BASE_URL=https://api.yourapp.com/api
REACT_APP_WS_URL=wss://api.yourapp.com
REACT_APP_APP_NAME=Final Team3
REACT_APP_SENTRY_DSN=your-production-sentry-dsn
REACT_APP_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
```

### 2. 환경별 설정 관리
```javascript
// src/config/env.js
const config = {
  development: {
    apiUrl: 'http://localhost:3001/api',
    wsUrl: 'ws://localhost:3001',
    debug: true,
    logLevel: 'debug'
  },
  staging: {
    apiUrl: 'https://staging-api.yourapp.com/api',
    wsUrl: 'wss://staging-api.yourapp.com',
    debug: true,
    logLevel: 'info'
  },
  production: {
    apiUrl: 'https://api.yourapp.com/api',
    wsUrl: 'wss://api.yourapp.com',
    debug: false,
    logLevel: 'error'
  }
};

const currentConfig = config[process.env.NODE_ENV] || config.development;

export default currentConfig;
```

## ☁️ 클라우드 배포

### 1. Vercel 배포

#### 설정 파일
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "REACT_APP_API_BASE_URL": "@api_base_url",
    "REACT_APP_WS_URL": "@ws_url"
  },
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### 배포 명령어
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 연결
vercel link

# 환경 변수 설정
vercel env add REACT_APP_API_BASE_URL production
vercel env add REACT_APP_WS_URL production

# 배포
vercel --prod
```

### 2. Netlify 배포

#### 설정 파일
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### 배포 스크립트
```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 사이트 연결
netlify link

# 환경 변수 설정
netlify env:set REACT_APP_API_BASE_URL "https://api.yourapp.com/api"

# 배포
netlify deploy --prod --dir=dist
```

### 3. AWS S3 + CloudFront 배포

#### S3 배포 스크립트
```bash
#!/bin/bash
# deploy-aws.sh

# 환경 변수 설정
S3_BUCKET="your-app-frontend"
CLOUDFRONT_DISTRIBUTION_ID="E1234567890ABC"
AWS_REGION="us-east-1"

# 빌드
echo "Building application..."
npm run build

# S3 업로드
echo "Uploading to S3..."
aws s3 sync dist/ s3://$S3_BUCKET --delete --region $AWS_REGION

# CloudFront 캐시 무효화
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

echo "Deployment completed!"
```

#### AWS CLI 설정
```bash
# AWS CLI 설치
pip install awscli

# 자격 증명 설정
aws configure
# AWS Access Key ID: YOUR_ACCESS_KEY
# AWS Secret Access Key: YOUR_SECRET_KEY
# Default region name: us-east-1
# Default output format: json

# 배포 실행
chmod +x deploy-aws.sh
./deploy-aws.sh
```

## 🐳 Docker 배포

### 1. Dockerfile
```dockerfile
# Dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# 의존성 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 빌드
RUN npm run build

# Production stage
FROM nginx:alpine

# 빌드된 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 설정 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 포트 노출
EXPOSE 80

# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Nginx 설정
```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # Gzip 압축
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # SPA 라우팅 지원
        location / {
            try_files $uri $uri/ /index.html;
        }

        # 정적 파일 캐싱
        location /static/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # API 프록시 (선택사항)
        location /api/ {
            proxy_pass http://backend:3001;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # 보안 헤더
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Referrer-Policy "strict-origin-when-cross-origin";
    }
}
```

### 3. Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    depends_on:
      - backend
    networks:
      - app-network

  backend:
    image: your-backend-image:latest
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
    depends_on:
      - db
    networks:
      - app-network

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

### 4. Docker 배포 명령어
```bash
# 이미지 빌드
docker build -t final-team3-frontend:latest .

# 컨테이너 실행
docker run -p 80:80 final-team3-frontend:latest

# Docker Compose로 전체 스택 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f frontend
```

## 🔄 CI/CD 파이프라인

### 1. GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm run test

      - name: Build application
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build for production
        run: npm run build
        env:
          REACT_APP_API_BASE_URL: ${{ secrets.API_BASE_URL }}
          REACT_APP_WS_URL: ${{ secrets.WS_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### 2. GitLab CI/CD
```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

cache:
  paths:
    - node_modules/

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run lint
    - npm run test
  artifacts:
    reports:
      coverage: coverage/
    expire_in: 30 days

build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  only:
    - main
    - develop

deploy_staging:
  stage: deploy
  script:
    - echo "Deploying to staging..."
    - # 스테이징 배포 스크립트
  environment:
    name: staging
    url: https://staging.yourapp.com
  only:
    - develop

deploy_production:
  stage: deploy
  script:
    - echo "Deploying to production..."
    - # 프로덕션 배포 스크립트
  environment:
    name: production
    url: https://yourapp.com
  only:
    - main
  when: manual
```

## 📊 모니터링 및 로깅

### 1. 에러 모니터링 (Sentry)
```javascript
// src/lib/sentry.js
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [
      new BrowserTracing(),
    ],
    tracesSampleRate: 0.1,
    environment: process.env.NODE_ENV,
    beforeSend(event) {
      // 민감한 정보 필터링
      if (event.exception) {
        const error = event.exception.values[0];
        if (error && error.stacktrace && error.stacktrace.frames) {
          error.stacktrace.frames.forEach(frame => {
            if (frame.abs_path && frame.abs_path.includes('node_modules')) {
              frame.in_app = false;
            }
          });
        }
      }
      return event;
    }
  });
}
```

### 2. 성능 모니터링
```javascript
// src/lib/analytics.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric) => {
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics 또는 다른 분석 도구로 전송
    gtag('event', metric.name, {
      custom_parameter_1: metric.value,
      custom_parameter_2: metric.rating,
    });
  }
};

// Core Web Vitals 측정
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### 3. 로그 수집
```javascript
// src/lib/logger.js
class Logger {
  constructor() {
    this.level = process.env.NODE_ENV === 'production' ? 'error' : 'debug';
  }

  debug(message, data = {}) {
    if (this.shouldLog('debug')) {
      console.log(`[DEBUG] ${message}`, data);
    }
  }

  info(message, data = {}) {
    if (this.shouldLog('info')) {
      console.info(`[INFO] ${message}`, data);
    }
  }

  warn(message, data = {}) {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, data);
    }
  }

  error(message, error = null) {
    if (this.shouldLog('error')) {
      console.error(`[ERROR] ${message}`, error);

      // 프로덕션에서는 에러 리포팅 서비스로 전송
      if (process.env.NODE_ENV === 'production' && error) {
        this.reportError(message, error);
      }
    }
  }

  shouldLog(level) {
    const levels = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.level);
  }

  reportError(message, error) {
    // Sentry, LogRocket 등으로 에러 전송
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        tags: { component: 'frontend' },
        extra: { message }
      });
    }
  }
}

export const logger = new Logger();
```

## 🔒 보안 고려사항

### 1. 환경 변수 보안
```bash
# 민감한 정보는 CI/CD 시크릿으로 관리
# GitHub Secrets
REACT_APP_API_BASE_URL
REACT_APP_SENTRY_DSN
VERCEL_TOKEN
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

### 2. 빌드 시 보안 검사
```json
// package.json
{
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "security:check": "npm audit && npm run lint:security",
    "lint:security": "eslint src/ --ext .js,.jsx,.ts,.tsx --config .eslintrc.security.js"
  }
}
```

### 3. CSP (Content Security Policy) 헤더
```html
<!-- public/index.html -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               font-src 'self' https://fonts.gstatic.com;
               img-src 'self' data: https:;
               connect-src 'self' https://api.yourapp.com wss://api.yourapp.com;">
```

## 📋 배포 체크리스트

### 배포 전 확인사항
- [ ] 모든 테스트 통과
- [ ] 린팅 규칙 준수
- [ ] 보안 취약점 검사 완료
- [ ] 빌드 에러 없음
- [ ] 환경 변수 설정 확인
- [ ] API 엔드포인트 동작 확인

### 배포 후 확인사항
- [ ] 애플리케이션 정상 로드
- [ ] 주요 기능 동작 확인
- [ ] 성능 지표 확인
- [ ] 에러 로그 모니터링
- [ ] SSL 인증서 유효성 확인
- [ ] CDN 캐시 상태 확인

### 롤백 계획
```bash
# 이전 버전으로 롤백
vercel rollback --url your-app.vercel.app

# Docker 이미지 롤백
docker run -p 80:80 final-team3-frontend:previous-tag

# 수동 롤백 (S3)
aws s3 sync s3://backup-bucket/ s3://production-bucket/ --delete
```

---

*문서 작성일: 2025년 9월 21일*
*작성자: Claude Code Assistant*