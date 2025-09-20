import { useState } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '안녕하세요! 카카오 알림톡 템플릿 생성을 도와드리겠습니다. 어떤 종류의 알림톡을 만들고 싶으신가요?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [conversations, setConversations] = useState([
    { id: 1, title: '신제품 출시 알림', timestamp: '2025-01-15 14:30' },
    { id: 2, title: '할인 이벤트 안내', timestamp: '2025-01-14 16:22' }
  ]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // 시뮬레이션된 AI 응답
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: '좋습니다! 신제품 출시 알림톡을 만들어드리겠습니다. 제품명과 주요 특징을 알려주세요.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);

      // 템플릿 생성
      setCurrentTemplate({
        title: '신제품 출시 알림',
        content: `안녕하세요, {{고객명}}님!

🎉 새로운 제품이 출시되었습니다!

📱 제품명: {{제품명}}
💰 가격: {{가격}}
🚚 배송: {{배송정보}}

지금 주문하시면 특별 할인 혜택을 받으실 수 있습니다.

▶ 주문하기: {{주문링크}}

감사합니다.`,
        variables: ['고객명', '제품명', '가격', '배송정보', '주문링크'],
        compliance: {
          score: 95,
          issues: [],
          suggestions: ['고객명 변수 사용으로 개인화 효과 증대', '명확한 CTA 버튼 포함']
        }
      });
    }, 1000);
  };

  const newConversation = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: '안녕하세요! 새로운 템플릿 생성을 시작하겠습니다. 어떤 목적의 알림톡을 만들고 싶으신가요?',
        timestamp: new Date()
      }
    ]);
    setCurrentTemplate(null);
  };

  return (
    <div className="h-screen flex">
      {/* 사이드바 패널 */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={newConversation}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            새 대화 시작
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">이전 대화</h3>
            <div className="space-y-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <h4 className="font-medium text-gray-900 text-sm">{conv.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{conv.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 챗봇 패널 */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900">AI 템플릿 생성</h2>
          <p className="text-sm text-gray-600">AI와 대화하며 완벽한 알림톡 템플릿을 만들어보세요</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-lg px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              전송
            </button>
          </div>
        </div>
      </div>

      {/* 템플릿 뷰 패널 */}
      <div className="w-96 bg-gray-50 border-l border-gray-200 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900">템플릿 미리보기</h3>
        </div>

        {currentTemplate ? (
          <div className="flex-1 p-4 space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">{currentTemplate.title}</h4>
              <div className="bg-gray-50 p-3 rounded border text-sm">
                <pre className="whitespace-pre-wrap font-sans">{currentTemplate.content}</pre>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">변수 목록</h4>
              <div className="space-y-2">
                {currentTemplate.variables.map((variable, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {variable}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">정책 준수도</h4>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${currentTemplate.compliance.score}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {currentTemplate.compliance.score}%
                </span>
              </div>
              {currentTemplate.compliance.suggestions.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">제안사항:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {currentTemplate.compliance.suggestions.map((suggestion, index) => (
                      <li key={index}>• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
              템플릿 저장
            </button>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-sm">AI와 대화를 시작하면</p>
              <p className="text-sm">템플릿 미리보기가 여기에 표시됩니다</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;