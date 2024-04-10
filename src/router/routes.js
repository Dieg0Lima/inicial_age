import LoginPage from "@/views/LoginPage.vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import HomeComponent from "@/components/Home/HomeComponent.vue";
// import DetailComponent from "@/components/Attendant/DetailComponent.vue";
import ClientDetails from "@/views/attendant/ClientDetailsPage.vue";
import ReportRouter from "@/components/Report/ReportRouter.vue";
import OltListComponent from "@/components/OLTs/OltListComponent.vue";
import SearchPage from "@/views/searchClient/searchClientView.vue"

const routes = [
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "",
    requiresAuth: true,
  },
  {
    path: "/",
    component: DefaultLayout,
    requiresAuth: true,
    children: [
      {
        path: "/inicio",
        component: HomeComponent,
        meta: {
          inicioSelected: true,
          requiresAuth: true,
        },
      },
      {
        path: "/atendimento/inicio",
        component: SearchPage,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/atendimento/detalhes',
        name: 'client-details',
        component: ClientDetails,
        props: (route) => ({ details: route.query.details ? JSON.parse(route.query.details) : {} }),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/atendimento/olt/:contractId/:connectionId",
        component: OltListComponent,
        name: "olt-list",
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "relatorio/inicio",
        component: ReportRouter,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

export default routes;
