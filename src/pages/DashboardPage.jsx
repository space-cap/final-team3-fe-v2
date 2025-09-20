import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  FileText,
  CheckCircle,
  Clock,
  Plus,
  MessageSquare,
  BarChart3,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    {
      title: '생성된 템플릿',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: FileText,
      color: 'blue',
    },
    {
      title: '승인된 템플릿',
      value: '8',
      change: '+3',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'green',
    },
    {
      title: '대기 중',
      value: '4',
      change: '-1',
      changeType: 'negative',
      icon: Clock,
      color: 'orange',
    },
    {
      title: '승인률',
      value: '92%',
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'purple',
    },
  ];

  const recentTemplates = [
    {
      title: '신제품 출시 알림',
      time: '2시간 전',
      status: '승인됨',
      statusColor: 'green',
    },
    {
      title: '할인 이벤트 안내',
      time: '1일 전',
      status: '심사중',
      statusColor: 'yellow',
    },
    {
      title: '주문 확인 알림',
      time: '3일 전',
      status: '승인됨',
      statusColor: 'green',
    },
    {
      title: '배송 완료 안내',
      time: '5일 전',
      status: '승인됨',
      statusColor: 'green',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
          <p className="text-muted-foreground">
            템플릿 생성 및 관리 현황을 한눈에 확인해보세요.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link to={ROUTES.CHAT} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              새 템플릿 생성
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 text-${stat.color}-600`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span
                    className={`inline-flex items-center gap-1 ${
                      stat.changeType === 'positive'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {stat.change} 이번 달
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              빠른 작업
            </CardTitle>
            <CardDescription>
              자주 사용하는 기능들에 빠르게 접근하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start h-auto p-4">
              <Link to={ROUTES.CHAT}>
                <div className="flex items-center gap-3 w-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium">새 템플릿 생성</div>
                    <div className="text-sm text-muted-foreground">
                      AI와 대화하며 템플릿 만들기
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full justify-start h-auto p-4">
              <Link to={ROUTES.TEMPLATES}>
                <div className="flex items-center gap-3 w-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium">템플릿 관리</div>
                    <div className="text-sm text-muted-foreground">
                      기존 템플릿 확인 및 수정
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              최근 템플릿
            </CardTitle>
            <CardDescription>
              최근에 생성한 템플릿들의 상태를 확인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTemplates.map((template, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-1">
                  <h4 className="font-medium leading-none">{template.title}</h4>
                  <p className="text-sm text-muted-foreground">{template.time}</p>
                </div>
                <Badge
                  variant={
                    template.statusColor === 'green'
                      ? 'default'
                      : template.statusColor === 'yellow'
                      ? 'secondary'
                      : 'outline'
                  }
                  className={
                    template.statusColor === 'green'
                      ? 'bg-green-100 text-green-800 hover:bg-green-100'
                      : template.statusColor === 'yellow'
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                      : ''
                  }
                >
                  {template.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;