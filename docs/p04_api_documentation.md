# P04 - API 문서 (API Documentation)

## 🌐 API 아키텍처 개요

본 프로젝트는 RESTful API를 기반으로 하며, 현재 프론트엔드 개발을 위한 Mock API를 사용하고 있습니다. 향후 실제 백엔드 API와의 통합을 위한 구조가 준비되어 있습니다.

## 🔧 API 클라이언트 설정

### 1. Axios 기본 설정
```javascript
// src/lib/axios.js (권장 구조)
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 처리
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 2. 환경 변수 설정
```bash
# .env.development
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001

# .env.production
REACT_APP_API_BASE_URL=https://api.yourapp.com
REACT_APP_WS_URL=wss://api.yourapp.com
```

## 🔐 인증 API

### 1. 로그인
```javascript
// POST /auth/login
const loginRequest = {
  email: "user@example.com",
  password: "password123"
};

const loginResponse = {
  success: true,
  data: {
    user: {
      id: 1,
      email: "user@example.com",
      name: "사용자",
      avatar: "https://example.com/avatar.jpg",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z"
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    expiresIn: 3600
  },
  message: "로그인 성공"
};

// 에러 응답
const loginError = {
  success: false,
  error: {
    code: "INVALID_CREDENTIALS",
    message: "이메일 또는 비밀번호가 올바르지 않습니다."
  }
};
```

### 2. 회원가입
```javascript
// POST /auth/register
const registerRequest = {
  email: "newuser@example.com",
  password: "password123",
  name: "새 사용자",
  verificationCode: "123456"
};

const registerResponse = {
  success: true,
  data: {
    user: {
      id: 2,
      email: "newuser@example.com",
      name: "새 사용자",
      avatar: null,
      emailVerified: false,
      createdAt: "2025-01-01T00:00:00Z"
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    message: "회원가입이 완료되었습니다. 이메일을 확인해주세요."
  }
};
```

### 3. 토큰 갱신
```javascript
// POST /auth/refresh
const refreshRequest = {
  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
};

const refreshResponse = {
  success: true,
  data: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    expiresIn: 3600
  }
};
```

### 4. 로그아웃
```javascript
// POST /auth/logout
const logoutRequest = {
  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
};

const logoutResponse = {
  success: true,
  message: "로그아웃되었습니다."
};
```

## 👤 사용자 API

### 1. 사용자 프로필 조회
```javascript
// GET /users/profile
const profileResponse = {
  success: true,
  data: {
    id: 1,
    email: "user@example.com",
    name: "사용자",
    avatar: "https://example.com/avatar.jpg",
    bio: "안녕하세요! 저는 개발자입니다.",
    preferences: {
      theme: "light",
      language: "ko",
      notifications: {
        email: true,
        push: false
      }
    },
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  }
};
```

### 2. 사용자 프로필 업데이트
```javascript
// PUT /users/profile
const updateProfileRequest = {
  name: "새로운 이름",
  bio: "업데이트된 소개",
  avatar: "https://example.com/new-avatar.jpg"
};

const updateProfileResponse = {
  success: true,
  data: {
    id: 1,
    email: "user@example.com",
    name: "새로운 이름",
    bio: "업데이트된 소개",
    avatar: "https://example.com/new-avatar.jpg",
    updatedAt: "2025-01-01T12:00:00Z"
  },
  message: "프로필이 업데이트되었습니다."
};
```

## 💬 채팅 API

### 1. 채팅방 목록 조회
```javascript
// GET /chat/rooms
const chatRoomsResponse = {
  success: true,
  data: {
    rooms: [
      {
        id: 1,
        name: "일반 채팅",
        description: "자유로운 대화를 나누는 공간",
        type: "public",
        memberCount: 25,
        lastMessage: {
          id: 123,
          content: "안녕하세요!",
          sender: {
            id: 2,
            name: "다른 사용자",
            avatar: "https://example.com/avatar2.jpg"
          },
          createdAt: "2025-01-01T11:30:00Z"
        },
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T11:30:00Z"
      }
    ],
    pagination: {
      page: 1,
      limit: 20,
      total: 1,
      totalPages: 1
    }
  }
};
```

### 2. 채팅 메시지 조회
```javascript
// GET /chat/rooms/:roomId/messages
const messagesResponse = {
  success: true,
  data: {
    messages: [
      {
        id: 123,
        content: "안녕하세요!",
        type: "text",
        sender: {
          id: 2,
          name: "다른 사용자",
          avatar: "https://example.com/avatar2.jpg"
        },
        roomId: 1,
        replyTo: null,
        attachments: [],
        reactions: [
          {
            emoji: "👍",
            count: 3,
            users: [1, 3, 4]
          }
        ],
        createdAt: "2025-01-01T11:30:00Z",
        updatedAt: "2025-01-01T11:30:00Z"
      }
    ],
    pagination: {
      page: 1,
      limit: 50,
      total: 1,
      totalPages: 1
    }
  }
};
```

### 3. 메시지 전송
```javascript
// POST /chat/rooms/:roomId/messages
const sendMessageRequest = {
  content: "새로운 메시지입니다.",
  type: "text",
  replyTo: null,
  attachments: []
};

const sendMessageResponse = {
  success: true,
  data: {
    id: 124,
    content: "새로운 메시지입니다.",
    type: "text",
    sender: {
      id: 1,
      name: "사용자",
      avatar: "https://example.com/avatar.jpg"
    },
    roomId: 1,
    replyTo: null,
    attachments: [],
    reactions: [],
    createdAt: "2025-01-01T12:00:00Z"
  }
};
```

## 📄 템플릿 API

### 1. 템플릿 목록 조회
```javascript
// GET /templates
const templatesResponse = {
  success: true,
  data: {
    templates: [
      {
        id: 1,
        title: "회의록 템플릿",
        description: "효율적인 회의록 작성을 위한 템플릿",
        category: "business",
        tags: ["회의", "기록", "업무"],
        content: "# 회의록\n\n## 회의 정보\n- 날짜: \n- 참석자: \n\n## 안건\n1. \n\n## 결론\n",
        author: {
          id: 1,
          name: "관리자",
          avatar: "https://example.com/admin-avatar.jpg"
        },
        isPublic: true,
        usageCount: 156,
        rating: 4.8,
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z"
      }
    ],
    pagination: {
      page: 1,
      limit: 20,
      total: 1,
      totalPages: 1
    },
    filters: {
      categories: ["business", "personal", "education"],
      tags: ["회의", "기록", "업무", "개인", "교육"]
    }
  }
};
```

### 2. 템플릿 상세 조회
```javascript
// GET /templates/:id
const templateDetailResponse = {
  success: true,
  data: {
    id: 1,
    title: "회의록 템플릿",
    description: "효율적인 회의록 작성을 위한 템플릿",
    category: "business",
    tags: ["회의", "기록", "업무"],
    content: "# 회의록\n\n## 회의 정보\n- 날짜: \n- 참석자: \n\n## 안건\n1. \n\n## 결론\n",
    author: {
      id: 1,
      name: "관리자",
      avatar: "https://example.com/admin-avatar.jpg",
      bio: "템플릿 전문가"
    },
    isPublic: true,
    usageCount: 156,
    rating: 4.8,
    reviews: [
      {
        id: 1,
        user: {
          id: 2,
          name: "사용자",
          avatar: "https://example.com/user-avatar.jpg"
        },
        rating: 5,
        comment: "매우 유용한 템플릿입니다!",
        createdAt: "2025-01-01T10:00:00Z"
      }
    ],
    relatedTemplates: [
      {
        id: 2,
        title: "프로젝트 계획서 템플릿",
        rating: 4.6
      }
    ],
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  }
};
```

### 3. 템플릿 생성
```javascript
// POST /templates
const createTemplateRequest = {
  title: "새 템플릿",
  description: "새로운 템플릿입니다.",
  category: "personal",
  tags: ["개인", "메모"],
  content: "# 새 템플릿\n\n내용을 입력하세요.",
  isPublic: false
};

const createTemplateResponse = {
  success: true,
  data: {
    id: 3,
    title: "새 템플릿",
    description: "새로운 템플릿입니다.",
    category: "personal",
    tags: ["개인", "메모"],
    content: "# 새 템플릿\n\n내용을 입력하세요.",
    author: {
      id: 1,
      name: "사용자"
    },
    isPublic: false,
    usageCount: 0,
    rating: 0,
    createdAt: "2025-01-01T12:00:00Z"
  },
  message: "템플릿이 생성되었습니다."
};
```

## 🌐 WebSocket API (실시간 통신)

### 1. 연결 설정
```javascript
// WebSocket 연결
const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:3001';
const socket = new WebSocket(`${wsUrl}?token=${authToken}`);

// 연결 이벤트
socket.onopen = (event) => {
  console.log('WebSocket connected');
};

socket.onclose = (event) => {
  console.log('WebSocket disconnected');
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};
```

### 2. 실시간 메시지
```javascript
// 메시지 수신
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case 'new_message':
      handleNewMessage(data.payload);
      break;
    case 'user_joined':
      handleUserJoined(data.payload);
      break;
    case 'user_left':
      handleUserLeft(data.payload);
      break;
    case 'typing':
      handleTyping(data.payload);
      break;
  }
};

