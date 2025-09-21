# TalkTemplate - AI 카카오톡 알림톡 생성기

> 🚀 **세계 최초 AI 기반 카카오톡 알림톡 템플릿 자동 생성 서비스**
> 99.8% 승인률을 자랑하는 스마트한 마케팅 솔루션

## 📋 프로젝트 개요

TalkTemplate은 소상공인과 마케터를 위한 혁신적인 카카오톡 알림톡 템플릿 생성 플랫폼입니다. AI 기술을 활용하여 비즈니스 요구사항에 맞는 완벽한 알림톡 템플릿을 5초 만에 자동 생성하며, 카카오의 까다로운 심사 기준을 100% 준수하는 템플릿을 제공합니다.

## ✨ 주요 기능

- 🤖 **AI 자동 생성**: 고급 AI 기술로 비즈니스에 최적화된 템플릿 자동 생성
- 🛡️ **정책 완벽 준수**: 카카오 알림톡 심사 기준 100% 만족 (99.8% 승인률)
- ⚡ **빠른 승인**: 정책 위반 걱정 없이 첫 제출부터 빠른 승인
- 🎯 **다양한 업종 지원**: 쇼핑몰, 카페, 병원, 미용실 등 모든 업종 지원
- 📊 **실시간 최적화**: 최신 정책 변경사항 실시간 반영
- 💡 **사용법 간단**: 몇 번의 클릭만으로 전문적인 템플릿 완성

## 🛠️ 기술 스택

### Frontend Framework
- **React 19.1.1** - 최신 React 기능과 성능 최적화
- **Vite 7.1.6** - 빠른 개발 서버와 최적화된 빌드
- **React Router DOM 7.9.1** - SPA 라우팅 관리

### UI/UX
- **TailwindCSS 4.1.13** - 유틸리티 우선 CSS 프레임워크
- **Radix UI** - 접근성이 보장된 고품질 UI 컴포넌트
  - Avatar, Dialog, Dropdown Menu, Navigation Menu 등
- **Lucide React** - 아름다운 SVG 아이콘 라이브러리
- **React Icons** - 다양한 아이콘 세트

### 상태 관리 & 네트워킹
- **React Context API** - 인증 및 테마 상태 관리
- **Axios 1.12.2** - HTTP 클라이언트

