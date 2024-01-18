
export const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'login',
        component: () => import("@/views/HomeView.vue"),
      }
    ]
  },
];
