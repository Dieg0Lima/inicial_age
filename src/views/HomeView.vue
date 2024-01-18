<script>
import portal from "@/assets/modules/Portal.png";
import makesystem from "@/assets/modules/MakeSystem.png";
import native from "@/assets/modules/Native.png";
import takeblip from "@/assets/modules/TakeBlip.png";
import blipdesk from "@/assets/modules/BlipDesk.png";
import ozmap from "@/assets/modules/OzMap.png";
import voalle from "@/assets/modules/Voalle.png";
import clicksign from "@/assets/modules/Clicksign.png";
import glpi from "@/assets/modules/GLPI.png";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { AXIOS } from "@/Auth/adAuth.js";

export default {
  name: "GridSystem",
  data() {
    return {
      items: [
        {
          id: 1,
          bgColor: "linear-gradient(to right, #FFB600, #F93822)",
          imageUrl: portal,
          externalUrl: "http://portal/",
        },
        {
          id: 2,
          bgColor: "linear-gradient(to right, #21ADE3, #333F96)",
          imageUrl: makesystem,
          externalUrl: "https://agetelecom.makesystem.com.br/webcrm/",
        },
        {
          id: 3,
          bgColor: "#313F5D",
          imageUrl: native,
          externalUrl: "https://native.agetelecom.com.br/#!/login",
        },
        {
          id: 4,
          bgColor: "#FFFFFF",
          imageUrl: takeblip,
          externalUrl:
            "https://account.blip.ai/login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dblip-portal%26redirect_uri%3Dhttps%253A%252F%252Fagetelecom.blip.ai%252Fauthorize%26response_type%3Did_token%2520token%26scope%3Doffline_access%2520openid%2520profile%2520email%2520api-payment-service.full_access%2520api-extension-service.full_access%26state%3Dd385d68e2511409fa76518333c660803%26nonce%3Dada3d2b435404da4873c04289ef2a7f3",
        },
        {
          id: 5,
          bgColor: "#F3F6FA",
          imageUrl: blipdesk,
          externalUrl:
            "https://account.blip.ai/login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dblip-desk%26redirect_uri%3Dhttps%253A%252F%252Fagetelecom.desk.blip.ai%252Fauthorize%26response_type%3Did_token%2520token%26scope%3Dopenid%2520profile%2520email%26state%3D2ba1a58f0f6f4e9ea373af804f616f00%26nonce%3D4b63a24fc9b241a4bba5916859e610ff",
        },
        {
          id: 6,
          bgColor: "#FFFFFF",
          imageUrl: ozmap,
          externalUrl: "http://agetelecom.ozmap.com.br:9090/",
        },
        {
          id: 7,
          bgColor: "#FFFFFF",
          imageUrl: voalle,
          externalUrl: "https://erp.agetelecom.com.br/users/login",
        },
        {
          id: 8,
          bgColor: "#0057FF",
          imageUrl: clicksign,
          externalUrl: "https://app.clicksign.com/accounts/190196/memberships",
        },
        {
          id: 9,
          bgColor: "#FFFFFF",
          imageUrl: glpi,
          externalUrl: "http://suporte/",
        },
      ],
    };
  },
  setup() {
    const payload = ref({
      email: "",
      password: "",
    });
    const loading = ref(false);
    const response = ref({
      status: "",
      message: "",
      class: "",
      display: false,
    });

    const router = useRouter();
    const authStore = useAuthStore();

    // eslint-disable-next-line no-unused-vars
    const login = async () => {
      loading.value = true;
      response.value.display = false;
      response.value.class = "";

      try {
        const res = await AXIOS.post("auth/login_ad", payload.value, {
          headers: {
            "Content-Type": "application/json",
            Access: "application/json",
          },
        });
        authStore.loginUser({ token: res.data.access_token });
        router.replace("/inicio");
      } catch (error) {
        loading.value = false;
        if (error.response) {
          const errorResponse = error.response.status;
          switch (errorResponse) {
            case 401:
              response.value.display = true;
              response.value.status = "Erro:";
              response.value.message = "Usuário ou senha incorretos.";
              response.value.class = "trigger";
              break;
            case 500:
              break;
          }
        }
        response.value.display = true;
        response.value.status = "Erro:";
        response.value.message = "Erro interno, tente novamente mais tarde.";
        response.value.class = "";
      }
    };

    return {
      payload,
      loading,
      response,
      login,
    };
  },
};
</script>