### 개발 도구
- **TypeScript** - 타입 안전성 보장
- **ESLint 9.35.0** - 코드 품질 관리
- **tw-animate-css** - TailwindCSS 애니메이션 확장

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── ui/             # Radix UI 기반 기본 UI 컴포넌트
│   ├── layout/         # 레이아웃 관련 컴포넌트
│   └── common/         # 공통 컴포넌트 (ProtectedRoute 등)
├── pages/              # 페이지 컴포넌트
│   ├── LandingPage.jsx # 랜딩 페이지
│   ├── LoginPage.jsx   # 로그인 페이지
│   ├── RegisterPage.jsx # 회원가입 페이지
│   ├── ChatPage.jsx    # AI 채팅 페이지 (메인 기능)
│   ├── DashboardPage.jsx # 대시보드
│   ├── TemplatesPage.jsx # 템플릿 관리
│   └── NotFoundPage.jsx # 404 페이지
├── contexts/           # React Context 제공자
│   ├── AuthContext.jsx # 인증 상태 관리
│   └── ThemeContext.jsx # 테마 상태 관리
├── constants/          # 상수 정의
│   └── routes.js       # 라우트 경로 상수
├── lib/               # 유틸리티 함수
├── assets/            # 정적 자산
├── main.tsx           # 애플리케이션 진입점
└── App.jsx            # 메인 앱 컴포넌트
```

## 🚀 시작하기

### 필수 요구사항
- Node.js 18+
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
```bash
git clone <repository-url>
cd final-team3-fe-v2
```

2. **의존성 설치**
```bash
npm install
```

3. **환경변수 설정 (선택사항)**
```bash
# .env.local 파일 생성 (로컬 개발용)
cp .env .env.local
# 필요시 API URL 수정
```

4. **개발 서버 실행**
```bash
npm run dev
```

5. **브라우저에서 확인**
- 개발 서버: http://localhost:5173
- Vite HMR(Hot Module Replacement) 지원

## 📜 사용 가능한 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 시작 (HMR 지원) |
| `npm run build` | 프로덕션 빌드 생성 |
| `npm run lint` | ESLint 코드 품질 검사 |
| `npm run preview` | 프로덕션 빌드 미리보기 |

## 🔐 주요 페이지 및 기능

### 🏠 랜딩 페이지 (`/`)
- **Hero Section**: 서비스 소개 및 주요 가치 제안
- **Features Section**: 6가지 핵심 기능 소개
- **CTA Section**: 회원가입 및 로그인 유도
- **신뢰도 지표**: 50,000+ 사용자, 99.8% 승인률, 5초 생성 시간

### 🔒 인증 시스템
- **회원가입/로그인**: 완전한 사용자 인증 플로우
- **보호된 라우트**: 인증이 필요한 페이지 자동 리다이렉션
- **상태 관리**: React Context로 전역 인증 상태 관리

### 💬 AI 채팅 페이지 (`/chat`)
- **메인 기능**: AI와의 대화를 통한 템플릿 생성
- **실시간 상호작용**: 사용자 요구사항 분석 및 최적화된 템플릿 제공

### 📋 템플릿 관리 (`/templates`)
- **템플릿 목록**: 생성된 템플릿 관리 및 조회
- **상세보기**: 개별 템플릿 세부 정보 (`/templates/:id`)

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Orange/Amber 그라디언트 (브랜드 아이덴티티)
- **Secondary**: 다양한 색상으로 기능별 구분
- **Background**: 부드러운 그라디언트와 글래스모피즘 효과

### 컴포넌트 디자인
- **모던한 카드 디자인**: 그림자와 호버 효과
- **애니메이션**: 부드러운 트랜지션과 마이크로 인터랙션
- **반응형 디자인**: 모바일 우선 접근법

## 🔧 개발 가이드

### 코드 컨벤션
- **ESLint**: Modern JavaScript/JSX with React hooks
- **File Naming**: PascalCase for components, camelCase for utilities
- **Import Organization**: External libraries → Internal modules → Relative imports

### 상태 관리 패턴
```jsx
// AuthContext 사용 예시
const { isAuthenticated, user, login, logout } = useAuth();

// ThemeContext 사용 예시
const { theme, toggleTheme } = useTheme();
```

### 라우팅 구조
```jsx
// 보호된 라우트 예시
<ProtectedRoute>
  <Layout>
    <ChatPage />
  </Layout>
</ProtectedRoute>
```

## ⚙️ 환경변수 설정

프로젝트는 다음 환경변수를 사용합니다:

### 필수 환경변수

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `VITE_API_BASE_URL` | 백엔드 API 서버 URL | `http://localhost:8080` |
| `VITE_APP_ENV` | 애플리케이션 환경 | `development` |

### 환경변수 파일

- `.env` - 기본 환경변수 (개발용)
- `.env.development` - 개발 환경 전용
- `.env.production` - 프로덕션 환경 전용
- `.env.local` - 로컬 개발용 (gitignore됨)

### 사용 예시

```bash
# .env.local 파일 예시
VITE_API_BASE_URL=http://your-api-server.com:8080
VITE_APP_ENV=development
VITE_APP_DEBUG=true
```

## 🌟 핵심 비즈니스 가치

1. **시간 절약**: 수동 작성 대비 95% 시간 단축
2. **높은 승인률**: 99.8% 템플릿 승인률로 비즈니스 연속성 보장
3. **정책 준수**: 카카오 정책 변경사항 실시간 반영
4. **사용자 친화적**: 직관적인 UI/UX로 누구나 쉽게 사용
5. **비용 효율성**: 템플릿 작성 외주 비용 대비 90% 절약

## 📈 향후 계획

- [ ] 템플릿 A/B 테스트 기능
- [ ] 성과 분석 대시보드
- [ ] 다국어 지원 (영어, 중국어)
- [ ] 모바일 앱 출시
- [ ] API 서비스 제공

## 🤝 기여하기

프로젝트 개선에 관심이 있으시다면:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

This project is licensed under the MIT License.

## 📞 문의사항

프로젝트에 대한 문의나 제안사항이 있으시면 언제든 연락해 주세요.

---

<div align="center">

**🚀 TalkTemplate로 카카오톡 알림톡 마케팅의 새로운 차원을 경험해보세요! 🚀**

</div>