<template>
  <div class="h-full w-full flex items-center justify-center flex-wrap">
    <div class="h-1/12 w-full flex items-center justify-center flex-wrap">
      <img class="w-4/12" src="@/assets/logos/logo_login.png" alt="" />
      <div class="w-full flex justify-center items-center mt-4">
        <p class="font-semibold text-age-colorDarkBlue text-2xl text-center">
          Log in
        </p>
      </div>
      <div class="w-full flex justify-center items-center mt-4">
        <p class="font-medium text-age-colorMidGray text-base text-center">
          Bem-vindo de volta!
        </p>
      </div>
      <div class="w-full flex justify-center items-center mt-2">
        <p class="font-medium text-age-colorMidGray text-base text-center">
          Acesse utilizando seu
          <b class="font-semibold text-age-colorOrange">usuário age!</b>
        </p>
      </div>
      <div class="border-form h-full w-8/12 rounded-3xl mt-8">
        <form @submit.prevent="login" :action="login">
          <div class="pl-4 pt-5">
            <p class="font-semibold text-age-colorMidGray">Identificação</p>
          </div>
          <div
            class="border-b-2 border-solid border-age-colorLightOrange ml-4 mr-4 mb-4 flex columns-1"
          >
            <div class="w-1/12 p-1 ml-4 mr-5 mb-4 mt-4">
              <manSvg />
            </div>
            <div class="w-full input-group">
              <input
                class="h-full w-full focus:outline-none focus:border-transparent font-medium"
                placeholder="Digite seu usuário"
                type="text"
                required
                v-model="payload.username"
                @keyup.enter="login"
              />
              <xmarkIcon
                v-if="payload.username"
                @click="clearField('username')"
                class="clear-field w-4 mr-2 fill-age-colorLightOrangeHover cursor-pointer"
              />
            </div>
          </div>
          <div class="pl-4 pt-5">
            <p class="font-semibold text-age-colorMidGray">Senha</p>
          </div>
          <div
            class="border-b-2 border-solid border-age-colorLightOrange ml-4 mr-4 mb-4 flex columns-1"
          >
            <div class="w-1/12 ml-4 mr-6 mb-4 mt-4">
              <keySvg />
            </div>
            <div class="w-full input-group">
              <input
                class="h-full w-full focus:outline-none focus:border-transparent font-medium"
                placeholder="Digite sua senha"
                :type="showedPassword ? 'text' : 'password'"
                required
                v-model="payload.password"
                @keyup.enter="login"
              />
              <xmarkIcon
                v-if="payload.password"
                @click="clearField('password')"
                class="clear-field w-4 mr-2 fill-age-colorLightOrangeHover cursor-pointer"
              />
            </div>
            <div
              v-if="payload.password"
              class="w-10 ml-4 mr-6 mb-4 mt-5 bg-transparent"
            >
              <div>
                <eyeSvg
                  v-if="showedPassword === false"
                  @click="showPassword()"
                  class="bg-transparent cursor-pointer"
                />
              </div>
              <div>
                <eyeOffSvg
                  v-if="showedPassword === true"
                  @click="showPassword()"
                  class="bg-transparent cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div class="pl-4 pt-5">
            <a
              href="https://api.whatsapp.com/send?phone=5561920037326"
              target="_blank"
              ><span
                class="font-bold text-sm text-age-colorOrange cursor-pointer"
                >Esqueceu sua senha?</span
              ></a
            >
          </div>
          <div class="w-full pt-6 pb-6 flex justify-center items-center">
            <div
              class="w-10/12 rounded-2xl flex justify-center items-center bg-age-colorOrange cursor-pointer hover:bg-age-colorLightOrangeHover transition-all"
              @click="login"
            >
              <span
                v-if="!authStore.loading"
                class="font-bold text-age-colorPureWhite p-4"
                >Log in</span
              >
              <div v-else class="p-4">
                <half-circle-spinner
                  :animation-duration="1000"
                  :size="24"
                  color="#ffffff"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import manSvg from "@/assets/app_icons/manSvg.vue";
import keySvg from "@/assets/app_icons/keySvg.vue";
import eyeSvg from "@/assets/app_icons/eyeSvg.vue";
import eyeOffSvg from "@/assets/app_icons/eyeOffSvg.vue";
import xmarkIcon from "@/assets/icons/xmarkIcon.vue";
import { ref } from "vue";
import { HalfCircleSpinner } from "epic-spinners";

const showedPassword = ref(false);

const showPassword = () => {
  showedPassword.value = !showedPassword.value;
};

const clearField = (fieldName) => {
  if (fieldName === "username") {
    payload.value.username = "";
  } else if (fieldName === "password") {
    payload.value.password = "";
  }
};

const payload = ref({
  username: "",
  password: "",
});

const authStore = useAuthStore();

const login = () => {
  authStore.login(payload.value);
};
</script>

<style lang="scss">
.border-form {
  border: solid 2px;
  border-color: #ffd6bb;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;

  .clear-icon {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: #495057;
  -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
  transition: background-color 5000s ease-in-out 0s;
}

/* Firefox */
input:-moz-ui-invalid {
  box-shadow: 0 0 0px 1000px #ffffff inset;
}

/* IE and Edge */
input:-ms-input-placeholder {
  color: #495057;
}
</style>
