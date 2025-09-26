export interface KartData {
  id: number
  kartNumber?: number
  onTrack: boolean
  pitLaneLane?: number
  pitLaneRow?: number
  kartQuality: KartQuality
}

export enum KartQuality {
  UNKNOWN = 'Unknown',
  SLOWEST = 'Slowest',
  SLOW = 'Slow',
  MEDIUM = 'Medium',
  FAST = 'Fast',
  FASTEST = 'Fastest',
}

export const KartQualityColorMap: Record<KartQuality, string> = {
  [KartQuality.UNKNOWN]: 'bg-gray-500',
  [KartQuality.SLOWEST]: 'bg-red-500',
  [KartQuality.SLOW]: 'bg-orange-500',
  [KartQuality.MEDIUM]: 'bg-yellow-500',
  [KartQuality.FAST]: 'bg-lime-500',
  [KartQuality.FASTEST]: 'bg-green-500',
}
