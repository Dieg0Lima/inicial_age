// @/stores/authStore.js
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useStorage('user', {
      token: ''
    }),
  }),
  getters: {
    isAuthenticated: (state) => !!state.user.token
  },
  actions: {
    loginUser({ token }) {
      this.user.token = token;
    },
    logoutUser() {
      this.user.token = '';
    }
  }
});
