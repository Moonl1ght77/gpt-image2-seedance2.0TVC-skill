import type * as THREE from 'three'

export type GarmentPreset = 'homewear-long-set'

export interface SampleFabric {
  id: string
  name: string
  seriesId: string
  seriesName: string
  url: string
}

export interface MaterialSettings {
  repeat: [number, number]
  rotation: number
  roughness: number
  normalStrength: number
}

export interface FabricAnalysis {
  baseColor: string
  contrast: number
  roughness: number
  normalStrength: number
}

export interface ProcessedFabric {
  id: string
  name: string
  sourceUrl: string
  tileCanvas: HTMLCanvasElement
  normalCanvas: HTMLCanvasElement
  texture: THREE.CanvasTexture
  normalTexture: THREE.CanvasTexture
  analysis: FabricAnalysis
  suggestedSettings: MaterialSettings
}

export interface ExportManifest {
  fabricId: string
  fabricName: string
  garmentPreset: GarmentPreset
  files: {
    glb: string
    poster: string
    texture: string
  }
  material: {
    baseColor: string
    roughness: number
    repeat: [number, number]
    rotation: number
    normalStrength: number
  }
}
