import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { ROUTES } from '../../constants/routes';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { User, Settings, LogOut, MessageSquare, LayoutDashboard, FileText, Plus, Sun, Moon } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center space-x-6">
          <Link
            to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.HOME}
            className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-foreground">TalkTemplate</span>
          </Link>

          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent" asChild>
                <Link to={ROUTES.DASHBOARD} className="flex items-center space-x-2">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>대시보드</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent" asChild>
                <Link to={ROUTES.TEMPLATES} className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>템플릿 관리</span>
                </Link>
              </Button>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* 테마 토글 버튼 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white border-0"
                asChild
              >
                <Link to={ROUTES.CHAT} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>새 대화</span>
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-accent">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm">{user?.name}</p>
                      <p className="w-[200px] truncate text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.PROFILE} className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4" />
                      <span>프로필</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.SETTINGS} className="flex items-center space-x-2 text-sm">
                      <Settings className="h-4 w-4" />
                      <span>설정</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-sm text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>로그아웃</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
                <Link to={ROUTES.LOGIN}>로그인</Link>
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link to={ROUTES.REGISTER}>시작하기</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;