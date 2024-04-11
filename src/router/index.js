import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import axiosInstance from '@/api/axios';
import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  authStore.loadToken();

  if (to.meta.requiresAuth) {
    try {
      const token = authStore.token;
      if (!token) {
        throw new Error('Token não encontrado');
      }

      await axiosInstance.post('authentication/validate_token', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      next();
    } catch (error) {
      console.error('Erro ao validar o token:', error);
      next('/login');
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next('/inicio');
  } else {
    next();
  }
});

export default router;
