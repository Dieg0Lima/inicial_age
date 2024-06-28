<template>
  <a-config-provider :theme="themeConfig">
    <div class="w-screen h-screen p-4">
      <div class="h-full bg-white rounded-lg p-2">
        <div
          class="h-[8%] bg-age-colorOrange rounded-lg flex items-center px-4 justify-between"
        >
          <div class="flex flex-row items-center gap-4">
            <img :src="NativeIcon" />
            <h1 class="text-xl font-bold text-white">Áudios do Native</h1>
          </div>
          <div class="flex items-center h-full p-3">
            <a-input
              v-model="searchValue"
              @pressEnter="onSearch"
              placeholder="Pesquise aqui"
              class="h-full text-lg pl-10 bg-white"
              :style="{ width: '400px' }"
              prefix-icon
            >
              <template #prefix>
                <SearchIcon
                  class="w-6 absolute left-3 top-1/2 transform -translate-y-1/2"
                />
              </template>
            </a-input>

            <a-dropdown :trigger="['click']">
              <template #overlay>
                <a-menu
                  @click="handleMenuClick"
                  class="flex flex-col items-center justify-center gap-2"
                >
                  <a-date-picker
                    v-model:value="selectedDate"
                    class="w-full"
                    size="large"
                  />
                  <a-input
                    v-model:value="selectedSrc"
                    size="large"
                    placeholder="Origem"
                    class="w-full"
                  ></a-input>
                  <a-input
                    v-model:value="selectedDst"
                    class="w-full"
                    size="large"
                    placeholder="Destino"
                  ></a-input>
                  <a-button
                    size="large"
                    class="group bg-age-colorOrange text-white hover:bg-age-colorLightOrangeHover hover:text-white"
                    type="primary"
                    block
                    @click="applyFilters"
                  >
                    Aplicar Filtros
                  </a-button>
                </a-menu>
              </template>
              <a-button
                type="link"
                class="ml-2 h-full bg-white hover:bg-age-colorOrange group focus:outline-none border-solid hover:border-white"
                @click="onFilter"
              >
                <FilterIcon
                  class="w-6 h-6 stroke-age-colorOrange group-hover:stroke-white"
                />
              </a-button>
            </a-dropdown>
          </div>
        </div>
        <a-row class="h-[92%] w-full">
          <a-col :flex="2" class="h-full flex justify-center items-center">
            <div v-if="currentPlaying" class="album-cover-container">
              <img :src="currentPlaying.coverImage" class="album-cover-large" />
            </div>
            <div v-else>
              <a-empty :description="null" class="w-full" />
            </div>
          </a-col>
          <a-divider type="vertical" class="h-full" />
          <a-col class="overflow-y-auto list-container" :flex="3">
            <a-spin :spinning="loading">
              <a-list
                item-layout="horizontal"
                class="overflow-y-scroll"
                :data-source="audios"
              >
                <template #renderItem="{ item }">
                  <a-list-item>
                    <a-list-item-meta class="select-text">
                      <template #avatar>
                        <div
                          class="avatar-container"
                          @click="togglePlaying(item)"
                        >
                          <a-avatar
                            :src="getAvatar(item.isPlaying)"
                            :size="64"
                            :shape="item.isPlaying ? 'square' : 'circle'"
                          />
                          <div
                            class="avatar-overlay"
                            @mouseover="item.hovered = true"
                            @mouseleave="item.hovered = false"
                            :class="{
                              hovered: item.hovered,
                              square: item.isPlaying,
                              circle: !item.isPlaying,
                            }"
                          >
                            <img
                              :src="getHoverIcon(item.isPlaying)"
                              class="overlay-icon"
                            />
                          </div>
                        </div>
                      </template>
                      <template #title>
                        <div>{{ item.uniqueid }}</div>
                      </template>
                      <template #description>
                        <div class="flex flex-row justify-between">
                          <a-tooltip>
                            <template #title
                              >Data de inicio da chamada</template
                            >
                            <div>{{ formatDate(item.start) }}</div>
                          </a-tooltip>
                          <a-tooltip>
                            <template #title>Origem da chamada</template>
                            <div>{{ item.src }}</div>
                          </a-tooltip>
                          <a-tooltip>
                            <template #title>Destino da chamada</template>
                            <div>{{ item.dst }}</div>
                          </a-tooltip>
                          <a-tooltip>
                            <template #title>Direção da chamada</template>
                            <div>{{ item.direction }}</div>
                          </a-tooltip>
                        </div>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
            </a-spin>
          </a-col>
        </a-row>
        <div class="flex flex-col audio-bar" v-if="currentPlaying">
          <div
            class="w-full h-full progress-container"
            @mousedown="seekAudio"
            @click="onProgressClick"
          >
            <a-progress
              :percent="progress"
              :strokeLinecap="'square'"
              :strokeColor="customColor"
              :show-info="false"
            />
          </div>
          <div
            class="w-full h-full px-4 pb-2 flex flex-row justify-between items-center"
          >
            <div class="audio-controls flex items-center">
              <a-button
                borderless
                @click="togglePlaying(currentPlaying)"
                class="icon-button flex justify-center items-center mx-4"
              >
                <template v-if="currentPlaying.isPlaying">
                  <img :src="stopIcon" alt="Pause Icon" class="w-12 h-12" />
                </template>
                <template v-else>
                  <img :src="playIcon" alt="Play Icon" class="w-8 h-8" />
                </template>
              </a-button>
              <div class="flex flex-row gap-1">
                <span>{{ formatTime(currentTime) }}</span>
                <span>/</span>
                <span>{{
                  formatTime(currentPlaying.howl?.duration() || 0)
                }}</span>
              </div>
            </div>
            <div class="flex flex-row items-center">
              <img :src="currentPlaying.coverImage" class="album-cover" />
              <div class="flex flex-col">
                <span class="font-bold">{{ currentPlaying.name }}</span>
                <span class="text-sm from-neutral-400 font-semibold">{{
                  currentPlaying.attendant
                }}</span>
              </div>
            </div>

            <div class="flex flex-row gap-2">
              <a-select
                v-model="playbackRate"
                @change="changePlaybackRate"
                style="width: 100px"
                :default-value="1"
                size="large"
              >
                <a-select-option
                  v-for="rate in speedOptions"
                  :key="rate"
                  :value="rate"
                >
                  {{ rate }}x
                </a-select-option>
              </a-select>
              <a-button
                class="group bg-age-colorOrange text-white hover:bg-age-colorLightOrangeHover hover:text-white"
                type="primary"
                @click="downloadAudio"
                size="large"
              >
                Download
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-config-provider>
</template>

