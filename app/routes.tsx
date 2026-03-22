import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { Root } from './Root';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Lazy load the dashboard
const Dashboard = React.lazy(async () => ({ default: (await import('./pages/Dashboard')).Dashboard }));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, lazy: async () => ({ Component: (await import('./pages/Home')).Home }) },
      { path: 'dental', lazy: async () => ({ Component: (await import('./pages/Dental')).Dental }) },
      { path: 'hair', lazy: async () => ({ Component: (await import('./pages/Hair')).Hair }) },
      { path: 'blog', lazy: async () => ({ Component: (await import('./pages/Articles')).Articles }) },
      { path: 'articles', element: <Navigate to="/blog" replace /> },
      { path: 'doctors', lazy: async () => ({ Component: (await import('./pages/Doctors')).Doctors }) },
      { path: 'appointment', lazy: async () => ({ Component: (await import('./pages/Booking')).Booking }) },
      { path: 'booking', element: <Navigate to="/appointment" replace /> },
      { path: 'contact', lazy: async () => ({ Component: (await import('./pages/Contact')).Contact }) },
      { path: 'hollywood-smile', lazy: async () => ({ Component: (await import('./pages/HollywoodSmile')).HollywoodSmile }) },
      { path: 'hair/male', lazy: async () => ({ Component: (await import('./pages/MaleHairTransplant')).MaleHairTransplant }) },
      { path: 'hair/female', lazy: async () => ({ Component: (await import('./pages/FemaleHairTransplant')).FemaleHairTransplant }) },
      { path: 'hair/beard', lazy: async () => ({ Component: (await import('./pages/BeardTransplant')).BeardTransplant }) },
      { path: 'hair/eyebrow', lazy: async () => ({ Component: (await import('./pages/EyebrowTransplant')).EyebrowTransplant }) },
      { path: 'login', lazy: async () => ({ Component: (await import('./pages/auth/Login')).Login }) },
      { path: 'otp', lazy: async () => ({ Component: (await import('./pages/auth/OTP')).OTP }) },
      { path: 'forgot-password', lazy: async () => ({ Component: (await import('./pages/auth/ForgotPassword')).ForgotPassword }) },
      { path: 'reset-password', lazy: async () => ({ Component: (await import('./pages/auth/ResetPassword')).ResetPassword }) },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div>}>
          <Dashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});
