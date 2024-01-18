
export const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'login',
        component: () => import("@/views/HomeView.vue"),
      },
      {
        path: '/inicio',
        name: 'route',
        component: () => import("@/views/RouterView.vue")
      }
    ]
  },
];
