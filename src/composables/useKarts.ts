import { computed, ref } from 'vue'
import { type KartData, KartQuality } from '@/types/karts'

const trackKarts = ref()
const initialNumberOfKartsInPitLane = ref()

const pitLaneLanes = ref()
const selectedKartData = ref<KartData | null>(null)

const kartRoster = computed(() => {
  const roster: KartData[] = []
  const totalTrackKarts = trackKarts.value || 0
  const totalPitLaneKarts = initialNumberOfKartsInPitLane.value || 0
  const totalKarts = totalTrackKarts + totalPitLaneKarts

  let pitIndex = 0 // counter for karts in pit

  for (let i = 1; i <= totalKarts; i++) {
    const onTrack = i <= totalTrackKarts
    const kartData: KartData = {
      id: i,
      onTrack,
      kartQuality: KartQuality.UNKNOWN,
      pitLaneLane: undefined,
      pitLaneRow: undefined,
    }

    if (!onTrack && pitLaneLanes.value) {
      const index = pitIndex++

      kartData.pitLaneLane = (index % pitLaneLanes.value) + 1
      kartData.pitLaneRow = Math.floor(index / pitLaneLanes.value) + 1
    }

    roster.push(kartData)
  }

  return roster
})

const numberOfKartsInPitLane = computed(() => {
  return kartsInPitLane.value ? kartsInPitLane.value.length : 0
})

const kartsOnTrack = ref<KartData[]>()
const kartsInPitLane = ref<KartData[]>()

export default function useKarts() {
  function generateKartRoster() {
    kartsOnTrack.value = kartRoster.value.filter((kart) => kart.onTrack)
    kartsInPitLane.value = kartRoster.value.filter((kart) => !kart.onTrack)
  }

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
        selectedKartData.value = { ...kart } // Update the selected kart data
      }
    }
  }

  function sendKartToTrack(id: number) {
    const kart = kartsInPitLane.value?.find((k) => k.id === id)

    if (kart) {
      kart.onTrack = true
      kartsOnTrack.value?.push(kart)
      kartsInPitLane.value = kartsInPitLane.value?.filter((k) => k.id !== id)

      selectedKartData.value = { ...kart } // Update the selected kart data

      // Every pitlane kart after this one needs to move up a row
      if (kart.pitLaneLane && kart.pitLaneRow) {
        kartsInPitLane.value?.forEach((k) => {
          if (
            k.pitLaneLane === kart.pitLaneLane &&
            k.pitLaneRow &&
            k.pitLaneRow > kart.pitLaneRow!
          ) {
            k.pitLaneRow!--
          }
        })
      }
    }
  }

  function sendKartToPitlane(id: number, lane: number) {
    console.log('Sending kart to pitlane:', id, 'to lane', lane)
    const kart = kartsOnTrack.value?.find((k) => k.id === id)
    if (kart) {
      kart.onTrack = false
      kart.pitLaneLane = lane
      kart.pitLaneRow =
        (kartsInPitLane.value?.filter((k) => k.pitLaneLane === lane).length || 0) + 1
      kartsInPitLane.value?.push(kart)
      kartsOnTrack.value = kartsOnTrack.value?.filter((k) => k.id !== id)
      selectedKartData.value = { ...kart } // Update the selected kart data
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
    initialNumberOfKartsInPitLane,
    pitLaneLanes,
    kartsInPitLane,
    sendKartToTrack,
    sendKartToPitlane,
    generateKartRoster,
    numberOfKartsInPitLane,
  }
}
