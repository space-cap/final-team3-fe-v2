# P01 - 프로젝트 개요 (Project Overview)

## 📋 프로젝트 정보

- **프로젝트명**: Final Team3 Frontend v2
- **버전**: 0.0.0
- **타입**: React 웹 애플리케이션
- **개발 언어**: JavaScript/TypeScript
- **라이선스**: Private

## 🎯 프로젝트 목적

이 프로젝트는 팀 협업을 위한 모던 웹 애플리케이션으로, 사용자 인증, 채팅, 템플릿 관리 등의 기능을 제공합니다.

## 🛠 기술 스택

### Frontend Framework
- **React**: 19.1.1 (최신 버전)
- **React Router DOM**: 7.9.1 (SPA 라우팅)
- **React Icons**: 5.5.0 (아이콘)

### 빌드 도구
- **Vite**: 7.1.6 (빠른 빌드 및 개발 서버)
- **TypeScript**: 5.9.2 (타입 안정성)

### 스타일링
- **TailwindCSS**: 4.1.13 (유틸리티 우선 CSS)
- **TailwindCSS Vite Plugin**: 4.1.13
- **Lucide React**: 0.544.0 (아이콘 라이브러리)

### UI 컴포넌트
- **Radix UI**: 완전한 접근성을 갖춘 UI 프리미티브
  - Avatar, Dialog, Dropdown Menu, Label
  - Navigation Menu, Progress, Scroll Area
  - Select, Separator, Slot
- **Class Variance Authority**: 0.7.1 (조건부 스타일링)
- **CLSX**: 2.1.1 (클래스명 유틸리티)
- **Tailwind Merge**: 3.3.1 (Tailwind 클래스 병합)

### HTTP 클라이언트
- **Axios**: 1.12.2 (API 통신)

### 개발 도구
- **ESLint**: 9.35.0 (코드 품질)
- **ESLint React Plugins**: React 전용 린팅 규칙

## 📁 프로젝트 구조

```
final-team3-fe-v2/
├── docs/                    # 프로젝트 문서
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── common/         # 공통 컴포넌트
│   │   ├── layout/         # 레이아웃 컴포넌트
│   │   └── ui/             # UI 컴포넌트 (Radix UI 기반)
│   ├── constants/          # 상수 정의
│   ├── contexts/           # React Context (상태 관리)
│   ├── hooks/              # 커스텀 React Hooks
│   ├── lib/                # 라이브러리 설정
│   ├── pages/              # 페이지 컴포넌트
│   ├── services/           # API 서비스
│   ├── utils/              # 유틸리티 함수
│   ├── App.jsx             # 메인 앱 컴포넌트
│   ├── main.tsx            # 애플리케이션 진입점
│   └── index.css           # 글로벌 스타일
├── package.json            # 프로젝트 의존성
├── vite.config.js          # Vite 설정
├── tailwind.config.js      # TailwindCSS 설정
└── eslint.config.js        # ESLint 설정
```

## 🌟 주요 기능

### 1. 사용자 인증
- 로그인/회원가입
- 보호된 라우트
- 사용자 세션 관리

### 2. 채팅 시스템
- 실시간 메시징 (구현 예정)
- 채팅 인터페이스

### 3. 템플릿 관리
- 템플릿 목록 조회
- 템플릿 상세보기

### 4. 사용자 인터페이스
- 반응형 디자인
- 다크/라이트 테마 지원
- 접근성 준수 (Radix UI)

## 🎨 디자인 시스템

- **테마**: Claude.ai 영감을 받은 디자인 시스템
- **폰트**: Inter (웹폰트)
- **색상**: TailwindCSS 팔레트 기반
- **컴포넌트**: Radix UI 프리미티브 기반의 커스텀 UI

## 🌐 라우팅 구조

- `/` - 랜딩 페이지 (비인증 사용자)
- `/login` - 로그인 페이지
- `/register` - 회원가입 페이지
- `/chat` - 메인 채팅 페이지 (인증 필요)
- `/templates` - 템플릿 목록 (인증 필요)
- `/templates/:id` - 템플릿 상세 (인증 필요)
- `/profile` - 사용자 프로필 (구현 예정)
- `/settings` - 설정 페이지 (구현 예정)

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 코드 품질 검사
npm run lint

# 프로덕션 미리보기
npm run preview
```

## 🔄 개발 워크플로우

1. **개발**: `npm run dev`로 개발 서버 시작
2. **코딩**: ESLint 규칙 준수하여 개발
3. **빌드**: `npm run build`로 프로덕션 빌드
4. **배포**: 빌드된 파일을 서버에 배포

## 📚 참고 문서

- [React 19 공식 문서](https://react.dev/)
- [Vite 공식 문서](https://vite.dev/)
- [TailwindCSS 공식 문서](https://tailwindcss.com/)
- [Radix UI 공식 문서](https://www.radix-ui.com/)

---

*문서 작성일: 2025년 9월 21일*
*작성자: Claude Code Assistant*