import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './stores/authStore'
import 'animate.css';
import { createPinia } from "pinia";

createApp(App)
.use(createPinia())
.use(store)
.use(router)
.mount('#app')
