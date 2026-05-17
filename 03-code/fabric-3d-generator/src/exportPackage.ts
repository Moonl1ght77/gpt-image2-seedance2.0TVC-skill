import JSZip from 'jszip'
import modelViewerUrl from '../node_modules/@google/model-viewer/dist/model-viewer.min.js?url'
import type { ExportManifest } from './types'

interface PackageInput {
  glb: ArrayBuffer
  previewFront: Blob
  previewThreeQuarter: Blob
  texture: Blob
  manifest: ExportManifest
}

export async function createExportZip(input: PackageInput): Promise<Blob> {
  const zip = new JSZip()
  zip.file('model.glb', input.glb)
  zip.file('preview-front.png', input.previewFront)
  zip.file('preview-3q.png', input.previewThreeQuarter)
  zip.file('texture.png', input.texture)
  zip.file('material.json', JSON.stringify(input.manifest, null, 2))
  zip.file('embed.html', createEmbedHtml(input.manifest))
  zip.file('model-viewer.min.js', await fetchModelViewerScript())

  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } })
}

function createEmbedHtml(manifest: ExportManifest) {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(manifest.fabricName)} - 3D 展示</title>
    <script type="module" src="./model-viewer.min.js"></script>
    <style>
      html, body {
        margin: 0;
        width: 100%;
        height: 100%;
        background: #f4f6f3;
        font-family: Arial, "Microsoft YaHei", sans-serif;
      }
      model-viewer {
        width: 100%;
        height: 100vh;
        background: #eef2ee;
      }
    </style>
  </head>
  <body>
    <model-viewer
      src="./model.glb"
      poster="./preview-front.png"
      camera-controls
      auto-rotate
      shadow-intensity="0.8"
      exposure="1"
      ar>
    </model-viewer>
  </body>
</html>`
}

async function fetchModelViewerScript() {
  const response = await fetch(modelViewerUrl)
  if (!response.ok) {
    throw new Error('Unable to package model-viewer runtime.')
  }
  return response.blob()
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }
    return entities[char]
  })
}
