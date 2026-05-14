import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { publicRoutes } from './public.routes';
import { protectedRoutes } from './protected.routes';

export default function AppRoutes() {
  const element = useRoutes([
    ...publicRoutes,
    ...protectedRoutes,
    { path: '*', element: <Navigate to="/dashboard" replace /> }
  ]);
  return <>{element}</>;
}
