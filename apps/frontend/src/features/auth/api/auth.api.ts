import { apiClient } from '@/lib/axios';
import { LoginDto, RegisterDto, AuthResponseDto } from '@hospeon/shared';

export const authApi = {
  login: async (data: LoginDto): Promise<{ data: AuthResponseDto; message: string }> => {
    return apiClient.post('/auth/login', data);
  },

  register: async (data: RegisterDto): Promise<{ data: AuthResponseDto; message: string }> => {
    return apiClient.post('/auth/register', data);
  },

  getMe: async (): Promise<{ data: AuthResponseDto['user']; message: string }> => {
    return apiClient.get('/auth/me');
  },

  logout: async (): Promise<void> => {
    return apiClient.post('/auth/logout');
  },
};
