import { authGuard } from "./router-guards";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    authGuard(to, from, next);
  } else {
    next();
  }
});

export default router;