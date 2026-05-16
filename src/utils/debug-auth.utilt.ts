/**
 * Debug utilities for authentication issues
 * Use in browser console: window.debugAuth()
 */

import { logDebug, logWarn } from './logger.util';

export function setupAuthDebug() {
  if (typeof window === 'undefined') return;

  (window as any).debugAuth = async () => {
    const { useAuthStore } = await import('@/store/store');
    const state = useAuthStore.getState();

    return state;
  };

  (window as any).forceAuthReady = async () => {
    const { useAuthStore } = await import('@/store/store');
    logWarn('Forcing isInitializing to false');
    useAuthStore.setState({ isInitializing: false });
  };

  (window as any).clearAuth = async () => {
    const { useAuthStore } = await import('@/store/store');
    logWarn('Clearing all auth data');
    useAuthStore.getState().logout();
  };

  (window as any).checkToken = async () => {
    const { tokenManager } = await import('@/store/auth/tokenManager');
    const token = await tokenManager.getAuthToken();

    if (token) {
      logDebug('Token preview:', token.substring(0, 20) + '...');
    }
    return token;
  };

  (window as any).checkStorage = () => {
    logDebug(' Storage Debug');

    console.groupEnd();
  };
}
