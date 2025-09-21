import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import {
  Send,
  Plus,
  Bot,
  User,
  Clock,
  Eye,
  CheckCircle,
  AlertCircle,
  FileText,
  MessageSquare,
  Sparkles,
  Save,
  Copy,
  RefreshCw,
  Edit3,
  Trash2,
  Search,
  Settings,
  ChevronRight,
  MoreHorizontal,
  Menu,
  X,
  MessageCircle,
  LogOut,
  UserCircle,
} from 'lucide-react';

const ChatPage = () => {
  const { isDark } = useTheme();
  const { user, logout } = useAuth();
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
    { id: 1, title: '신제품 출시 알림', timestamp: '2025-01-15 14:30', isActive: false },
    { id: 2, title: '할인 이벤트 안내', timestamp: '2025-01-14 16:22', isActive: false },
    { id: 3, title: '배송 완료 안내', timestamp: '2025-01-13 11:45', isActive: false },
    { id: 4, title: '회원 가입 환영', timestamp: '2025-01-12 09:20', isActive: false }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingConvId, setEditingConvId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  // 화면 크기 변경 감지 - 크기 변경시에는 강제로 상태 변경하지 않음
  useEffect(() => {
    const handleResize = () => {
      // 창 크기가 변경되어도 사용자가 설정한 상태를 유지
      // 다만 모바일에서 사이드바가 열려있을 때는 자동으로 닫아줌
      if (window.innerWidth < 768 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

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
    // 모든 대화를 비활성화
    setConversations(prev => prev.map(conv => ({ ...conv, isActive: false })));
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

  const deleteConversation = (convId) => {
    setConversations(prev => prev.filter(conv => conv.id !== convId));
  };

  const startEditingTitle = (convId, currentTitle) => {
    setEditingConvId(convId);
    setEditTitle(currentTitle);
  };

  const saveEditedTitle = (convId) => {
    if (editTitle.trim()) {
      setConversations(prev =>
        prev.map(conv =>
          conv.id === convId ? { ...conv, title: editTitle.trim() } : conv
        )
      );
    }
    setEditingConvId(null);
    setEditTitle('');
  };

  const selectConversation = (convId) => {
    setConversations(prev => prev.map(conv => ({
      ...conv,
      isActive: conv.id === convId
    })));
    // 실제 프로젝트에서는 여기서 해당 대화의 메시지를 로드
  };

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background relative">
      {/* 모바일 오버레이 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 닫힌 상태 사이드바 (아이콘만) */}
      {!sidebarOpen && (
        <div className={`w-16 flex flex-col border-r border-border ${
          isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-card text-card-foreground'
        }`}>
          <div className="p-4 border-b border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              title="사이드바 열기"
              className={`h-8 w-8 p-0 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-zinc-400 hover:text-orange-400 hover:bg-zinc-800/80 hover:scale-110'
                  : 'text-muted-foreground hover:text-orange-500 hover:bg-orange-50 hover:scale-110'
              }`}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 flex flex-col items-center py-4 space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={newConversation}
              title="새 채팅"
              className={`h-10 w-10 p-0 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-zinc-400 hover:text-orange-400 hover:bg-zinc-800/80 hover:scale-105'
                  : 'text-muted-foreground hover:text-orange-500 hover:bg-orange-50 hover:scale-105'
              }`}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              title="채팅 목록"
              className={`h-10 w-10 p-0 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-zinc-400 hover:text-orange-400 hover:bg-zinc-800/80 hover:scale-105'
                  : 'text-muted-foreground hover:text-orange-500 hover:bg-orange-50 hover:scale-105'
              }`}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-4 border-t border-border space-y-3">
            <Button
              variant="ghost"
              size="sm"
              title="설정"
              className={`h-8 w-8 p-0 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-zinc-400 hover:text-orange-400 hover:bg-zinc-800/80 hover:scale-110'
                  : 'text-muted-foreground hover:text-orange-500 hover:bg-orange-50 hover:scale-110'
              }`}
            >
              <Settings className="h-4 w-4" />
            </Button>

            {/* 사용자 프로필 */}
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                isDark ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700'
              }`}>
                {user?.name?.charAt(0) || 'U'}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                title="로그아웃"
                className={`h-8 w-8 p-0 rounded-lg transition-all duration-200 ${
                  isDark
                    ? 'text-zinc-400 hover:text-red-400 hover:bg-zinc-800/80 hover:scale-110'
                    : 'text-muted-foreground hover:text-red-500 hover:bg-red-50 hover:scale-110'
                }`}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 열린 상태 사이드바 */}
      {sidebarOpen && (
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed md:relative inset-y-0 left-0 z-50 md:z-auto
          w-80 flex flex-col border-r border-border
          transition-transform duration-300 ease-in-out
          ${isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-card text-card-foreground'}
        `}>
        {/* 상단 헤더 */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-sm">TalkTemplate</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              title="사이드바 닫기"
              className={`h-8 w-8 p-0 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-zinc-400 hover:text-orange-400 hover:bg-zinc-800/80 hover:scale-110'
                  : 'text-muted-foreground hover:text-orange-500 hover:bg-orange-50 hover:scale-110'
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={newConversation}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0 h-10 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            size="sm"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            새 템플릿 생성
          </Button>
        </div>

        {/* 검색 */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              isDark ? 'text-zinc-400' : 'text-muted-foreground'
            }`} />
            <Input
              placeholder="대화 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 h-9 ${
                isDark
                  ? 'bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600'
                  : 'bg-background border-input text-foreground placeholder:text-muted-foreground'
              }`}
            />
          </div>
        </div>

        {/* 대화 목록 */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            <div className="mb-4">
              <div className={`text-xs font-medium mb-2 px-3 ${
                isDark ? 'text-zinc-400' : 'text-muted-foreground'
              }`}>
                {searchTerm ? `검색 결과 (${filteredConversations.length})` : '최근 대화'}
              </div>
              <div className="space-y-1">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => selectConversation(conv.id)}
                    className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      conv.isActive
                        ? 'bg-orange-500/20 border-l-2 border-orange-500'
                        : isDark
                          ? 'hover:bg-zinc-800/50'
                          : 'hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      {editingConvId === conv.id ? (
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onBlur={() => saveEditedTitle(conv.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEditedTitle(conv.id);
                            if (e.key === 'Escape') setEditingConvId(null);
                          }}
                          className={`h-7 text-sm ${
                            isDark
                              ? 'bg-zinc-800 border-zinc-600 text-zinc-100'
                              : 'bg-background border-input text-foreground'
                          }`}
                          autoFocus
                        />
                      ) : (
                        <div className={`font-medium text-sm truncate mb-1 ${
                          isDark ? 'text-zinc-100' : 'text-foreground'
                        }`}>
                          {conv.title}
                        </div>
                      )}
                      <div className={`text-xs truncate ${
                        isDark ? 'text-zinc-400' : 'text-muted-foreground'
                      }`}>
                        {conv.timestamp}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditingTitle(conv.id, conv.title);
                        }}
                        className={`h-7 w-7 p-0 ${
                          isDark
                            ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConversation(conv.id);
                        }}
                        className={`h-7 w-7 p-0 ${
                          isDark
                            ? 'text-zinc-400 hover:text-red-400 hover:bg-zinc-700'
                            : 'text-muted-foreground hover:text-red-500 hover:bg-accent'
                        }`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                {filteredConversations.length === 0 && searchTerm && (
                  <div className={`text-center py-8 ${
                    isDark ? 'text-zinc-500' : 'text-muted-foreground'
                  }`}>
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">검색 결과가 없습니다</p>
                  </div>
                )}
              </div>
            </div>

            {/* 더 많은 대화 */}
            <div className="px-3">
              <Button
                variant="ghost"
                className={`w-full justify-start h-9 ${
                  isDark
                    ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <Clock className="h-4 w-4 mr-2" />
                모든 대화 보기
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Button>
            </div>
          </div>
        </ScrollArea>

        {/* 하단 메뉴 */}
        <div className="p-4 border-t border-border">
          <div className="space-y-3">
            {/* 메뉴 버튼들 */}
            <div className="space-y-1">
              <Button
                variant="ghost"
                className={`w-full justify-start h-9 transition-all duration-200 ${
                  isDark
                    ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 hover:scale-[1.02]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:scale-[1.02]'
                }`}
              >
                <FileText className="h-4 w-4 mr-2" />
                템플릿 관리
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start h-9 transition-all duration-200 ${
                  isDark
                    ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 hover:scale-[1.02]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:scale-[1.02]'
                }`}
              >
                <Settings className="h-4 w-4 mr-2" />
                설정
              </Button>
            </div>

            {/* 사용자 프로필 섹션 */}
            <div className={`flex items-center gap-3 p-3 rounded-lg ${
              isDark ? 'bg-zinc-900/50' : 'bg-orange-50/50'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                isDark ? 'bg-orange-500 text-white' : 'bg-orange-500 text-white'
              }`}>
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium truncate ${
                  isDark ? 'text-zinc-100' : 'text-zinc-900'
                }`}>
                  {user?.name || '사용자'}
                </div>
                <div className={`text-xs truncate ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                  {user?.email || 'user@example.com'}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                title="로그아웃"
                className={`h-8 w-8 p-0 rounded-lg transition-all duration-200 ${
                  isDark
                    ? 'text-zinc-400 hover:text-red-400 hover:bg-zinc-800 hover:scale-110'
                    : 'text-muted-foreground hover:text-red-500 hover:bg-red-100 hover:scale-110'
                }`}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* 메인 채팅 영역 */}
      <div className="flex-1 flex flex-col bg-background">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex-shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                )}

                <div className={`max-w-2xl ${
                  message.type === 'user'
                    ? 'bg-zinc-900 text-white rounded-2xl px-4 py-3'
                    : 'bg-transparent'
                }`}>
                  <div className={`${
                    message.type === 'bot'
                      ? 'text-zinc-800'
                      : ''
                  }`}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </p>
                    <p className={`text-xs mt-2 flex items-center gap-1 ${
                      message.type === 'user' ? 'text-white/70' : 'text-zinc-500'
                    }`}>
                      <Clock className="h-3 w-3" />
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-200 flex-shrink-0">
                    <User className="h-5 w-5 text-zinc-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t p-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="어떤 알림톡 템플릿을 만들고 싶으신가요?"
                  className="min-h-[48px] text-base border-2 border-zinc-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 rounded-xl px-4 py-3 pr-12"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-orange-500 hover:bg-orange-600 rounded-lg"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div className="text-xs text-zinc-500">예시:</div>
              <div className="flex gap-2 flex-wrap">
                {['신제품 출시 알림', '할인 이벤트 안내', '주문 완료 알림'].map((example) => (
                  <Button
                    key={example}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 rounded-full border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                    onClick={() => setInput(example)}
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 템플릿 미리보기 패널 */}
      <div className="w-96 border-l flex flex-col bg-zinc-50">
        <div className="border-b p-6 bg-white">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100">
              <FileText className="h-4 w-4 text-zinc-600" />
            </div>
            <h3 className="font-semibold text-zinc-900">미리보기</h3>
          </div>
        </div>

        {currentTemplate ? (
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-200">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-4 w-4 text-orange-500" />
                  <h4 className="font-semibold text-zinc-900">{currentTemplate.title}</h4>
                </div>
                <div className="bg-zinc-50 p-4 rounded-lg border">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-800">
                    {currentTemplate.content}
                  </pre>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-200">
                <div className="flex items-center gap-2 mb-4">
                  <RefreshCw className="h-4 w-4 text-blue-500" />
                  <h4 className="font-semibold text-zinc-900">변수</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentTemplate.variables.map((variable, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {variable}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-200">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <h4 className="font-semibold text-zinc-900">정책 준수도</h4>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-600">준수율</span>
                      <span className="font-semibold text-zinc-900">{currentTemplate.compliance.score}%</span>
                    </div>
                    <div className="w-full bg-zinc-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${currentTemplate.compliance.score}%` }}
                      ></div>
                    </div>
                  </div>

                  {currentTemplate.compliance.suggestions.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-zinc-800 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        개선 제안
                      </h5>
                      <ul className="text-xs space-y-1 text-zinc-600">
                        {currentTemplate.compliance.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start gap-2 p-2 bg-amber-50 rounded-lg">
                            <span className="text-amber-500 mt-0.5">•</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  저장
                </Button>
                <Button variant="outline" className="border-zinc-200 hover:bg-zinc-50">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </ScrollArea>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 mx-auto">
                <MessageSquare className="h-8 w-8 text-zinc-400" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-900">템플릿 생성 대기 중</p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  AI와 대화를 시작하면<br />
                  실시간으로 템플릿 미리보기가<br />
                  이 곳에 표시됩니다
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;