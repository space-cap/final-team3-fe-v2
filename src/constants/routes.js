export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CHAT: '/chat',
  TEMPLATES: '/templates',
  TEMPLATE_DETAIL: '/templates/:id',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOT_FOUND: '/404'
};

export const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];
export const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.CHAT, ROUTES.TEMPLATES, ROUTES.PROFILE, ROUTES.SETTINGS];