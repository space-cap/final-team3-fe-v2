import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { MessageSquare, Mail, Lock, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);

    if (result.success) {
      navigate(ROUTES.DASHBOARD);
    } else {
      setError(result.error || '로그인에 실패했습니다.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-8 bg-muted/40">
        <div className="mx-auto max-w-md">
          <Link to={ROUTES.HOME} className="flex items-center space-x-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <MessageSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">TalkTemplate</span>
          </Link>

          <h1 className="text-3xl font-bold mb-4">
            스마트한 카카오톡 알림톡
            <br />
            템플릿 생성기
          </h1>
          <p className="text-lg text-muted-foreground">
            AI가 도와주는 카카오톡 알림톡 템플릿으로
            비즈니스를 더 쉽고 효과적으로 만들어 보세요.
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link to={ROUTES.HOME} className="inline-flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <MessageSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">TalkTemplate</span>
            </Link>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">계정에 로그인</CardTitle>
              <CardDescription>
                이메일과 비밀번호를 입력해 주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>로그인 중...</>
                  ) : (
                    <>
                      로그인
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  아직 계정이 없으시나요?
                </span>{' '}
                <Button variant="link" asChild className="p-0">
                  <Link to={ROUTES.REGISTER}>회원가입하기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;