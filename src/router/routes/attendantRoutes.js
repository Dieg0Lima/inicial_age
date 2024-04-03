export default [
    {
      path: 'inicio',
      component: () => import('@/components/Home/HomeComponent.vue'),
    },
    {
      path: 'atendimento/inicio',
      component: () => import('@/components/Attendant/AttendantRouter.vue'),
    },
];
  