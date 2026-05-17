import type { SampleFabric } from './types'

const series = [
  { id: '3092', name: '云皱棉', count: 9 },
  { id: '3100', name: '菱朵棉', count: 7 },
  { id: '6049', name: '蝴蝶园林', count: 5 },
  { id: '6467', name: '幸运叶语', count: 15 },
  { id: '8416', name: '兰精莫代尔2x2罗纹', count: 20 }
] as const

export const sampleFabrics: SampleFabric[] = series.flatMap((item) =>
  Array.from({ length: item.count }, (_, index) => {
    const number = String(index + 1).padStart(2, '0')
    const id = `${item.id}-${number}`

    return {
      id,
      name: `${item.name} ${number}`,
      seriesId: item.id,
      seriesName: item.name,
      url: `/samples/swatches/${id}.jpg`
    }
  })
)
