import * as THREE from 'three'
import type { FabricAnalysis, MaterialSettings, ProcessedFabric } from './types'

const TILE_SIZE = 1024

interface ProcessInput {
  id: string
  name: string
  url: string
}

export async function processFabricImage(input: ProcessInput): Promise<ProcessedFabric> {
  const image = await loadImage(input.url)
  const tileCanvas = createMirroredTile(image)
  const analysis = analyzeFabric(tileCanvas)
  const normalCanvas = createNormalMap(tileCanvas)

  const texture = new THREE.CanvasTexture(tileCanvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.anisotropy = 8

  const normalTexture = new THREE.CanvasTexture(normalCanvas)
  normalTexture.wrapS = THREE.RepeatWrapping
  normalTexture.wrapT = THREE.RepeatWrapping
  normalTexture.anisotropy = 8

  return {
    id: input.id,
    name: input.name,
    sourceUrl: input.url,
    tileCanvas,
    normalCanvas,
    texture,
    normalTexture,
    analysis,
    suggestedSettings: {
      repeat: [3, 3],
      rotation: 0,
      roughness: analysis.roughness,
      normalStrength: analysis.normalStrength
    }
  }
}

export function applyTextureSettings(
  texture: THREE.Texture,
  settings: Pick<MaterialSettings, 'repeat' | 'rotation'>
) {
  texture.repeat.set(settings.repeat[0], settings.repeat[1])
  texture.center.set(0.5, 0.5)
  texture.rotation = THREE.MathUtils.degToRad(settings.rotation)
  texture.needsUpdate = true
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type = 'image/png',
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Canvas export failed.'))
      }
    }, type, quality)
  })
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Unable to load fabric image: ${url}`))
    image.src = url
  })
}

function createMirroredTile(image: HTMLImageElement): HTMLCanvasElement {
  const source = document.createElement('canvas')
  source.width = TILE_SIZE
  source.height = TILE_SIZE
  const sourceContext = requiredContext(source)
  drawCoverImage(sourceContext, image, TILE_SIZE, TILE_SIZE)

  const output = document.createElement('canvas')
  output.width = TILE_SIZE
  output.height = TILE_SIZE
  const outputContext = requiredContext(output)
  const half = TILE_SIZE / 2

  drawMirroredQuadrant(outputContext, source, 0, 0, false, false, half)
  drawMirroredQuadrant(outputContext, source, half, 0, true, false, half)
  drawMirroredQuadrant(outputContext, source, 0, half, false, true, half)
  drawMirroredQuadrant(outputContext, source, half, half, true, true, half)

  return output
}

function drawMirroredQuadrant(
  context: CanvasRenderingContext2D,
  source: HTMLCanvasElement,
  x: number,
  y: number,
  flipX: boolean,
  flipY: boolean,
  size: number
) {
  context.save()
  context.translate(x + (flipX ? size : 0), y + (flipY ? size : 0))
  context.scale(flipX ? -1 : 1, flipY ? -1 : 1)
  context.drawImage(source, 0, 0, source.width, source.height, 0, 0, size, size)
  context.restore()
}

function drawCoverImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number
) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
  const scaledWidth = image.naturalWidth * scale
  const scaledHeight = image.naturalHeight * scale
  const dx = (width - scaledWidth) / 2
  const dy = (height - scaledHeight) / 2
  context.imageSmoothingQuality = 'high'
  context.drawImage(image, dx, dy, scaledWidth, scaledHeight)
}

function analyzeFabric(canvas: HTMLCanvasElement): FabricAnalysis {
  const context = requiredContext(canvas)
  const image = context.getImageData(0, 0, canvas.width, canvas.height)
  const pixels = image.data
  const step = 16
  let r = 0
  let g = 0
  let b = 0
  let luminance = 0
  let luminanceSquared = 0
  let count = 0

  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const index = (y * canvas.width + x) * 4
      const red = pixels[index]
      const green = pixels[index + 1]
      const blue = pixels[index + 2]
      const light = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255

      r += red
      g += green
      b += blue
      luminance += light
      luminanceSquared += light * light
      count += 1
    }
  }

  const avgR = Math.round(r / count)
  const avgG = Math.round(g / count)
  const avgB = Math.round(b / count)
  const avgLuminance = luminance / count
  const variance = Math.max(luminanceSquared / count - avgLuminance * avgLuminance, 0)
  const contrast = Math.sqrt(variance)

  return {
    baseColor: rgbToHex(avgR, avgG, avgB),
    contrast: Number(contrast.toFixed(3)),
    roughness: Number(clamp(0.72 + contrast * 1.4, 0.66, 0.96).toFixed(2)),
    normalStrength: Number(clamp(0.18 + contrast * 2.4, 0.16, 0.72).toFixed(2))
  }
}

function createNormalMap(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const context = requiredContext(canvas)
  const source = context.getImageData(0, 0, canvas.width, canvas.height)
  const output = document.createElement('canvas')
  output.width = canvas.width
  output.height = canvas.height
  const outputContext = requiredContext(output)
  const target = outputContext.createImageData(canvas.width, canvas.height)
  const width = canvas.width
  const height = canvas.height
  const luminance = new Float32Array(width * height)

  for (let index = 0; index < luminance.length; index += 1) {
    const pixel = index * 4
    luminance[index] =
      (source.data[pixel] * 0.2126 + source.data[pixel + 1] * 0.7152 + source.data[pixel + 2] * 0.0722) /
      255
  }

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const left = luminance[y * width + ((x - 1 + width) % width)]
      const right = luminance[y * width + ((x + 1) % width)]
      const up = luminance[((y - 1 + height) % height) * width + x]
      const down = luminance[((y + 1) % height) * width + x]
      const dx = (right - left) * 3.5
      const dy = (down - up) * 3.5
      const normal = normalize(-dx, -dy, 1)
      const targetIndex = (y * width + x) * 4

      target.data[targetIndex] = Math.round((normal.x * 0.5 + 0.5) * 255)
      target.data[targetIndex + 1] = Math.round((normal.y * 0.5 + 0.5) * 255)
      target.data[targetIndex + 2] = Math.round((normal.z * 0.5 + 0.5) * 255)
      target.data[targetIndex + 3] = 255
    }
  }

  outputContext.putImageData(target, 0, 0)
  return output
}

function normalize(x: number, y: number, z: number) {
  const length = Math.hypot(x, y, z) || 1
  return { x: x / length, y: y / length, z: z / length }
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, '0')).join('')}`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function requiredContext(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) {
    throw new Error('2D canvas is not available.')
  }
  return context
}
