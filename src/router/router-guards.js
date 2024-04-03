import { useAuthStore } from '@/stores/authStore';

export function authGuard(to, from, next) {
  const store = useAuthStore();

  if (store.isAuthenticated) {
    next();
  } else {
    next('/login');
  }
}
