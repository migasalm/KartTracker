<script setup lang="ts">
import KartConfigurator from './components/KartConfigurator/KartConfigurator.vue'
import PitLane from './components/PitLane/PitLane.vue'
import TrackLane from './components/TrackLane/TrackLane.vue'
import useKarts from './composables/useKarts'

const {
  kartsOnTrack,
  kartRoster,
  trackKarts,
  pitLaneKarts,
  pitLaneLanes,
  selectedKartData,
  kartsInPitLane,
} = useKarts()
</script>

<template>
  {{ kartsInPitLane }}
  <div class="flex flex-col gap-4 p-4">
    <h1 class="text-3xl font-bold text-white mb-4">Race Information</h1>
    <div class="flex flex-row gap-4">
      <div class="max-w-max mb-4">
        <label
          for="number-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >How many karts on track:</label
        >
        <input
          type="number"
          id="number-input"
          aria-describedby="helper-text-explanation"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="0"
          required
          v-model="trackKarts"
        />
      </div>
      <div class="max-w-max mb-4">
        <label
          for="number-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >How many karts on pitlane:</label
        >
        <input
          type="number"
          id="number-input"
          aria-describedby="helper-text-explanation"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="0"
          required
          v-model="pitLaneKarts"
        />
      </div>
      <div class="max-w-max mb-4">
        <label
          for="number-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >How many lanes on pitlane:</label
        >
        <input
          type="number"
          id="number-input"
          aria-describedby="helper-text-explanation"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="0"
          required
          v-model="pitLaneLanes"
        />
      </div>
    </div>
    <div class="h-[1px] w-full bg-gray-300 dark:bg-gray-600 my-4"></div>

    <KartConfigurator v-if="selectedKartData" />
    <TrackLane v-if="kartsOnTrack.length" class="w-max mb-4" :karts="kartsOnTrack" />
    <PitLane v-if="kartRoster.length && pitLaneLanes" class="w-max" :karts="kartsInPitlane" />
  </div>
</template>

<style scoped></style>