<script setup>
import { ref, watch, nextTick, computed } from "vue";
import { useNativeAudioStore } from "@/stores/nativeAudioStore.js";
import { Howl } from "howler";
import audioPlaying from "@/assets/icons/native/audioPlaying.png";
import audioNotPlaying from "@/assets/icons/native/audioNotPlaying.png";
import playIcon from "@/assets/icons/native/Play.png";
import stopIcon from "@/assets/icons/native/Pause.png";
import FilterIcon from "@/assets/icons/native/filterIcon.vue";
import NativeIcon from "@/assets/icons/native/NativeIcon.png";
import SearchIcon from "@/assets/icons/searchClient/searchIcon.vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const selectedDate = ref(null);
const selectedSrc = ref([]);
const selectedDst = ref([]);
const loading = ref(false);
const nativeAudioStore = useNativeAudioStore();
const audios = computed(() => nativeAudioStore.provisionResponse);

const handleMenuClick = (e) => {
  console.log("click", e);
};

const formatDate = (dateString) => {
  return dayjs.utc(dateString).format("DD/MM/YYYY HH:mm:ss");
};

async function applyFilters() {
  loading.value = true;

  const src = selectedSrc.value;
  const dst = selectedDst.value;

  await nativeAudioStore.nativeAudio({ src, dst });

  loading.value = false;

  if (nativeAudioStore.error) {
    console.error("Erro ao fazer a requisição:", nativeAudioStore.error);
  } else {
    console.log("Resposta da API:", nativeAudioStore.provisionResponse);
  }
}

