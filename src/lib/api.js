// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/api/auth/login',
  SIGNUP: '/api/auth/signup',
  EMAIL_OTP_REQUEST: '/api/auth/email/otp/request',
  EMAIL_OTP_VERIFY: '/api/auth/email/otp/verify',
};

// Helper function to build full API URL
export const getApiUrl = (endpoint) => {
  // If we're using proxy in development, use relative path
  if (import.meta.env.DEV) {
    return endpoint;
  }
  // Otherwise use full URL
  return `${API_BASE_URL}${endpoint}`;
};

// Fetch wrapper with error handling
export const apiRequest = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP Error: ${response.status}`);
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  getApiUrl,
  apiRequest,
};