<template>
  <div class="container-page">
    <div class="grid-container">
      <div
        v-for="item in items"
        :key="item.id"
        :style="{
          background: item.bgColor,
        }"
        class="grid-item"
      >
        <a :href="item.externalUrl" target="_blank" rel="noopener noreferrer">
          <div class="item-img">
            <img :src="item.imageUrl" :alt="`Ícone do ${item.name}`" />
          </div>
        </a>
      </div>
    </div>

    <div class="login-container">
      <img src="@/assets/AgeLogo.svg" alt="" />
      <div class="title-container">
        <span>Bem-vindo à <b>AGE</b> Telecom</span>

        <div class="subtitle-container">
          <span>Acesse com seu perfil AGE Telecom</span>
        </div>
      </div>

      <div class="form-container">
        <div class="username-container">
          <span>Usuário</span>
          <div class="input-container">
            <input
              type="text"
              placeholder="Digite seu usuário"
              v-model="payload.email"
            />
          </div>
        </div>
        <div class="password-container">
          <span>Senha</span>
          <div class="input-container">
            <input
              type="password"
              placeholder="Digite sua senha"
              v-model="payload.password"
            />
          </div>
        </div>
        <div class="footer-form">
          <div class="forget-password">
            <a href="http://suporte/" target="_blank">
              <label for="">Esqueceu a senha?</label></a
            >
          </div>
        </div>
        <div class="btn-container">
          <div class="btn-submit" @click="login">Entrar</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container-page {
  background-image: url("@/assets/AgeBackground.png");
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 5rem;
  animation: fadeIn 0.5s ease forwards;
}

.grid-container {
  margin-inline: 3vw;
  width: 50vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;
}

.grid-item {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 15vh;
  width: 15vw;
  border-radius: 15px;
  animation: fadeIn 1.5s ease forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.grid-item:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.item-img {
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  max-width: 90%;
  max-height: 80%;
  object-fit: contain;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.login-container {
  width: 30vw;
  height: 65vh;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  border-radius: 15px;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  animation: fadeIn 1.5s ease forwards;

  img {
    height: auto;
    width: 25%;
  }

  .title-container {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2vh;

    span {
      color: #0f2462;
      font-weight: 600;
      font-size: 1.8rem;

      b {
        font-weight: 900;
      }
    }

    .subtitle-container {
      span {
        color: #444444;
        font-weight: 500;
        font-size: 1rem;
      }
    }
  }

  .form-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .username-container {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;

      span {
        color: #0f2462;
        font-weight: 600;
      }

      .input-container {
        width: 100%;
        height: 6vh;

        input {
          width: 100%;
          height: 100%;
          border: #00000010 solid 2px;
          border-radius: 0.5rem;
          font-size: 1.2rem;
          color: #000000;
        }

        input::placeholder {
          font-size: 1rem;
          color: #00000050;
        }

        input:focus {
          border: 2px solid #ffb600;
          outline: none;
        }
      }
    }

    .password-container {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;

      span {
        color: #0f2462;
        font-weight: 600;
      }

      .input-container {
        width: 100%;
        height: 6vh;

        input {
          width: 100%;
          height: 100%;
          border: #00000010 solid 2px;
          border-radius: 0.5rem;
          font-size: 1.2rem;
          color: #000000;
        }

        input::placeholder {
          font-size: 1rem;
          color: #00000050;
        }

        input:focus {
          border: 2px solid #ffb600;
          outline: none;
        }
      }
    }

    .footer-form {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      a {
        color: inherit;
        text-decoration: none;
        background-color: transparent;
        cursor: auto;
      }

      .forget-password label {
        font-weight: 600;
        font-size: 0.8rem;
        color: #00000040;
        cursor: pointer;
      }

      .forget-password label:hover {
        color: #00000060;
      }
    }

    .btn-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 15px;

      .btn-submit {
        width: 100%;
        padding: 20px 0;
        text-align: center;
        background-image: linear-gradient(to right, #ffb600, #f93822);
        cursor: pointer;
        border: none;
        color: white;
        font-weight: bold;
        border-radius: 5px;
      }

      .btn-support {
        width: 100%;
        padding: 20px 0;
        text-align: center;
        background-color: #60bcff;
        cursor: pointer;
        border: none;
        color: white;
        font-weight: bold;
        border-radius: 5px;
      }
    }
  }
}
</style>
