<script setup lang="ts">
import useKarts from '@/composables/useKarts'
import { KartQuality, KartQualityColorMap } from '@/types/karts'
import { ref, watch } from 'vue'
const {
  selectedKartData,
  saveKartConfiguration,
  sendKartToTrack,
  sendKartToPitlane,
  pitLaneLanes,
} = useKarts()

const configuredKartNumber = ref<number>(selectedKartData.value?.kartNumber ?? 0)
const configuredKartQuality = ref<KartQuality>(
  selectedKartData.value?.kartQuality ?? KartQuality.UNKNOWN,
)

watch(
  () => selectedKartData.value,
  (newVal) => {
    configuredKartNumber.value = newVal?.kartNumber ?? 0
    configuredKartQuality.value = newVal?.kartQuality ?? KartQuality.UNKNOWN
  },
)
</script>
<template>
  <h3 class="text-xl mb-2 font-bold text-white">Kart Configurator</h3>
  <div v-if="selectedKartData" class="flex flex-row gap-2">
    <div
      class="flex flex-col gap-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 p-4"
    >
      <div class="flex flex-col gap-2">
        <div class="text-gray-900 dark:text-gray-100 font-semibold">Selected Kart:</div>
        <div class="text-gray-700 dark:text-gray-300">
          #{{ selectedKartData?.kartNumber }} - {{ selectedKartData?.kartQuality }}
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="text-gray-900 dark:text-gray-100 font-semibold">Quality:</div>
        <div class="text-gray-700 dark:text-gray-300">
          {{ selectedKartData?.kartQuality }}
        </div>
      </div>
    </div>
    <div
      class="flex flex-col w-[400px] gap-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 p-4"
    >
      <div class="flex flex-col gap-2">
        <div class="text-gray-900 dark:text-gray-100 font-semibold">Kart Number:</div>
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          v-model="configuredKartNumber"
        />
      </div>
      <div class="flex flex-col gap-2">
        <div class="text-gray-900 dark:text-gray-100 font-semibold">Kart Quality:</div>
        <div class="flex flex-row gap-2">
          <div
            v-for="(color, quality) in KartQualityColorMap"
            :key="quality"
            class="w-8 h-8 border border-gray-400 dark:border-gray-500 flex items-center justify-center hover:cursor-pointer"
            :class="[, color, configuredKartQuality === quality ? 'ring-4 ring-blue-500' : '']"
            @click="configuredKartQuality = quality"
          ></div>
        </div>
      </div>
      <button
        :disabled="configuredKartNumber === null || configuredKartQuality === null"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="saveKartConfiguration(configuredKartNumber, configuredKartQuality)"
      >
        Save Configuration
      </button>
      <div class="flex flex-col gap-2">
        <div v-if="!selectedKartData?.onTrack">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400"
            :disabled="!selectedKartData?.kartNumber || selectedKartData?.pitLaneRow !== 1"
            @click="sendKartToTrack(selectedKartData.id)"
          >
            Send to Track
          </button>
          <div
            v-if="!selectedKartData?.kartNumber || selectedKartData?.pitLaneRow !== 1"
            class="text-gray-400 text-sm italic"
          >
            (Kart must be configured and in the first row of pitlane to send to track)
          </div>
        </div>
        <div v-else v-for="lane in pitLaneLanes">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            @click="sendKartToPitlane(selectedKartData?.id, lane)"
          >
            Send to Pitlane Lane {{ lane }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
