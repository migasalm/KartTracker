import { computed, ref } from 'vue'
import { type KartData, KartQuality } from '@/types/karts'

const trackKarts = ref()
const pitLaneKarts = ref()
const pitLaneLanes = ref()
const selectedKartData = ref<KartData | null>(null)

const kartRoster = computed(() => {
  const roster: KartData[] = []
  const totalTrackKarts = trackKarts.value || 0
  const totalPitLaneKarts = pitLaneKarts.value || 0
  const totalKarts = totalTrackKarts + totalPitLaneKarts

  let pitIndex = 0 // counter for karts in pit

  for (let i = 1; i <= totalKarts; i++) {
    const onTrack = i <= totalTrackKarts
    const kartData: KartData = {
      id: i,
      onTrack,
      kartQuality: KartQuality.UNKNOWN,
    }

    if (!onTrack && pitLaneLanes.value) {
      const index = pitIndex++

      kartData.pitLaneLane = (index % pitLaneLanes.value) + 1
      kartData.pitLaneRow = Math.floor(index / pitLaneLanes.value) + 1
      console.log(kartData)
    }

    roster.push(kartData)
  }
  return roster
})

const kartsOnTrack = computed(() => {
  return kartRoster.value.filter((kart) => kart.onTrack)
})

const kartsInPitLane = computed(() => {
  return kartRoster.value.filter((kart) => !kart.onTrack)
})

export default function useKarts() {
  function setKartNumber(id: number, kartNumber: number) {
    const kart = kartRoster.value.find((k) => k.id === id)
    if (kart) {
      kart.kartNumber = kartNumber
    }
  }

  function setKartQuality(id: number, quality: KartQuality) {
    const kart = kartRoster.value.find((k) => k.id === id)
    if (kart) {
      kart.kartQuality = quality
    }
  }

  function selectKart(id: number) {
    const kart = kartRoster.value.find((k) => k.id === id) || null

    selectedKartData.value = kart
  }

  function saveKartConfiguration(kartNumber: number, kartQuality: KartQuality) {
    if (selectedKartData.value) {
      const kart = kartRoster.value.find((k) => k.id === selectedKartData.value?.id)
      if (kart) {
        kart.kartNumber = kartNumber
        kart.kartQuality = kartQuality
        console.log('Saved configuration for kart:', kart)
        selectedKartData.value = { ...kart } // Update the selected kart data
      }
    }
  }

  return {
    kartRoster,
    kartsOnTrack,
    setKartNumber,
    setKartQuality,
    selectKart,
    saveKartConfiguration,
    selectedKartData,
    trackKarts,
    pitLaneKarts,
    pitLaneLanes,
    kartsInPitLane,
  }
}
