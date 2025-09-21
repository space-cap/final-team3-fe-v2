import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../constants/routes';
import { API_ENDPOINTS, getApiUrl } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { MessageSquare, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerificationToken, setEmailVerificationToken] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendVerification = async () => {
    if (!formData.email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.EMAIL_OTP_REQUEST), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await response.json();

      if (response.ok) {
        setEmailSent(true);
        setError('');
      } else {
        setError(data.message || '인증번호 전송에 실패했습니다.');
      }
    } catch (error) {
      setError('네트워크 오류가 발생했습니다.');
      console.error('OTP request error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.verificationCode) {
      setError('인증번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.EMAIL_OTP_VERIFY), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          code: formData.verificationCode
        })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.data && data.data.verificationToken) {
          setEmailVerificationToken(data.data.verificationToken);
          setError('');
          // OTP 검증 성공 시 회원가입 진행
          await handleSignUp(data.data.verificationToken);
        } else {
          setError('인증 토큰을 받지 못했습니다.');
        }
      } else {
        setError(data.message || '인증번호가 올바르지 않습니다.');
      }
    } catch (error) {
      setError('네트워크 오류가 발생했습니다.');
      console.error('OTP verify error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (verificationToken) => {
    const result = await register(
      formData.email,
      formData.password,
      formData.name,
      formData.verificationCode,
      verificationToken
    );

    if (result.success) {
      navigate(ROUTES.CHAT);
    } else {
      setError(result.error || '회원가입에 실패했습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    if (!formData.verificationCode) {
      setError('인증번호를 입력해주세요.');
      setLoading(false);
      return;
    }

    // OTP 검증부터 시작
    await handleVerifyOTP();
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
            지금 바로 시작하세요
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            무료로 가입하고 AI가 도와주는
            카카오톡 알림톡 템플릿 생성기를 체험해보세요.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">무료 가입 및 체험</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">AI 자동 템플릿 생성</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">정책 완벽 준수 보장</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Register form */}
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
              <CardTitle className="text-2xl">계정 만들기</CardTitle>
              <CardDescription>
                아래 정보를 입력하여 계정을 만들어 주세요
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
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className="pl-10"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSendVerification}
                      size="sm"
                      className="whitespace-nowrap"
                    >
                      인증번호 전송
                    </Button>
                  </div>
                  {emailSent && (
                    <p className="text-sm text-green-600 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      인증번호가 이메일로 전송되었습니다.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verificationCode">인증번호</Label>
                  <Input
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    placeholder="6자리 인증번호"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    required
                    autoComplete="one-time-code"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
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
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autoComplete="new-password"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      autoComplete="new-password"
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>가입 중...</>
                  ) : (
                    <>
                      계정 만들기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  이미 계정이 있으시나요?
                </span>{' '}
                <Button variant="link" asChild className="p-0">
                  <Link to={ROUTES.LOGIN}>로그인하기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;