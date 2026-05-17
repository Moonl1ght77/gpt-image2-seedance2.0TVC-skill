import { createIcons, icons } from 'lucide'
import './styles.css'
import { GarmentScene } from './garmentScene'
import { canvasToBlob, processFabricImage } from './fabricProcessing'
import { createExportZip } from './exportPackage'
import { sampleFabrics } from './samples'
import type { ExportManifest, MaterialSettings, ProcessedFabric, SampleFabric } from './types'

const canvas = element<HTMLCanvasElement>('#scene-canvas')
const scene = new GarmentScene(canvas)

const statusText = element('#status-text')
const sampleGrid = element('#sample-grid')
const uploadInput = element<HTMLInputElement>('#fabric-upload')
const resetCameraButton = element<HTMLButtonElement>('#reset-camera')
const resetMaterialButton = element<HTMLButtonElement>('#reset-material')
const exportButton = element<HTMLButtonElement>('#export-package')

const fabricName = element('#fabric-name')
const fabricMeta = element('#fabric-meta')
const textureChip = element<HTMLDivElement>('#texture-chip')
const baseColorValue = element('#base-color')
const contrastValue = element('#contrast-value')

const controls = {
  repeatX: control('repeat-x', 'repeat-x-value', (value) => value.toFixed(2)),
  repeatY: control('repeat-y', 'repeat-y-value', (value) => value.toFixed(2)),
  rotation: control('rotation', 'rotation-value', (value) => `${Math.round(value)}°`),
  roughness: control('roughness', 'roughness-value', (value) => value.toFixed(2)),
  normalStrength: control('normal-strength', 'normal-strength-value', (value) => value.toFixed(2))
}

let currentFabric: ProcessedFabric | null = null
let currentObjectUrl: string | null = null
let materialSettings: MaterialSettings = {
  repeat: [3, 3],
  rotation: 0,
  roughness: 0.85,
  normalStrength: 0.35
}

createIcons({ icons })
renderSamples()
bindEvents()
void loadFabric(sampleFabrics[0])

function bindEvents() {
  window.addEventListener('resize', () => scene.resize())
  resetCameraButton.addEventListener('click', () => scene.resetCamera())
  resetMaterialButton.addEventListener('click', () => {
    if (!currentFabric) return
    setMaterialSettings(currentFabric.suggestedSettings)
  })
  exportButton.addEventListener('click', () => {
    void exportCurrentPackage()
  })

  Object.values(controls).forEach(({ input }) => {
    input.addEventListener('input', () => {
      materialSettings = readMaterialSettings()
      syncControlOutputs()
      updateSceneMaterial()
    })
  })

  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files?.[0]
    if (!file) return

    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl)
    }

    currentObjectUrl = URL.createObjectURL(file)
    const id = safeId(file.name.replace(/\.[^.]+$/, '')) || 'uploaded-fabric'
    void loadFabric({
      id,
      name: file.name,
      seriesId: 'upload',
      seriesName: '本地上传',
      url: currentObjectUrl
    })
  })
}

function renderSamples() {
  const fragments = document.createDocumentFragment()

  sampleFabrics.forEach((sample) => {
    const button = document.createElement('button')
    button.className = 'sample-button'
    button.type = 'button'
    button.dataset.fabricId = sample.id
    button.title = sample.name
    button.innerHTML = `
      <img src="${sample.url}" alt="${sample.name}" loading="lazy" />
      <span>${sample.id}</span>
    `
    button.addEventListener('click', () => void loadFabric(sample))
    fragments.appendChild(button)
  })

  sampleGrid.appendChild(fragments)
}

async function loadFabric(sample: SampleFabric) {
  setStatus(`正在分析 ${sample.name}`)
  exportButton.disabled = true
  markActiveSample(sample.id)

  try {
    currentFabric = await processFabricImage({
      id: sample.id,
      name: sample.name,
      url: sample.url
    })
    setMaterialSettings(currentFabric.suggestedSettings)
    updateFabricSummary()
    updateSceneMaterial()
    setStatus(`${sample.name} 已就绪`)
  } catch (error) {
    console.error(error)
    setStatus(error instanceof Error ? error.message : '面料分析失败')
  } finally {
    exportButton.disabled = currentFabric === null
  }
}

