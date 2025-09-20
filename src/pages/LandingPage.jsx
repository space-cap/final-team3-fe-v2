import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowRight, Zap, Shield, CheckCircle, Sparkles, MessageSquare, Clock } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-6">
              <Sparkles className="mr-2 h-3 w-3" />
              AI 기반 스마트 템플릿 생성기
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              카카오톡 알림톡 템플릿을
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                {' '}AI로 쉽게
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              복잡한 정책 검토는 이제 그만. AI가 카카오 알림톡 정책을 완벽히 분석하여
              승인 가능한 템플릿을 자동으로 생성해드립니다.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-base">
                <Link to={ROUTES.REGISTER} className="flex items-center gap-2">
                  무료로 시작하기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base">
                <Link to={ROUTES.LOGIN}>로그인</Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                무료 체험 가능
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                신용카드 불필요
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                즉시 사용 가능
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              왜 TalkTemplate을 선택해야 할까요?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              소상공인과 마케터를 위한 가장 스마트한 카카오톡 알림톡 솔루션
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI 자동 생성</CardTitle>
                <CardDescription>
                  고급 AI 기술로 비즈니스 내용에 맞는 최적의 템플릿을 자동 생성합니다.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>정책 완벽 준수</CardTitle>
                <CardDescription>
                  카카오 알림톡의 까다로운 심사 기준을 100% 만족하는 템플릿을 제공합니다.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>빠른 승인</CardTitle>
                <CardDescription>
                  정책 위반 걱정 없이 첫 제출부터 빠르게 승인받고 마케팅을 시작하세요.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>다양한 업종 지원</CardTitle>
                <CardDescription>
                  쇼핑몰, 카페, 병원, 미용실 등 모든 업종에 맞는 전문 템플릿을 제공합니다.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>실시간 최적화</CardTitle>
                <CardDescription>
                  최신 정책 변경사항을 실시간으로 반영하여 항상 최신 기준에 맞춘 템플릿을 제공합니다.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
                  <CheckCircle className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>사용법 간단</CardTitle>
                <CardDescription>
                  복잡한 설정 없이 몇 번의 클릭만으로 전문적인 알림톡 템플릿을 완성할 수 있습니다.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <Card className="border-0 bg-muted/50">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                지금 바로 시작해보세요
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                카카오톡 알림톡 마케팅의 새로운 경험을 무료로 체험해보세요.
                몇 분 안에 완벽한 템플릿을 만들 수 있습니다.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link to={ROUTES.REGISTER} className="flex items-center gap-2">
                    무료 체험 시작하기
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;