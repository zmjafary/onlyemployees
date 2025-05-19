
import { postData } from '@/services/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await postData<AuthResponse, LoginCredentials>('/auth/login', credentials);
    
    // Save token to localStorage
    localStorage.setItem('auth_token', response.token);
    
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  try {
    const response = await postData<AuthResponse, RegisterCredentials>('/auth/register', credentials);
    
    // Save token to localStorage
    localStorage.setItem('auth_token', response.token);
    
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await postData('/auth/logout', {});
    localStorage.removeItem('auth_token');
  } catch (error) {
    console.error('Logout failed:', error);
    // Still remove the token even if the API call fails
    localStorage.removeItem('auth_token');
  }
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('auth_token') !== null;
};

export const loginWithLinkedIn = async (token: string): Promise<AuthResponse> => {
  try {
    const response = await postData<AuthResponse, { token: string }>('/auth/linkedin/callback', { token });
    
    // Save token to localStorage
    localStorage.setItem('auth_token', response.token);
    
    return response;
  } catch (error) {
    console.error('LinkedIn login failed:', error);
    throw error;
  }
};
