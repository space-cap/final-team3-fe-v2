# API 연동 가이드

## 📡 API 연동 개요

현재 프론트엔드는 목 데이터(Mock Data)로 구현되어 있으며, 실제 백엔드 API 연동을 위한 구조가 준비되어 있습니다.

## 🏗 현재 API 구조

### 인증 API (AuthContext)
```javascript
// src/contexts/AuthContext.jsx
const login = async (email, password) => {
  try {
    // TODO: Replace with actual API call
    // const response = await axios.post('/api/auth/login', { email, password });
    // const { token, user } = response.data;

    const mockUser = {
      id: 1,
      email,
      name: '사용자'
    };

    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

## 🔄 API 서비스 구조 설계

### API 클라이언트 설정
```javascript
// src/services/api.js (생성 예정)
import axios from 'axios';

// 기본 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (토큰 자동 추가)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그아웃 처리
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

## 📋 API 엔드포인트 정의

### 인증 관련 API
```javascript
// src/services/authService.js (생성 예정)
import apiClient from './api';

export const authService = {
  // 로그인
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  // 회원가입
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // 이메일 인증번호 발송
  sendVerificationCode: async (email) => {
    const response = await apiClient.post('/auth/send-verification', { email });
    return response.data;
  },

  // 인증번호 확인
  verifyCode: async (email, code) => {
    const response = await apiClient.post('/auth/verify-code', { email, code });
    return response.data;
  },

  // 로그아웃
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  // 사용자 정보 조회
  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  }
};
```

### 템플릿 관련 API
```javascript
// src/services/templateService.js (생성 예정)
import apiClient from './api';

export const templateService = {
  // 템플릿 목록 조회
  getTemplates: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(`/templates?${params}`);
    return response.data;
  },

  // 템플릿 상세 조회
  getTemplate: async (id) => {
    const response = await apiClient.get(`/templates/${id}`);
    return response.data;
  },

  // 템플릿 생성
  createTemplate: async (templateData) => {
    const response = await apiClient.post('/templates', templateData);
    return response.data;
  },

  // 템플릿 수정
  updateTemplate: async (id, templateData) => {
    const response = await apiClient.put(`/templates/${id}`, templateData);
    return response.data;
  },

  // 템플릿 삭제
  deleteTemplate: async (id) => {
    const response = await apiClient.delete(`/templates/${id}`);
    return response.data;
  },

  // 템플릿 승인 요청
  submitForApproval: async (id) => {
    const response = await apiClient.post(`/templates/${id}/submit`);
    return response.data;
  }
};
```

### AI 챗봇 API
```javascript
// src/services/chatService.js (생성 예정)
import apiClient from './api';

export const chatService = {
  // 대화 시작
  startConversation: async () => {
    const response = await apiClient.post('/chat/conversations');
    return response.data;
  },

  // 메시지 전송
  sendMessage: async (conversationId, message) => {
    const response = await apiClient.post(`/chat/conversations/${conversationId}/messages`, {
      content: message,
      type: 'user'
    });
    return response.data;
  },

  // 대화 목록 조회
  getConversations: async () => {
    const response = await apiClient.get('/chat/conversations');
    return response.data;
  },

  // 대화 상세 조회
  getConversation: async (conversationId) => {
    const response = await apiClient.get(`/chat/conversations/${conversationId}`);
    return response.data;
  },

  // 템플릿 생성 요청
  generateTemplate: async (conversationId, requirements) => {
    const response = await apiClient.post(`/chat/conversations/${conversationId}/generate`, requirements);
    return response.data;
  }
};
```

## 🔧 커스텀 훅 활용

### API 호출을 위한 커스텀 훅
```javascript
// src/hooks/useApi.js (생성 예정)
import { useState, useEffect } from 'react';

export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        setData(result);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

// 사용 예시
// const { data: templates, loading, error } = useApi(() => templateService.getTemplates());
```

