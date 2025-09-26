<script setup lang="ts">
import useKarts from '@/composables/useKarts'
import { computed } from 'vue'

const props = defineProps<{
  lanes: Number
  karts: Number
}>()

const { kartsInPitLane } = useKarts()
const pitLaneRows = computed(() => {
  return Math.ceil(props.karts / props.lanes)
})
</script>

<template>
  <div class="flex flex-col">
    <h3 class="text-xl mb-2 font-bold text-white">Pitlane</h3>

    <div
      class="flex flex-col gap-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 p-4"
    >
      <div v-for="lane in lanes" class="flex space-x-3">
        <div v-for="row in pitLaneRows" :key="row"></div>
      </div>
    </div>
  </div>
</template>
