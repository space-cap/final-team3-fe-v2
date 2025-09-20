import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Plus,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Trash2,
  MessageSquare,
  Calendar,
  Tag,
} from 'lucide-react';

const TemplatesPage = () => {
  const [statusFilter, setStatusFilter] = useState('전체');
  const [categoryFilter, setCategoryFilter] = useState('전체');

  const templates = [
    {
      id: 1,
      title: '신제품 출시 알림',
      content: '안녕하세요, {{고객명}}님! 새로운 제품이 출시되었습니다. 지금 확인해보세요!',
      status: '승인됨',
      statusColor: 'green',
      createdAt: '2025-01-15',
      category: '마케팅',
      views: 245
    },
    {
      id: 2,
      title: '할인 이벤트 안내',
      content: '{{고객명}}님, 특별 할인 이벤트를 놓치지 마세요! 50% 할인 혜택을 지금 바로 받아보세요.',
      status: '심사중',
      statusColor: 'yellow',
      createdAt: '2025-01-14',
      category: '프로모션',
      views: 89
    },
    {
      id: 3,
      title: '주문 확인 알림',
      content: '{{고객명}}님의 주문이 정상적으로 접수되었습니다. 주문번호: {{ORDER_ID}}',
      status: '승인됨',
      statusColor: 'green',
      createdAt: '2025-01-12',
      category: '주문',
      views: 156
    },
    {
      id: 4,
      title: '배송 완료 안내',
      content: '{{고객명}}님, 주문하신 상품이 배송 완료되었습니다. 수령 확인 부탁드립니다.',
      status: '반려됨',
      statusColor: 'red',
      createdAt: '2025-01-10',
      category: '배송',
      views: 23
    },
    {
      id: 5,
      title: '멤버십 갱신 안내',
      content: '{{고객명}}님의 프리미엄 멤버십이 갱신되었습니다. 계속해서 특별 혜택을 만나보세요.',
      status: '승인됨',
      statusColor: 'green',
      createdAt: '2025-01-08',
      category: '멤버십',
      views: 67
    },
    {
      id: 6,
      title: '생일 축하 쿠폰',
      content: '{{고객명}}님, 생일을 축하드립니다! 특별한 생일 쿠폰을 선물로 드리고 싶어요.',
      status: '승인됨',
      statusColor: 'green',
      createdAt: '2025-01-05',
      category: '이벤트',
      views: 134
    }
  ];

  const getStatusBadge = (status, color) => {
    const variants = {
      green: { variant: 'default', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      yellow: { variant: 'secondary', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
      red: { variant: 'destructive', className: 'bg-red-100 text-red-800 hover:bg-red-100' }
    };

    const config = variants[color] || variants.green;
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      '마케팅': 'bg-blue-100 text-blue-800',
      '프로모션': 'bg-purple-100 text-purple-800',
      '주문': 'bg-green-100 text-green-800',
      '배송': 'bg-orange-100 text-orange-800',
      '멤버십': 'bg-indigo-100 text-indigo-800',
      '이벤트': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const filteredTemplates = templates.filter(template => {
    const statusMatch = statusFilter === '전체' || template.status === statusFilter;
    const categoryMatch = categoryFilter === '전체' || template.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">템플릿 관리</h1>
          <p className="text-muted-foreground">
            생성된 템플릿을 확인하고 관리하세요.
          </p>
        </div>
        <Button asChild>
          <Link to={ROUTES.CHAT} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            새 템플릿 생성
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <CardTitle>템플릿 필터</CardTitle>
            </div>
            <CardDescription>전체 {filteredTemplates.length}개 템플릿</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">상태별 필터</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="전체">전체 상태</SelectItem>
                    <SelectItem value="승인됨">승인됨</SelectItem>
                    <SelectItem value="심사중">심사중</SelectItem>
                    <SelectItem value="반려됨">반려됨</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">카테고리별 필터</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="전체">전체 카테고리</SelectItem>
                    <SelectItem value="마케팅">마케팅</SelectItem>
                    <SelectItem value="프로모션">프로모션</SelectItem>
                    <SelectItem value="주문">주문</SelectItem>
                    <SelectItem value="배송">배송</SelectItem>
                    <SelectItem value="멤버십">멤버십</SelectItem>
                    <SelectItem value="이벤트">이벤트</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-all duration-200">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Link
                    to={`/templates/${template.id}`}
                    className="font-semibold leading-tight hover:text-primary transition-colors line-clamp-2"
                  >
                    {template.title}
                  </Link>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(template.status, template.statusColor)}
                    <Badge variant="outline" className={getCategoryColor(template.category)}>
                      <Tag className="h-3 w-3 mr-1" />
                      {template.category}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/templates/${template.id}`} className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        상세보기
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      수정
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      복사
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {template.content}
              </p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {template.createdAt}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {template.views}
                  </div>
                </div>
              </div>

              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to={`/templates/${template.id}`} className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  템플릿 보기
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">템플릿이 없습니다</h3>
            <p className="text-muted-foreground text-center mb-6">
              선택하신 필터 조건에 맞는 템플릿이 없습니다.
              <br />
              새로운 템플릿을 생성해보세요.
            </p>
            <Button asChild>
              <Link to={ROUTES.CHAT} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                첫 번째 템플릿 만들기
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TemplatesPage;