### 특정 API를 위한 커스텀 훅
```javascript
// src/hooks/useTemplates.js (생성 예정)
import { useState, useEffect } from 'react';
import { templateService } from '../services/templateService';

export const useTemplates = (filters = {}) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const data = await templateService.getTemplates(filters);
      setTemplates(data.templates);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [JSON.stringify(filters)]);

  const createTemplate = async (templateData) => {
    try {
      const newTemplate = await templateService.createTemplate(templateData);
      setTemplates(prev => [newTemplate, ...prev]);
      return newTemplate;
    } catch (err) {
      throw err;
    }
  };

  const updateTemplate = async (id, templateData) => {
    try {
      const updatedTemplate = await templateService.updateTemplate(id, templateData);
      setTemplates(prev =>
        prev.map(template =>
          template.id === id ? updatedTemplate : template
        )
      );
      return updatedTemplate;
    } catch (err) {
      throw err;
    }
  };

  return {
    templates,
    loading,
    error,
    refetch: fetchTemplates,
    createTemplate,
    updateTemplate
  };
};
```

## 🔒 보안 고려사항

### 토큰 관리
```javascript
// src/utils/tokenManager.js (생성 예정)
export const tokenManager = {
  getToken: () => localStorage.getItem('token'),

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  removeToken: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isTokenValid: () => {
    const token = tokenManager.getToken();
    if (!token) return false;

    try {
      // JWT 토큰 디코딩 (실제 구현 시 jwt-decode 라이브러리 사용)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
};
```

### 환경 변수 설정
```bash
# .env.local
VITE_API_BASE_URL=https://api.kakao-template.com
VITE_WS_URL=wss://ws.kakao-template.com
VITE_SENTRY_DSN=your-sentry-dsn
```

## 📊 에러 처리 및 로깅

### 에러 처리 유틸리티
```javascript
// src/utils/errorHandler.js (생성 예정)
export const handleApiError = (error) => {
  const message = error.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다.';

  // 개발 환경에서만 콘솔 로그
  if (import.meta.env.DEV) {
    console.error('API Error:', error);
  }

  // 프로덕션에서는 에러 모니터링 서비스로 전송
  if (import.meta.env.PROD) {
    // Sentry, LogRocket 등으로 에러 전송
  }

  return message;
};
```

### 토스트 알림 시스템
```javascript
// src/contexts/ToastContext.jsx (생성 예정)
import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
```

## 🧪 API 테스트

### API 테스트 환경 구성
```javascript
// src/utils/apiTester.js (개발용)
import { authService } from '../services/authService';
import { templateService } from '../services/templateService';

export const testAPIs = async () => {
  try {
    console.log('Testing APIs...');

    // 인증 테스트
    const loginResult = await authService.login('test@example.com', 'password');
    console.log('Login test:', loginResult);

    // 템플릿 조회 테스트
    const templates = await templateService.getTemplates();
    console.log('Templates test:', templates);

  } catch (error) {
    console.error('API test failed:', error);
  }
};

// 개발 환경에서만 실행
if (import.meta.env.DEV) {
  // window.testAPIs = testAPIs;
}
```

## 🚀 실제 API 연동 단계

### 1단계: API 서비스 파일 생성
- `src/services/api.js` 생성
- `src/services/authService.js` 생성
- `src/services/templateService.js` 생성

### 2단계: AuthContext 업데이트
```javascript
// AuthContext.jsx 수정
import { authService } from '../services/authService';

const login = async (email, password) => {
  try {
    const { token, user } = await authService.login(email, password);

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
};
```

### 3단계: 커스텀 훅 구현
- `src/hooks/useApi.js` 생성
- `src/hooks/useTemplates.js` 생성
- 각 페이지에서 커스텀 훅 활용

### 4단계: 에러 처리 및 로딩 상태 개선
- 전역 에러 핸들링 구현
- 로딩 스피너 컴포넌트 추가
- 토스트 알림 시스템 구현

### 5단계: 실시간 기능 (WebSocket)
```javascript
// src/services/websocket.js (생성 예정)
class WebSocketService {
  constructor() {
    this.ws = null;
    this.listeners = new Map();
  }

  connect() {
    const wsUrl = import.meta.env.VITE_WS_URL;
    this.ws = new WebSocket(wsUrl);

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };
  }

  handleMessage(data) {
    const listeners = this.listeners.get(data.type) || [];
    listeners.forEach(listener => listener(data));
  }

  subscribe(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(callback);
  }

  sendMessage(type, data) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, data }));
    }
  }
}

export const wsService = new WebSocketService();
```

이 가이드를 따라 단계적으로 실제 백엔드 API와 연동할 수 있습니다. 현재 목 데이터 구조를 유지하면서 점진적으로 실제 API로 교체하는 방식을 권장합니다.