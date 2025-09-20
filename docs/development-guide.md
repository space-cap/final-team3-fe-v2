# 개발 가이드

## 🚀 프로젝트 시작하기

### 요구사항
- Node.js 16.0.0 이상
- npm 또는 yarn 패키지 매니저

### 설치 및 실행
```bash
# 저장소 클론
git clone [repository-url]
cd final-team3-fe-v2

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:5173 (또는 다음 가능한 포트) 접속
```

## 📁 폴더 구조 가이드

### 컴포넌트 구조
```
src/components/
├── common/          # 전역에서 사용되는 공통 컴포넌트
│   ├── ProtectedRoute.jsx
│   ├── LoadingSpinner.jsx    # (향후 추가)
│   └── Modal.jsx            # (향후 추가)
├── layout/          # 레이아웃 관련 컴포넌트
│   ├── Header.jsx
│   ├── Footer.jsx          # (향후 추가)
│   ├── Sidebar.jsx         # (향후 추가)
│   └── Layout.jsx
└── ui/              # 재사용 가능한 UI 컴포넌트 (향후 추가)
    ├── Button.jsx
    ├── Input.jsx
    └── Card.jsx
```

### 페이지 컴포넌트
- 각 라우트에 대응하는 최상위 컴포넌트
- 비즈니스 로직과 데이터 페칭 담당
- 여러 컴포넌트를 조합하여 완전한 페이지 구성

### 컨텍스트 (Context)
- 전역 상태 관리용
- 현재: `AuthContext` (인증 상태)
- 향후: `TemplateContext`, `ThemeContext` 등

## 🎨 코딩 컨벤션

### 파일 명명 규칙
- **컴포넌트**: PascalCase (예: `UserProfile.jsx`)
- **훅**: camelCase + use 접두사 (예: `useTemplates.js`)
- **유틸리티**: camelCase (예: `formatDate.js`)
- **상수**: UPPER_SNAKE_CASE (예: `API_ENDPOINTS.js`)

### 컴포넌트 작성 규칙

```jsx
// 1. Import 순서: 외부 라이브러리 → 내부 모듈 → 상대 경로
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './ComponentName.css'; // 필요한 경우

// 2. Props 타입 (향후 TypeScript 전환 시 interface 사용)
const ComponentName = ({
  title,
  onSubmit,
  isLoading = false
}) => {
  // 3. 상태 선언
  const [localState, setLocalState] = useState('');

  // 4. 커스텀 훅 사용
  const { user } = useAuth();

  // 5. 이벤트 핸들러
  const handleSubmit = () => {
    // 로직 구현
  };

  // 6. 렌더링
  return (
    <div className="component-container">
      {/* JSX 구조 */}
    </div>
  );
};

export default ComponentName;
```

### CSS 클래스 네이밍 (TailwindCSS)
- **유틸리티 우선**: 가능한 한 Tailwind 클래스 사용
- **컴포넌트 클래스**: 복잡한 스타일링이 필요한 경우만 사용
- **반응형**: `sm:`, `md:`, `lg:` 접두사 활용

## 🔄 상태 관리 패턴

### Context 사용 가이드
```jsx
// Context 생성
const MyContext = createContext();

// Provider 컴포넌트
export const MyProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const value = {
    state,
    actions: {
      updateState: setState,
      // 기타 액션들
    }
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

// 커스텀 훅
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};
```

### 지역 상태 vs 전역 상태
- **지역 상태**: 단일 컴포넌트에서만 사용되는 UI 상태
- **전역 상태**: 여러 컴포넌트에서 공유되는 데이터 (인증 정보, 테마 등)

## 🛣 라우팅 규칙

### 라우트 추가 방법
1. `src/constants/routes.js`에 상수 추가
2. `src/App.jsx`에 Route 컴포넌트 추가
3. 필요시 보호된 라우트로 설정

