import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
import 'animate.css';

createApp(App)
.use(store)
.use(router)
.mount('#app')
