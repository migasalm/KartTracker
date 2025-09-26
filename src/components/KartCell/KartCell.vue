<script setup lang="ts">
import useKarts from '@/composables/useKarts'
import type { KartData } from '@/types/karts'
import { KartQualityColorMap } from '@/types/karts'

const props = defineProps<{ kartData: KartData }>()

const { selectKart, selectedKartData } = useKarts()
</script>
<template>
  <div
    class="w-12 h-12 border border-gray-400 dark:border-gray-500 flex items-center justify-center hover:cursor-pointer hover:bg-gray-300"
    :class="[
      KartQualityColorMap[kartData.kartQuality],
      selectedKartData?.id === kartData.id ? 'ring-4 ring-blue-500' : '',
    ]"
    @click="selectKart(kartData.id)"
  >
    {{ kartData.kartNumber }}
  </div>
</template>
