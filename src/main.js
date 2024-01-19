import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './stores/authStore'
import 'animate.css';
import { createPinia } from "pinia";
import './assets/tailwind.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserSecret, faCircleInfo, faEye, faEyeSlash, fasStar, farStar);

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(createPinia())
.use(store)
.use(router)
.mount('#app')
