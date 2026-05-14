import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';
import { LoginDto, RegisterDto } from '@hospeon/shared';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: (response) => {
      setAuth(response.data.user, response.data.accessToken);
    },
  });
};

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: (data: RegisterDto) => authApi.register(data),
    onSuccess: (response) => {
      setAuth(response.data.user, response.data.accessToken);
    },
  });
};

export const useCurrentUser = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuth = useAuthStore((state) => state.setAuth);
  const token = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await authApi.getMe();
      // Sync store with fresh user data if needed
      if (token && response.data) {
        setAuth(response.data, token);
      }
      return response.data;
    },
    enabled: isAuthenticated,
    retry: false,
  });
};
