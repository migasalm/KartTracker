<script setup lang="ts">
import type { KartData } from '../../types/karts'
import { KartQualityColorMap } from '../../types/karts'
import KartCell from '../KartCell/KartCell.vue'

const props = defineProps<{ karts: KartData[] }>()
</script>
<template>
  <div class="flex flex-col gap-2">
    <h3 class="text-xl font-bold text-white">On Track</h3>
    <div
      class="flex gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800"
    >
      <div v-for="kart in karts">
        <KartCell :kartData="kart" />
      </div>
    </div>
  </div>
</template>
