# P03 - 개발 가이드 (Development Guide)

## 🚀 개발 환경 설정

### 1. 필수 요구사항
- **Node.js**: 18.0.0 이상
- **npm**: 9.0.0 이상
- **Git**: 최신 버전
- **VS Code**: 권장 에디터

### 2. 권장 VS Code 확장
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### 3. 프로젝트 설정
```bash
# 저장소 클론
git clone <repository-url>
cd final-team3-fe-v2

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

## 📝 코딩 컨벤션

### 1. JavaScript/JSX 코딩 스타일

#### 파일 및 폴더 명명 규칙
```javascript
// 컴포넌트 파일: PascalCase
UserProfile.jsx
AuthContext.jsx

// 유틸리티/서비스 파일: camelCase
apiService.js
formatUtils.js

// 상수 파일: UPPER_SNAKE_CASE 또는 camelCase
API_ENDPOINTS.js
routes.js

// 폴더: kebab-case 또는 camelCase
components/
user-profile/
```

#### 컴포넌트 작성 규칙
```jsx
// ✅ 좋은 예시
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const UserProfile = ({ userId, onUpdate }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const fetchUser = async (id) => {
    try {
      setLoading(true);
      const userData = await userService.getUser(id);
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </Card>
  );
};

export default UserProfile;
```

#### Props 타입 검증 (권장)
```jsx
// PropTypes 사용 (JavaScript에서)
import PropTypes from 'prop-types';

UserProfile.propTypes = {
  userId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func
};

UserProfile.defaultProps = {
  onUpdate: () => {}
};
```

### 2. CSS/TailwindCSS 가이드라인

#### 클래스 순서 규칙
```jsx
// ✅ 권장 순서
<div className="
  flex items-center justify-between  // Layout
  w-full h-12 p-4 m-2             // Sizing & Spacing
  bg-white border border-gray-200  // Background & Border
  rounded-lg shadow-sm             // Effects
  text-gray-900 font-medium        // Typography
  hover:bg-gray-50                 // Interactive states
  transition-colors duration-200   // Transitions
">
```

#### 커스텀 CSS 작성 시
```css
/* ✅ BEM 방법론 사용 */
.user-card {
  @apply flex flex-col p-6 bg-white rounded-lg shadow-sm;
}

.user-card__avatar {
  @apply w-12 h-12 rounded-full;
}

.user-card__content {
  @apply mt-4;
}

.user-card--featured {
  @apply border-2 border-blue-500;
}
```

### 3. 상태 관리 패턴

#### Context 사용 패턴
```jsx
// ✅ Context 패턴
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const value = useMemo(() => ({
    theme,
    toggleTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark'
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
```

#### 커스텀 Hook 패턴
```jsx
// ✅ 커스텀 Hook 예시
export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
};
```

## 🛠 개발 도구 설정

### 1. ESLint 설정
현재 프로젝트의 ESLint 설정:
```javascript
// eslint.config.js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
```

### 2. Vite 설정
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 3. Path Alias 사용
```jsx
// ✅ Alias 사용
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/routes';

// ❌ 상대 경로 사용 지양
import { Button } from '../../../components/ui/button';
```

## 🧪 테스팅 가이드

### 1. 테스트 전략
```javascript
// 단위 테스트 예시 (Jest + Testing Library)
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. 컴포넌트 테스트 패턴
```jsx
// 컨텍스트를 사용하는 컴포넌트 테스트
const renderWithContext = (component, contextValue) => {
  return render(
    <AuthContext.Provider value={contextValue}>
      {component}
    </AuthContext.Provider>
  );
};

test('shows login button when not authenticated', () => {
  const contextValue = { isAuthenticated: false };
  renderWithContext(<Navigation />, contextValue);

  expect(screen.getByText('로그인')).toBeInTheDocument();
});
```

## 🔧 디버깅 가이드

### 1. React DevTools 사용
```javascript
// 개발 환경에서만 활성화
if (process.env.NODE_ENV === 'development') {
  // React DevTools 설정
}
```

### 2. 콘솔 디버깅 패턴
```javascript
// ✅ 구조화된 로깅
console.group('User Authentication');
console.log('User data:', userData);
console.log('Token:', token);
console.groupEnd();

// ✅ 조건부 로깅
const DEBUG = process.env.NODE_ENV === 'development';
DEBUG && console.log('Debug info:', debugData);
```

### 3. 에러 바운더리 활용
```jsx
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

## 📦 패키지 관리

### 1. 의존성 추가 규칙
```bash
# 프로덕션 의존성
npm install package-name

# 개발 의존성
npm install --save-dev package-name

# 정확한 버전 고정
npm install package-name@1.2.3
```

### 2. 패키지 업데이트 전략
```bash
# 보안 업데이트 확인
npm audit

# 의존성 업데이트 확인
npm outdated

# 점진적 업데이트
npm update
```

## 🚀 성능 최적화

### 1. React 성능 최적화
```jsx
// ✅ React.memo 사용
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  return <div>{/* 복잡한 렌더링 로직 */}</div>;
});

// ✅ useMemo로 계산 최적화
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// ✅ useCallback으로 함수 최적화
const handleClick = useCallback(() => {
  onClick(id);
}, [onClick, id]);
```

### 2. 번들 크기 최적화
```javascript
// ✅ 동적 import 사용
const LazyComponent = lazy(() => import('./HeavyComponent'));

// ✅ 트리 쉐이킹을 위한 명시적 import
import { debounce } from 'lodash/debounce';
// ❌ import _ from 'lodash';
```

## 🎯 코드 리뷰 체크리스트

### 1. 기능성
- [ ] 요구사항에 맞게 구현되었는가?
- [ ] 에지 케이스가 처리되었는가?
- [ ] 에러 처리가 적절한가?

### 2. 코드 품질
- [ ] 코딩 컨벤션을 준수했는가?
- [ ] 함수와 변수 이름이 명확한가?
- [ ] 중복 코드가 제거되었는가?
- [ ] 주석이 필요한 곳에 작성되었는가?

### 3. 성능
- [ ] 불필요한 리렌더링이 없는가?
- [ ] 메모리 누수 가능성은 없는가?
- [ ] 비동기 처리가 적절한가?

### 4. 보안
- [ ] 사용자 입력이 검증되는가?
- [ ] 민감한 정보가 노출되지 않는가?
- [ ] 인증/권한 검사가 적절한가?

## 📋 일반적인 문제 해결

### 1. 자주 발생하는 에러
```javascript
// ❌ Cannot read property of undefined
// ✅ 옵셔널 체이닝 사용
const userName = user?.profile?.name || 'Unknown';

// ❌ State 직접 수정
// ✅ 불변성 유지
setUsers(prev => [...prev, newUser]);

// ❌ 무한 useEffect 루프
// ✅ 의존성 배열 정확히 설정
useEffect(() => {
  fetchData();
}, [dependency]);
```

### 2. 성능 문제 해결
```javascript
// ✅ 디바운스 적용
const debouncedSearch = useCallback(
  debounce((query) => {
    performSearch(query);
  }, 300),
  []
);
```

## 🔄 Git 워크플로우

### 1. 브랜치 전략
```bash
# 기능 개발
git checkout -b feature/user-authentication
git checkout -b fix/login-validation

# 커밋 메시지 컨벤션
git commit -m "feat: add user login functionality"
git commit -m "fix: resolve validation error in login form"
git commit -m "docs: update development guide"
```

### 2. 커밋 메시지 타입
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 스타일 변경 (코드 의미 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가 또는 수정
- `chore`: 빌드 또는 보조 도구 변경

---

*문서 작성일: 2025년 9월 21일*
*작성자: Claude Code Assistant*