function setMaterialSettings(settings: MaterialSettings) {
  materialSettings = {
    repeat: [...settings.repeat],
    rotation: settings.rotation,
    roughness: settings.roughness,
    normalStrength: settings.normalStrength
  }

  controls.repeatX.input.value = String(materialSettings.repeat[0])
  controls.repeatY.input.value = String(materialSettings.repeat[1])
  controls.rotation.input.value = String(materialSettings.rotation)
  controls.roughness.input.value = String(materialSettings.roughness)
  controls.normalStrength.input.value = String(materialSettings.normalStrength)
  syncControlOutputs()
  updateSceneMaterial()
}

function readMaterialSettings(): MaterialSettings {
  return {
    repeat: [Number(controls.repeatX.input.value), Number(controls.repeatY.input.value)],
    rotation: Number(controls.rotation.input.value),
    roughness: Number(controls.roughness.input.value),
    normalStrength: Number(controls.normalStrength.input.value)
  }
}

function updateSceneMaterial() {
  if (!currentFabric) return
  scene.applyFabric(currentFabric, materialSettings)
}

function updateFabricSummary() {
  if (!currentFabric) return

  fabricName.textContent = currentFabric.name
  fabricMeta.textContent = `ID ${currentFabric.id}`
  textureChip.style.backgroundImage = `url(${currentFabric.tileCanvas.toDataURL('image/png')})`
  textureChip.style.backgroundColor = currentFabric.analysis.baseColor
  baseColorValue.textContent = currentFabric.analysis.baseColor
  contrastValue.textContent = currentFabric.analysis.contrast.toFixed(3)
}

function syncControlOutputs() {
  controls.repeatX.output.value = controls.repeatX.formatter(Number(controls.repeatX.input.value))
  controls.repeatY.output.value = controls.repeatY.formatter(Number(controls.repeatY.input.value))
  controls.rotation.output.value = controls.rotation.formatter(Number(controls.rotation.input.value))
  controls.roughness.output.value = controls.roughness.formatter(Number(controls.roughness.input.value))
  controls.normalStrength.output.value = controls.normalStrength.formatter(Number(controls.normalStrength.input.value))
}

async function exportCurrentPackage() {
  if (!currentFabric) return

  setStatus('正在生成 GLB 和预览图')
  exportButton.disabled = true

  try {
    updateSceneMaterial()
    const glb = await scene.exportGlb()
    const previewFront = await scene.capturePreview('front')
    const previewThreeQuarter = await scene.capturePreview('threeq')
    const texture = await canvasToBlob(currentFabric.tileCanvas)
    const manifest = createManifest(currentFabric, materialSettings)

    setStatus('正在打包 ZIP')
    const zip = await createExportZip({
      glb,
      previewFront,
      previewThreeQuarter,
      texture,
      manifest
    })

    downloadBlob(zip, `${currentFabric.id}-homewear-long-set.zip`)
    setStatus(`${currentFabric.name} 导出完成`)
  } catch (error) {
    console.error(error)
    setStatus(error instanceof Error ? error.message : '导出失败')
  } finally {
    exportButton.disabled = false
  }
}

function createManifest(fabric: ProcessedFabric, settings: MaterialSettings): ExportManifest {
  return {
    fabricId: fabric.id,
    fabricName: fabric.name,
    garmentPreset: 'homewear-long-set',
    files: {
      glb: 'model.glb',
      poster: 'preview-front.png',
      texture: 'texture.png'
    },
    material: {
      baseColor: fabric.analysis.baseColor,
      roughness: Number(settings.roughness.toFixed(2)),
      repeat: [Number(settings.repeat[0].toFixed(2)), Number(settings.repeat[1].toFixed(2))],
      rotation: Number(settings.rotation.toFixed(1)),
      normalStrength: Number(settings.normalStrength.toFixed(2))
    }
  }
}

function markActiveSample(id: string) {
  document.querySelectorAll('.sample-button').forEach((button) => {
    button.classList.toggle('active', button instanceof HTMLElement && button.dataset.fabricId === id)
  })
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 2000)
}

function setStatus(message: string) {
  statusText.textContent = message
}

function safeId(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5_-]+/gi, '-')
    .replace(/^-+|-+$/g, '')
}

function control(id: string, outputId: string, formatter: (value: number) => string) {
  const input = element<HTMLInputElement>(`#${id}`)
  const output = element<HTMLOutputElement>(`#${outputId}`)
  return { input, output, formatter }
}

function element<T extends Element = HTMLElement>(selector: string): T {
  const target = document.querySelector<T>(selector)
  if (!target) {
    throw new Error(`Missing element: ${selector}`)
  }
  return target
}
