import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            카카오 알림톡 템플릿
            <br />
            <span className="text-blue-600">AI 자동 생성 서비스</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            복잡한 정책을 고민할 필요 없이, AI가 카카오 알림톡 정책에 완벽하게 부합하는
            템플릿을 자동으로 생성해드립니다. 소상공인을 위한 쉽고 빠른 마케팅 솔루션입니다.
          </p>

          <div className="flex justify-center gap-4 mb-16">
            <Link
              to={ROUTES.REGISTER}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              무료로 시작하기
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              로그인
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI 자동 생성</h3>
              <p className="text-gray-600">
                원하는 내용만 입력하면 AI가 정책에 맞는 템플릿을 자동으로 생성합니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">정책 완벽 준수</h3>
              <p className="text-gray-600">
                까다로운 카카오 알림톡 정책을 100% 준수하여 승인 확률을 극대화합니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">빠른 승인</h3>
              <p className="text-gray-600">
                정책 위반으로 인한 반려 없이 빠르게 승인받고 마케팅을 시작하세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;