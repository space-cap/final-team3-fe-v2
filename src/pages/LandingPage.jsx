import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  ArrowRight,
  Zap,
  Shield,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Clock,
  Star,
  TrendingUp,
  Users,
  Rocket,
  Award,
  Target,
  BarChart3,
  Lightbulb,
  User
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* 배경 그라디언트 */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-orange-100/30 to-amber-50" />

        {/* 애니메이션 배경 요소들 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-orange-300/20 rounded-full blur-2xl animate-bounce" />
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            {/* 스페셜 배지 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-200 mb-8 backdrop-blur-sm">
              <Rocket className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700">AI 혁신 기술로 만든 세계 최초의 카카오톡 알림톡 생성기</span>
              <Sparkles className="w-4 h-4 text-orange-600" />
            </div>

            {/* 메인 타이틀 */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500">
                카카오톡 알림톡
              </span>
              <span className="block text-slate-900 mt-2">
                5초 만에 완성
              </span>
            </h1>

            {/* 서브타이틀 */}
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
              <span className="font-semibold text-orange-600">99.8% 승인률</span>을 자랑하는 AI가
              <br className="hidden sm:block" />
              당신의 비즈니스에 맞는 완벽한 템플릿을 즉시 생성합니다
            </p>

            {/* CTA 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                size="lg"
                asChild
                className="h-16 px-12 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Link to={ROUTES.REGISTER} className="flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  지금 무료로 체험하기
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-16 px-12 text-lg font-semibold border-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300"
              >
                <Link to={ROUTES.LOGIN}>
                  이미 회원이신가요?
                </Link>
              </Button>
            </div>

            {/* 신뢰도 지표들 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">50,000+</div>
                <div className="text-slate-600">만족한 사용자</div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">99.8%</div>
                <div className="text-slate-600">템플릿 승인율</div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">5초</div>
                <div className="text-slate-600">평균 생성 시간</div>
              </div>
            </div>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-orange-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* 배경 요소들 */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-20">
            <Badge className="mb-6 px-4 py-2 bg-orange-100 text-orange-700 border-orange-200 font-medium">
              <Star className="w-4 h-4 mr-2" />
              세계 최초 AI 카카오톡 알림톡 생성기
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
                왜 TalkTemplate을
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                선택해야 할까요?
              </span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              소상공인과 마케터를 위한 가장 스마트한 카카오톡 알림톡 솔루션으로<br />
              <span className="font-semibold text-orange-600">99.8% 승인률</span>을 경험해보세요
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/5 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <Card className="relative border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group-hover:scale-[1.02]">
                <CardHeader className="p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-3">AI 자동 생성</CardTitle>
                  <CardDescription className="text-lg text-slate-600 leading-relaxed">
                    고급 AI 기술로 비즈니스 내용에 맞는 최적의 템플릿을 자동 생성합니다.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <Card className="relative border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group-hover:scale-[1.02]">
                <CardHeader className="p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-3">정책 완벽 준수</CardTitle>
                  <CardDescription className="text-lg text-slate-600 leading-relaxed">
                    카카오 알림톡의 까다로운 심사 기준을 100% 만족하는 템플릿을 제공합니다.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <Card className="relative border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group-hover:scale-[1.02]">
                <CardHeader className="p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-3">빠른 승인</CardTitle>
                  <CardDescription className="text-lg text-slate-600 leading-relaxed">
                    정책 위반 걱정 없이 첫 제출부터 빠르게 승인받고 마케팅을 시작하세요.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Feature 4 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/5 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <Card className="relative border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group-hover:scale-[1.02]">
                <CardHeader className="p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-3">다양한 업종 지원</CardTitle>
                  <CardDescription className="text-lg text-slate-600 leading-relaxed">
                    쇼핑몰, 카페, 병원, 미용실 등 모든 업종에 맞는 전문 템플릿을 제공합니다.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Feature 5 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-yellow-500/5 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <Card className="relative border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group-hover:scale-[1.02]">
                <CardHeader className="p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-3">실시간 최적화</CardTitle>
                  <CardDescription className="text-lg text-slate-600 leading-relaxed">
                    최신 정책 변경사항을 실시간으로 반영하여 항상 최신 기준에 맞춘 템플릿을 제공합니다.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Feature 6 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/5 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <Card className="relative border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group-hover:scale-[1.02]">
                <CardHeader className="p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-3">사용법 간단</CardTitle>
                  <CardDescription className="text-lg text-slate-600 leading-relaxed">
                    복잡한 설정 없이 몇 번의 클릭만으로 전문적인 알림톡 템플릿을 완성할 수 있습니다.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* 강력한 배경 그라디언트 */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* 애니메이션 배경 요소들 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-200/20 rounded-full blur-2xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-orange-300/15 rounded-full blur-xl animate-bounce" />
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            {/* 최종 어필 배지 */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
              <Award className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">30일 무료 체험 + 평생 지원</span>
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            {/* 메인 CTA 타이틀 */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              <span className="block">오늘부터</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100">
                마케팅 혁신을 경험하세요
              </span>
            </h2>

            {/* 서브타이틀 */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
              카카오톡 알림톡 마케팅의 새로운 차원을 경험해보세요.<br />
              <span className="font-bold text-amber-100">5초만에 완벽한 템플릿</span>을 만들고 즉시 성과를 확인하세요.
            </p>

            {/* CTA 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                asChild
                className="h-20 px-16 text-xl font-bold bg-white text-orange-600 hover:bg-gray-50 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-2xl border-0"
              >
                <Link to={ROUTES.REGISTER} className="flex items-center gap-4">
                  <Rocket className="w-7 h-7" />
                  무료로 시작하기
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-20 px-16 text-xl font-bold border-2 border-white/50 text-white hover:bg-white/10 hover:border-white transition-all duration-300 rounded-2xl backdrop-blur-sm"
              >
                <Link to={ROUTES.LOGIN} className="flex items-center gap-3">
                  <User className="w-6 h-6" />
                  로그인하기
                </Link>
              </Button>
            </div>

            {/* 보장 문구 */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium">신용카드 불필요</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium">5초 내 가입 완료</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium">즉시 사용 가능</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;