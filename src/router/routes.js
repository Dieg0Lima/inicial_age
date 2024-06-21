import LoginPage from "@/views/LoginPage.vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import HomeComponent from "@/components/Home/HomeComponent.vue";
// import DetailComponent from "@/components/Attendant/DetailComponent.vue";
import ClientLayout from "@/views/attendant/ClientDetailsView.vue";
import ClientDetails from "@/views/attendant/ClientDetailsPage.vue";
import ClientActions from "@/views/attendant/ClientActionsPage.vue";
import OltListComponent from "@/components/OLTs/OltListComponent.vue";
import SearchPage from "@/views/searchClient/searchClientView.vue";

import { useClientDetailsStore } from "@/stores/clientDetailsStore";
import SolicitationsComponent from "@/components/solicitations/SolicitationsComponent.vue";
import NativeHome from "@/components/native/NativeHome.vue";

const routes = [
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/",
    component: DefaultLayout,
    meta: {
      inicioSelected: true,
      requiresAuth: true,
    },
    children: [
      {
        path: "/inicio",
        component: HomeComponent,
        meta: {
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
        path: "atendimento/",
        component: ClientLayout,
        requiresAuth: true,
        props: true,
        children: [
          {
            path: "detalhes/:id",
            name: "client-details",
            beforeEnter: async (to, from, next) => {
              const store = useClientDetailsStore();
              await store.fetchDetails(to.params.id);

              if (!store.client) {
                next("/atendimento/inicio");
              } else {
                next();
              }
            },
            component: ClientDetails,
            props: true,
            meta: {
              requiresAuth: true,
            },
          },

          {
            path: "acoes/:id",
            name: "client-actions",
            component: ClientActions,
            props: true,
            meta: {
              requiresAuth: true,
            },
          },
        ],
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
        path: "solicitacoes/inicio",
        component: SolicitationsComponent,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "native/",
        component: NativeHome,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

export default routes;
