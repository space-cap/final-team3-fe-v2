import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // TODO: Replace with actual API call
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

  const register = async (email, password, name, verificationCode, emailVerificationToken) => {
    try {
      // Sign up with email verification token
      const signupResponse = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
          emailVerificationToken
        })
      });

      const signupData = await signupResponse.json();

      if (!signupResponse.ok) {
        return { success: false, error: signupData.message || '회원가입에 실패했습니다.' };
      }

      // If signup is successful, store user data
      const user = {
        id: signupData.id || 1,
        email,
        name
      };

      // Store token if provided
      if (signupData.token) {
        localStorage.setItem('token', signupData.token);
      }

      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      return { success: true };
    } catch (error) {
      return { success: false, error: '네트워크 오류가 발생했습니다.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};