const currentPlaying = ref(null);
const progress = ref(0);
const currentTime = ref(0);
const isPaused = ref(false);
const playbackRate = ref(1);
const speedOptions = [0.5, 1, 1.25, 1.5, 1.75, 2];
const customColor = ref("#FF8B3D");

function togglePlaying(item) {
  audios.value.forEach((audio) => {
    if (audio !== item) {
      if (audio.howl) {
        audio.howl.stop();
      }
      audio.isPlaying = false;
    }
  });

  if (!item.howl) {
    item.howl = new Howl({
      src: [item.url],
      html5: true,
      onend: function () {
        item.isPlaying = false;
      },
      onplay: async function () {
        currentPlaying.value = item;
        isPaused.value = false;
        updateCurrentTime();
        await nextTick();
        requestAnimationFrame(updateProgress);
      },
      onpause: function () {
        isPaused.value = true;
      },
      rate: playbackRate.value,
    });
  }

  if (item.isPlaying) {
    item.howl.pause();
  } else {
    item.howl.play();
    isPaused.value = false;
  }

  item.isPlaying = !item.isPlaying;
}

function updateCurrentTime() {
  if (currentPlaying.value && currentPlaying.value.isPlaying) {
    currentTime.value = currentPlaying.value.howl.seek();
    requestAnimationFrame(updateCurrentTime);
  }
}

function updateProgress() {
  if (currentPlaying.value && currentPlaying.value.isPlaying) {
    const duration = currentPlaying.value.howl.duration();
    progress.value = (currentPlaying.value.howl.seek() / duration) * 100;
    requestAnimationFrame(updateProgress);
  }
}

function formatTime(secs) {
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = Math.round(secs - minutes * 60) || 0;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function getAvatar(isPlaying) {
  return isPlaying ? audioPlaying : audioNotPlaying;
}

function getHoverIcon(isPlaying) {
  return isPlaying ? stopIcon : playIcon;
}

function onProgressClick(event) {
  if (!currentPlaying.value) return;

  const progressContainer = event.currentTarget;
  const rect = progressContainer.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const duration = currentPlaying.value.howl.duration();
  const newTime = (offsetX / rect.width) * duration;

  currentPlaying.value.howl.seek(newTime);
  updateCurrentTime();
  updateProgress();
}

function downloadAudio() {
  if (!currentPlaying.value) return;

  const link = document.createElement("a");
  link.href = currentPlaying.value.url;
  link.download = currentPlaying.value.uniqueid + ".mp3";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function changePlaybackRate(value) {
  playbackRate.value = value;
  if (currentPlaying.value && currentPlaying.value.howl) {
    currentPlaying.value.howl.rate(playbackRate.value);
  }
}

watch(currentPlaying, () => {
  if (currentPlaying.value && currentPlaying.value.howl) {
    progress.value =
      (currentPlaying.value.howl.seek() /
        currentPlaying.value.howl.duration()) *
      100;
    console.log(currentPlaying.value);
  }
});
</script>

<style scoped>
.list-container {
  max-height: 100%;
  overflow-y: auto;
}

.icon-button {
  background: none;
  border: none;
  padding: 0;
  box-shadow: none;
  cursor: pointer;
}

.icon-button img {
  width: 48px;
  height: 48px;
}

.avatar-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.avatar-overlay.circle {
  border-radius: 50%;
}

.avatar-overlay.square {
  border-radius: 25%;
}

.avatar-container:hover .avatar-overlay {
  opacity: 1;
}

.overlay-icon {
  width: 24px;
  height: 24px;
  z-index: 2;
}

.audio-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  z-index: 1000;
}

.album-cover {
  width: 64px;
  height: 64px;
  margin-right: 10px;
}

.album-cover-large {
  width: 100%;
  height: 100%;
}
</style>
