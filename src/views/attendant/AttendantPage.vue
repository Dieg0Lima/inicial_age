<template>
  <div class="w-screen h-screen bg-ellipse bg-white flex flex-col">
    <div class="flex-none bg-black" style="height: 5%"></div>
    <div class="flex-grow gap-2 flex p-2">
      <!-- Coluna Esquerda com Quadrados -->
      <div class="flex-1 p-1 grid grid-cols-2 grid-rows-2 gap-2">
        <!-- Quadrado 1 -->
        <div class="bg-white border-solid border-2 border-slate-200 rounded-xl">
          <div
            class="w-full flex flex-row items-center space-x-4 border-b border-solid border-slate-300"
          >
            <div class="mb-[-50px]"><userIlustration class="p-2" /></div>
            <div class="font-semibold text-md">Dados do cliente</div>
          </div>
          <div class="w-full pt-[50px]">
            <div class="p-4 space-y-4">
              <div>
                <span class="font-semibold">Diego Costa Lima</span>
                <div>
                  <div class="flex flex-col space-y-2">
                    <div class="flex flex-row space-x-2 items-center">
                      <div class="w-6">
                        <documentIcon />
                      </div>
                      <span>070.855.941-79</span>
                    </div>
                    <div class="flex flex-row space-x-4 items-center">
                      <div class="w-4">
                        <phoneIcon />
                      </div>
                      <span>61991659351</span>
                      <div class="w-4">
                        <phoneIcon />
                      </div>
                      <span>61991659351</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col">
                <span class="font-semibold">Endereço</span>
                <span>QNG 32</span>
              </div>
              <div class="flex flex-row space-x-6">
                <div class="flex flex-col">
                  <span class="font-semibold">Bairro</span>
                  <span>Taguatinga Norte</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">CEP</span>
                  <span>72130-320</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">Número</span>
                  <span>32</span>
                </div>
              </div>
              <div class="flex flex-col">
                <span class="font-semibold">Complemento</span>
                <span>Casa</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quadrado 2 -->
        <div class="bg-white border-solid border-2 border-slate-200 rounded-xl">
          <div
            class="w-full flex flex-row items-center space-x-4 border-b border-solid border-slate-300"
          >
            <div class="mb-[-50px]"><connectionIlustration class="p-2" /></div>
            <div class="font-semibold text-md">Dados de conexão</div>
          </div>
          <div class="w-full pt-[50px]">
            <div class="p-4 space-y-4">
              <div class="flex flex-row space-x-6">
                <div class="flex flex-col">
                  <span class="font-semibold">Equipamento</span>
                  <span>ALCLFC4F55A1</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">POP</span>
                  <span>BSA.TGA1.OLT.01 (Taguatinga)</span>
                </div>
              </div>
              <div class="flex flex-row space-x-6">
                <div class="flex flex-col">
                  <span class="font-semibold">Slot</span>
                  <span>1</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">PON</span>
                  <span>4</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">Porta</span>
                  <span>67</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">Potência da ONU</span>
                  <span>-21.488</span>
                </div>
              </div>
              <div class="flex flex-row space-x-6">
                <div class="flex flex-col">
                  <span class="font-semibold">SSID do Wi-Fi</span>
                  <span>Diego C Lima</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">Senha do Wi-Fi</span>
                  <span>33548158</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Quadrado 3 -->
        <div class="bg-white border-solid border-2 border-slate-200 rounded-xl">
          <div
            class="w-full flex flex-row items-center space-x-4 border-b border-solid border-slate-300"
          >
            <div class="mb-[-50px]"><contractIlustration class="p-2" /></div>
            <div class="font-semibold text-md">Dados do contrato</div>
          </div>
          <div class="w-full pt-[50px]">
            <div class="p-4 space-y-4">
              <div class="flex flex-col">
                <span class="font-semibold">Plano</span>
                <span>COLABORADOR 1 GIGA + DEEZER</span>
              </div>
              <div class="flex flex-row space-x-6">
                <div class="flex flex-col">
                  <span class="font-semibold">Contrato</span>
                  <span>69352</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">Bloqueios</span>
                  <span>0</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">Status</span>
                  <span>Normal</span>
                </div>
              </div>
              <div class="flex flex-row space-x-6">
                <div class="flex flex-col">
                  <span class="font-semibold">Inicio do contrato</span>
                  <span>03/04/2023</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">Fim da Vigência</span>
                  <span>03/04/2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Quadrado 4 -->
        <div class="bg-white border-solid border-2 border-slate-200 rounded-xl">
          <div
            class="w-full flex flex-row items-center space-x-4 border-b border-solid border-slate-300"
          >
            <div class="mb-[-50px]"><appIlustration class="p-2" /></div>
            <div class="font-semibold text-md">Dados do aplicativo</div>
          </div>
          <div class="w-full pt-[50px]">
            <div class="p-4 space-y-4">
              <div class="flex flex-row space-x-6">
                <div class="flex flex-col">
                  <span class="font-semibold">Usuário</span>
                  <span>diego.lima</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">E-mail</span>
                  <span>diego.lima@agetelecom.com.br</span>
                </div>
              </div>
              <div class="flex flex-row space-x-6">
                <div class="flex flex-col">
                  <span class="font-semibold">Último Acesso</span>
                  <span>20/02/2024</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">Token</span>
                  <span>Enviado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Coluna Direita -->
      <div class="flex-1 flex flex-col space-y-2">
        <!-- Card de Dados da Fatura -->
        <div
          class="bg-white border-2 border-solid border-slate-200 rounded-xl flex h-2/5 flex-row overflow-hidden"
        >
          <div class="w-6/12 h-full flex flex-col">
            <div
              class="flex items-center border-solid border-b border-r border-slate-200 p-2"
            >
              <div class="w-12">
                <billetIlustration class="w-4" />
              </div>
              <div class="font-semibold text-md ml-2">Dados da fatura</div>
            </div>
            <div
              id="Body"
              class="w-full h-full border-solid border-r border-slate-200 overflow-auto"
            >
              <div class="flex flex-row items-center p-4 space-x-2">
                <div class="w-16">
                  <billetIlustration />
                </div>
                <div class="flex flex-row space-x-8">
                  <div class="flex flex-col text-sm">
                    <span class="font-semibold">Data do vencimento</span>
                    <span>20/02/2024</span>
                  </div>
                  <div class="flex flex-col text-sm">
                    <span class="font-semibold">Valor</span>
                    <span>R$ 109,90</span>
                  </div>
                  <div class="flex flex-col text-sm">
                    <span class="font-semibold">Status</span>
                    <span>Pago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card de Dados do Aplicativo -->
        <div
          class="bg-white border-2 border-solid border-gray-200 rounded-xl h-3/5 overflow-hidden"
        >
          <div
            class="w-full flex items-center border-solid space-x-4 border-b border-gray-300 p-2"
          >
            <!-- Substitua appIlustration por seu componente ou ícone real -->
            <appIlustration />
            <div class="font-semibold text-md">Dados do aplicativo</div>
          </div>
          <div class="w-full">
            <div class="p-4 space-y-4">
              <div class="flex flex-row space-x-6">
                <div class="flex flex-col">
                  <span class="font-semibold">Usuário</span>
                  <span>diego.lima</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">E-mail</span>
                  <span>diego.lima@agetelecom.com.br</span>
                </div>
              </div>
              <div class="flex flex-row space-x-6">
                <div class="flex flex-col">
                  <span class="font-semibold">Último Acesso</span>
                  <span>20/02/2024</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">Token</span>
                  <span>Enviado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import userIlustration from "@/assets/ilustrations/attendant/userIlustration.vue";
import connectionIlustration from "@/assets/ilustrations/attendant/connectionIlustration.vue";
import contractIlustration from "@/assets/ilustrations/attendant/contractIlustration.vue";
import appIlustration from "@/assets/ilustrations/attendant/appIlustration.vue";
import billetIlustration from "@/assets/ilustrations/attendant/billetIlustration.vue";

import documentIcon from "@/assets/icons/attendant/documentIcon.vue";
import phoneIcon from "@/assets/icons/attendant/phoneIcon.vue";
</script>

<style lang="scss" scoped>
.bg-ellipse {
  background-image: url("/src/assets/ellipses/Ellipse-3.png");
  background-position: center;
  background-size: cover;
}
</style>
