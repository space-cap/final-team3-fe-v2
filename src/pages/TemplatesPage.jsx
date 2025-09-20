import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const TemplatesPage = () => {
  const templates = [
    {
      id: 1,
      title: '신제품 출시 알림',
      content: '안녕하세요, {{고객명}}님! 새로운 제품이 출시되었습니다...',
      status: '승인됨',
      statusColor: 'green',
      createdAt: '2025-01-15',
      category: '마케팅'
    },
    {
      id: 2,
      title: '할인 이벤트 안내',
      content: '{{고객명}}님, 특별 할인 이벤트를 놓치지 마세요!...',
      status: '심사중',
      statusColor: 'yellow',
      createdAt: '2025-01-14',
      category: '프로모션'
    },
    {
      id: 3,
      title: '주문 확인 알림',
      content: '{{고객명}}님의 주문이 정상적으로 접수되었습니다...',
      status: '승인됨',
      statusColor: 'green',
      createdAt: '2025-01-12',
      category: '주문'
    },
    {
      id: 4,
      title: '배송 완료 안내',
      content: '{{고객명}}님, 주문하신 상품이 배송 완료되었습니다...',
      status: '반려됨',
      statusColor: 'red',
      createdAt: '2025-01-10',
      category: '배송'
    }
  ];

  const getStatusBadge = (status, color) => {
    const colors = {
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      red: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[color]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">템플릿 관리</h1>
          <p className="mt-2 text-gray-600">생성된 템플릿을 확인하고 관리하세요.</p>
        </div>
        <Link
          to={ROUTES.CHAT}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          새 템플릿 생성
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">전체 템플릿 ({templates.length}개)</h3>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>전체 상태</option>
                <option>승인됨</option>
                <option>심사중</option>
                <option>반려됨</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>전체 카테고리</option>
                <option>마케팅</option>
                <option>프로모션</option>
                <option>주문</option>
                <option>배송</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {templates.map((template) => (
            <div key={template.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/templates/${template.id}`}
                      className="text-lg font-medium text-gray-900 hover:text-blue-600"
                    >
                      {template.title}
                    </Link>
                    {getStatusBadge(template.status, template.statusColor)}
                  </div>
                  <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                    {template.content}
                  </p>
                  <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                    <span>카테고리: {template.category}</span>
                    <span>•</span>
                    <span>생성일: {template.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Link
                    to={`/templates/${template.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    상세보기
                  </Link>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;