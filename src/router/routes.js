import LoginPage from "@/views/LoginPage.vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import AttendantRouter from "@/components/Attendant/AttendantRouter.vue";
import HomeComponent from "@/components/Home/HomeComponent.vue";
import DetailComponent from "@/components/Attendant/DetailComponent.vue";
import ReportRouter from "@/components/Report/ReportRouter.vue";
import OltListComponent from "@/components/OLTs/OltListComponent.vue";

const routes = [
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/inicio',
        component: HomeComponent,
      },
      {
        path: '/atendimento/inicio',
        component: AttendantRouter,
      },
      {
        path: '/atendimento/:id2/:id1/',
        name: 'detalhes-contrato',
        component: DetailComponent,
        props: true,
      },
      {
        path: '/atendimento/olt/:contractId/:connectionId',
        component: OltListComponent,
        name: 'olt-list',
        props: true,
      },
      {
        path: 'relatorio/inicio',
        component: ReportRouter,
      },
    ]
  },
];
export default routes;