// 메시지 전송
const sendMessage = (roomId, content) => {
  socket.send(JSON.stringify({
    type: 'send_message',
    payload: {
      roomId,
      content,
      timestamp: new Date().toISOString()
    }
  }));
};
```

### 3. WebSocket 이벤트 타입
```javascript
// 클라이언트 → 서버
const clientEvents = {
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  SEND_MESSAGE: 'send_message',
  START_TYPING: 'start_typing',
  STOP_TYPING: 'stop_typing'
};

// 서버 → 클라이언트
const serverEvents = {
  NEW_MESSAGE: 'new_message',
  MESSAGE_UPDATED: 'message_updated',
  MESSAGE_DELETED: 'message_deleted',
  USER_JOINED: 'user_joined',
  USER_LEFT: 'user_left',
  TYPING: 'typing',
  ERROR: 'error'
};
```

## 🚨 에러 처리

### 1. 표준 에러 응답
```javascript
const errorResponse = {
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "사용자에게 표시할 메시지",
    details: "개발자를 위한 상세 정보",
    timestamp: "2025-01-01T12:00:00Z",
    requestId: "req_123456789"
  }
};
```

### 2. HTTP 상태 코드별 처리
```javascript
const errorCodes = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  422: 'VALIDATION_ERROR',
  429: 'RATE_LIMIT_EXCEEDED',
  500: 'INTERNAL_SERVER_ERROR',
  502: 'BAD_GATEWAY',
  503: 'SERVICE_UNAVAILABLE'
};

