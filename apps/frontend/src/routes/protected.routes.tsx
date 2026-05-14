import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AppShell } from '@/components/layout/AppShell';
import { Role } from '@hospeon/shared';

// Feature Pages
import { Dashboard as DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { Patients as PatientsPage } from '@/features/patients/pages/PatientsPage';
import { PatientProfile } from '@/features/patients/pages/PatientProfile';
import { AppointmentCalendar } from '@/features/appointments/pages/AppointmentCalendar';

export const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <AppShell />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { 
            path: 'patients', 
            element: <ProtectedRoute allowedRoles={[Role.DOCTOR, Role.NURSE, Role.ADMIN, Role.RECEPTIONIST]} />, 
            children: [
              { path: '', element: <PatientsPage /> },
              { path: ':id', element: <PatientProfile /> }
            ]
          },
          { path: 'appointments', element: <AppointmentCalendar /> }
          // We can mount remaining feature routes here later
        ]
      }
    ]
  }
];
