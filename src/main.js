import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./stores/authStore";
import "animate.css";
import { createPinia } from "pinia";
import "./assets/tailwind.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Antd from "ant-design-vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(createPinia())
  .use(store)
  .use(router)
  .use(Toast)
  .use(Antd)
  .mount("#app");
