import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: null,
    loading: false,
    responseMessage: '',
  }),
  actions: {
    async login(payload) {
      this.loading = true;
      this.responseMessage = '';

      try {
        const response = await axios.post('https://v1.ageportal.agetelecom.com.br/api/auth/login_ad', payload);
        this.token = response.data.access_token;
        this.loading = false;
        router.push('/atendimento/inicio');
      } catch (error) {
        this.responseMessage = 'Falha ao fazer login. Tente novamente mais tarde.';
        this.loading = false;
      }
    },
  },
});