// 에러 처리 예시
const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 401:
        // 인증 에러 처리
        logout();
        break;
      case 422:
        // 유효성 검사 에러 처리
        showValidationErrors(data.error.details);
        break;
      default:
        showErrorMessage(data.error.message);
    }
  } else if (error.request) {
    // 네트워크 에러
    showErrorMessage('네트워크 연결을 확인해주세요.');
  } else {
    // 기타 에러
    showErrorMessage('예상치 못한 오류가 발생했습니다.');
  }
};
```

## 📊 API 서비스 구현 예시

### 1. Auth Service
```javascript
// src/services/authService.js
import apiClient from '@/lib/axios';

class AuthService {
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await apiClient.post('/auth/logout', { refreshToken });
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      this.clearTokens();
    }
  }

  clearTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  handleError(error) {
    if (error.response?.data?.error) {
      return new Error(error.response.data.error.message);
    }
    return new Error('네트워크 오류가 발생했습니다.');
  }
}

export const authService = new AuthService();
```

### 2. Chat Service
```javascript
// src/services/chatService.js
import apiClient from '@/lib/axios';

class ChatService {
  async getRooms(page = 1, limit = 20) {
    const response = await apiClient.get('/chat/rooms', {
      params: { page, limit }
    });
    return response.data;
  }

  async getMessages(roomId, page = 1, limit = 50) {
    const response = await apiClient.get(`/chat/rooms/${roomId}/messages`, {
      params: { page, limit }
    });
    return response.data;
  }

  async sendMessage(roomId, content, type = 'text') {
    const response = await apiClient.post(`/chat/rooms/${roomId}/messages`, {
      content,
      type
    });
    return response.data;
  }
}

export const chatService = new ChatService();
```

## 🔧 Mock API 구현 (개발용)

### 1. MSW (Mock Service Worker) 설정
```javascript
// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  // 로그인 Mock
  rest.post('/api/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;

    if (email === 'test@example.com' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          data: {
            user: { id: 1, email, name: '테스트 사용자' },
            token: 'mock-jwt-token',
            expiresIn: 3600
          }
        })
      );
    }

    return res(
      ctx.status(401),
      ctx.json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: '이메일 또는 비밀번호가 올바르지 않습니다.'
        }
      })
    );
  }),

  // 채팅방 목록 Mock
  rest.get('/api/chat/rooms', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          rooms: mockRooms,
          pagination: { page: 1, limit: 20, total: mockRooms.length }
        }
      })
    );
  })
];
```

---

*문서 작성일: 2025년 9월 21일*
*작성자: Claude Code Assistant*