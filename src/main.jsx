import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { router } from './routes';
import { queryClient } from './api/queryClient';
import { ToastProvider } from './components/ui/Toast';
import { ThemeBridge } from './components/ThemeBridge';
import { AppTweaks } from './components/tweaks/AppTweaks';
import { AuthBootstrap } from './components/AuthBootstrap';
import './styles/tokens.css';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeBridge />
      <AuthBootstrap />
      <ToastProvider>
        <RouterProvider router={router} />
        <AppTweaks />
      </ToastProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
