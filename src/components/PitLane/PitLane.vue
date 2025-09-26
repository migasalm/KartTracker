<script setup lang="ts">
import useKarts from '@/composables/useKarts'
import { computed } from 'vue'
import KartCell from '../KartCell/KartCell.vue'

const props = defineProps<{
  numberLanes: number
}>()
const { kartsInPitLane, numberOfKartsInPitLane, pitLaneLanes, kartRoster } = useKarts()

const pitLaneRows = computed(() => {
  // Check the lanes of kartsInPitlane, find the lane with most karts, return that number
  let maxKartsInLane = 0
  for (let lane = 1; lane <= props.numberLanes; lane++) {
    const kartsInThisLane =
      kartsInPitLane.value?.filter((kart) => kart.pitLaneLane === lane).length || 0
    if (kartsInThisLane > maxKartsInLane) {
      maxKartsInLane = kartsInThisLane
    }
  }
  return maxKartsInLane < kartRoster.value.length / props.numberLanes
    ? kartRoster.value.length / props.numberLanes
    : maxKartsInLane
})

const kartsPerLane = computed(() => {
  const lanes: { [key: number]: typeof kartsInPitLane.value } = {}
  for (let lane = 1; lane <= props.numberLanes; lane++) {
    lanes[lane] = kartsInPitLane.value?.filter((kart) => kart.pitLaneLane === lane)
  }
  return lanes
})
</script>

<template>
  <div class="flex flex-col">
    <h3 class="text-xl mb-2 font-bold text-white">Pitlane</h3>

    <div
      class="flex flex-col gap-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 p-4"
    >
      <div v-for="lane in pitLaneLanes" :key="lane" class="flex gap-3">
        <div class="flex flex-col -rotate-90">
          <div class="font-bold text-gray-900 dark:text-gray-100">Lane {{ lane }}</div>
        </div>
        <div v-for="row in pitLaneRows" :key="row" class="flex flex-col gap-">
          <KartCell
            v-if="kartsPerLane && kartsPerLane[lane] && kartsPerLane[lane][row - 1]"
            :kartData="kartsPerLane[lane][row - 1]"
          />
          <div
            v-else
            class="w-12 h-12 text-sm border border-dashed border-gray-400 rounded-lg text-gray-200 flex items-center justify-center"
          >
            Empty
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