```javascript
// routes.js
export const ROUTES = {
  // 기존 라우트들...
  NEW_PAGE: '/new-page'
};

// App.jsx
<Route
  path={ROUTES.NEW_PAGE}
  element={
    <ProtectedRoute>
      <Layout>
        <NewPage />
      </Layout>
    </ProtectedRoute>
  }
/>
```

### 라우트 보호 수준
- **공개**: 누구나 접근 가능 (랜딩, 로그인, 회원가입)
- **보호**: 인증된 사용자만 접근 (대시보드, 템플릿 관련)
- **관리자**: 관리자 권한 필요 (향후 구현 예정)

## 🎯 컴포넌트 개발 가이드라인

### 재사용 가능한 컴포넌트 작성
```jsx
// Good: Props를 받아서 재사용 가능
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  ...props
}) => {
  const baseClasses = 'font-medium rounded transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  };
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 성능 최적화
- **React.memo**: props가 변경되지 않은 컴포넌트 리렌더링 방지
- **useCallback**: 함수 재생성 방지
- **useMemo**: 비싼 계산 결과 캐싱
- **Lazy Loading**: `React.lazy()`로 코드 분할

## 🔧 개발 도구 활용

### ESLint 설정
```javascript
// eslint.config.js에서 설정 확인
// 주요 규칙:
// - no-unused-vars: 사용하지 않는 변수 금지
// - react-hooks/rules-of-hooks: Hook 규칙 준수
// - react-refresh/only-export-components: HMR 최적화
```

### 디버깅 팁
- **React Developer Tools**: 컴포넌트 구조 및 상태 확인
- **브라우저 DevTools**: 네트워크, 콘솔, 성능 분석
- **console.log**: 개발 중 상태 확인 (배포 전 제거)

## 🚀 배포 준비

### 빌드 최적화
```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 빌드 결과 분석 (향후 추가 예정)
npm run analyze
```

### 환경 변수 설정
```bash
# .env.local 파일 생성 (gitignore에 포함)
VITE_API_BASE_URL=https://api.example.com
VITE_APP_VERSION=1.0.0
```

### 성능 체크리스트
- [ ] 이미지 최적화 (WebP, 적절한 크기)
- [ ] 불필요한 console.log 제거
- [ ] Bundle 크기 확인 및 최적화
- [ ] 라이트하우스 점수 확인 (90+ 목표)

## 📝 코드 리뷰 가이드라인

### 리뷰 포인트
1. **기능성**: 요구사항에 맞게 동작하는가?
2. **가독성**: 코드가 이해하기 쉬운가?
3. **재사용성**: 컴포넌트가 재사용 가능한가?
4. **성능**: 불필요한 리렌더링이나 메모리 누수는 없는가?
5. **접근성**: 웹 접근성 가이드라인을 준수하는가?

### 커밋 메시지 컨벤션
```
타입(범위): 설명

feat(auth): 로그인 기능 구현
fix(chat): 메시지 전송 버그 수정
docs(readme): 설치 가이드 업데이트
style(button): 버튼 스타일 개선
refactor(utils): 날짜 포맷 함수 리팩토링
test(login): 로그인 컴포넌트 테스트 추가
```

## 🔮 향후 개발 계획

### 단기 목표 (1-2주)
- [ ] 템플릿 상세보기 페이지 구현
- [ ] 프로필/설정 페이지 구현
- [ ] 실제 백엔드 API 연동
- [ ] 로딩 상태 및 에러 처리 개선

### 중기 목표 (1-2개월)
- [ ] TypeScript 전환
- [ ] 컴포넌트 테스트 작성
- [ ] PWA 기능 추가
- [ ] 다국어 지원 (i18n)

### 장기 목표 (3개월+)
- [ ] 마이크로 프론트엔드 아키텍처 검토
- [ ] 고급 상태 관리 도구 도입 (Zustand, Redux Toolkit)
- [ ] 성능 모니터링 시스템 구축
- [ ] E2E 테스트 구축

이 가이드는 프로젝트 개발 과정에서 일관성을 유지하고 코드 품질을 보장하기 위한 기준을 제시합니다.