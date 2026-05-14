import React from 'react';
import { RouteObject } from 'react-router-dom';
import AuthPage from '@/features/auth/pages/AuthPage';

export const publicRoutes: RouteObject[] = [
  { path: '/login', element: <AuthPage /> },
];
