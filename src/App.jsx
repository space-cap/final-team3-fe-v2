import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ROUTES } from './constants/routes';

import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import TemplatesPage from './pages/TemplatesPage';
import NotFoundPage from './pages/NotFoundPage';

import "./App.css";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path={ROUTES.HOME}
        element={
          isAuthenticated ? (
            <Navigate to={ROUTES.CHAT} replace />
          ) : (
            <Layout>
              <LandingPage />
            </Layout>
          )
        }
      />

      <Route
        path={ROUTES.LOGIN}
        element={
          isAuthenticated ? (
            <Navigate to={ROUTES.CHAT} replace />
          ) : (
            <Layout showHeader={false}>
              <LoginPage />
            </Layout>
          )
        }
      />

      <Route
        path={ROUTES.REGISTER}
        element={
          isAuthenticated ? (
            <Navigate to={ROUTES.CHAT} replace />
          ) : (
            <Layout showHeader={false}>
              <RegisterPage />
            </Layout>
          )
        }
      />

      {/* Protected Routes */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <Navigate to={ROUTES.CHAT} replace />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.CHAT}
        element={
          <ProtectedRoute>
            <Layout showHeader={false}>
              <ChatPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.TEMPLATES}
        element={
          <ProtectedRoute>
            <Layout>
              <TemplatesPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Template Detail Route */}
      <Route
        path="/templates/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold">템플릿 상세보기</h1>
                <p className="text-gray-600 mt-2">템플릿 상세 페이지 (구현 예정)</p>
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Profile and Settings Routes */}
      <Route
        path={ROUTES.PROFILE}
        element={
          <ProtectedRoute>
            <Layout>
              <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold">프로필</h1>
                <p className="text-gray-600 mt-2">프로필 페이지 (구현 예정)</p>
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.SETTINGS}
        element={
          <ProtectedRoute>
            <Layout>
              <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold">설정</h1>
                <p className="text-gray-600 mt-2">설정 페이지 (구현 예정)</p>
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route
        path="*"
        element={
          <Layout showHeader={false}>
            <NotFoundPage />
          </Layout>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
