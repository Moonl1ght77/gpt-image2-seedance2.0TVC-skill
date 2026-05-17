import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'
import { applyTextureSettings } from './fabricProcessing'
import type { MaterialSettings, ProcessedFabric } from './types'

const CAMERA_FRONT = new THREE.Vector3(0, 0.55, 5.2)
const CAMERA_THREE_QUARTER = new THREE.Vector3(3.3, 0.65, 4.4)
const CAMERA_TARGET = new THREE.Vector3(0, 0.05, 0)

export class GarmentScene {
  private readonly scene = new THREE.Scene()
  private readonly camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
  private readonly renderer: THREE.WebGLRenderer
  private readonly controls: OrbitControls
  private readonly garmentGroup = new THREE.Group()
  private readonly fabricMaterial = new THREE.MeshPhysicalMaterial({
    color: '#f2eee8',
    roughness: 0.88,
    metalness: 0,
    clearcoat: 0.05,
    clearcoatRoughness: 0.75
  })
  private readonly trimMaterial = new THREE.MeshPhysicalMaterial({
    color: '#9a9184',
    roughness: 0.9,
    metalness: 0,
    clearcoat: 0.03,
    clearcoatRoughness: 0.82
  })
  private animationFrame = 0

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

    this.controls = new OrbitControls(this.camera, canvas)
    this.controls.enableDamping = true
    this.controls.minDistance = 3.3
    this.controls.maxDistance = 8
    this.controls.maxPolarAngle = Math.PI * 0.75
    this.controls.target.copy(CAMERA_TARGET)

    this.setupScene()
    this.createGarment()
    this.resetCamera()
    this.resize()
    this.animate()
  }

  applyFabric(fabric: ProcessedFabric, settings: MaterialSettings) {
    applyTextureSettings(fabric.texture, settings)
    applyTextureSettings(fabric.normalTexture, settings)

    this.fabricMaterial.map = fabric.texture
    this.fabricMaterial.normalMap = fabric.normalTexture
    this.fabricMaterial.normalScale.set(settings.normalStrength, settings.normalStrength)
    this.fabricMaterial.roughness = settings.roughness
    this.fabricMaterial.needsUpdate = true

    this.trimMaterial.color.set(fabric.analysis.baseColor).multiplyScalar(0.72)
    this.trimMaterial.roughness = Math.min(settings.roughness + 0.04, 1)
    this.trimMaterial.needsUpdate = true
  }

  resetCamera() {
    this.camera.position.copy(CAMERA_THREE_QUARTER)
    this.controls.target.copy(CAMERA_TARGET)
    this.controls.update()
  }

  resize() {
    const parent = this.canvas.parentElement
    const width = Math.max(parent?.clientWidth ?? this.canvas.clientWidth, 320)
    const height = Math.max(parent?.clientHeight ?? this.canvas.clientHeight, 360)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height, false)
  }

  async capturePreview(view: 'front' | 'threeq'): Promise<Blob> {
    const previousPosition = this.camera.position.clone()
    const previousTarget = this.controls.target.clone()

    this.camera.position.copy(view === 'front' ? CAMERA_FRONT : CAMERA_THREE_QUARTER)
    this.controls.target.copy(CAMERA_TARGET)
    this.controls.update()
    this.renderer.render(this.scene, this.camera)

    const blob = await new Promise<Blob>((resolve, reject) => {
      this.canvas.toBlob((result) => {
        if (result) {
          resolve(result)
        } else {
          reject(new Error('Preview capture failed.'))
        }
      }, 'image/png')
    })

    this.camera.position.copy(previousPosition)
    this.controls.target.copy(previousTarget)
    this.controls.update()
    return blob
  }

  exportGlb(): Promise<ArrayBuffer> {
    const exporter = new GLTFExporter()

    return new Promise((resolve, reject) => {
      exporter.parse(
        this.garmentGroup,
        (result) => {
          if (result instanceof ArrayBuffer) {
            resolve(result)
          } else {
            reject(new Error('GLB export returned JSON instead of binary data.'))
          }
        },
        (error) => reject(error),
        { binary: true, onlyVisible: true }
      )
    })
  }

  private setupScene() {
    this.scene.background = new THREE.Color('#eef2ee')
    this.scene.add(new THREE.HemisphereLight('#ffffff', '#84918b', 1.8))

    const keyLight = new THREE.DirectionalLight('#fff6e8', 2.4)
    keyLight.position.set(3, 4.8, 4)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(1024, 1024)
    this.scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight('#b8d8ff', 1.3)
    rimLight.position.set(-4, 2.6, -3)
    this.scene.add(rimLight)

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(2.8, 96),
      new THREE.ShadowMaterial({ color: '#203028', opacity: 0.16 })
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -1.98
    floor.receiveShadow = true
    this.scene.add(floor)
  }

  private createGarment() {
    this.garmentGroup.name = 'homewear-long-set'
    this.scene.add(this.garmentGroup)

    const torso = this.softCylinder('long-sleeve-shirt-body', 0.58, 0.76, 1.34, 0.42, 0.8)
    torso.position.y = 0.82
    this.garmentGroup.add(torso)

    this.garmentGroup.add(this.ring('shirt-collar', 0.24, 0.034, 1.52, 0.58))
    this.garmentGroup.add(this.ring('shirt-hem', 0.73, 0.024, 0.15, 0.42))

    this.garmentGroup.add(
      this.limb('left-sleeve', new THREE.Vector3(-0.58, 1.25, 0), new THREE.Vector3(-1.0, 0.48, 0.05), 0.22, 0.15, 0.72)
    )
    this.garmentGroup.add(
      this.limb('right-sleeve', new THREE.Vector3(0.58, 1.25, 0), new THREE.Vector3(1.0, 0.48, 0.05), 0.22, 0.15, 0.72)
    )
    this.garmentGroup.add(this.cuff('left-sleeve-cuff', new THREE.Vector3(-1.0, 0.48, 0.05), -0.5))
    this.garmentGroup.add(this.cuff('right-sleeve-cuff', new THREE.Vector3(1.0, 0.48, 0.05), 0.5))

    const waistband = this.softCylinder('pants-waistband', 0.58, 0.68, 0.22, 0.35, 0.85)
    waistband.position.y = -0.14
    this.garmentGroup.add(waistband)

    this.garmentGroup.add(
      this.limb('left-pant-leg', new THREE.Vector3(-0.27, -0.24, 0), new THREE.Vector3(-0.36, -1.74, 0.03), 0.28, 0.18, 0.68)
    )
    this.garmentGroup.add(
      this.limb('right-pant-leg', new THREE.Vector3(0.27, -0.24, 0), new THREE.Vector3(0.36, -1.74, 0.03), 0.28, 0.18, 0.68)
    )
    this.garmentGroup.add(this.pantCuff('left-pant-cuff', new THREE.Vector3(-0.36, -1.74, 0.03)))
    this.garmentGroup.add(this.pantCuff('right-pant-cuff', new THREE.Vector3(0.36, -1.74, 0.03)))

    this.garmentGroup.add(this.seam('shirt-center-seam', new THREE.Vector3(0, 1.42, 0.255), new THREE.Vector3(0, 0.2, 0.315), 0.006))
    this.garmentGroup.add(this.seam('left-pant-side-seam', new THREE.Vector3(-0.52, -0.28, 0.05), new THREE.Vector3(-0.55, -1.66, 0.08), 0.007))
    this.garmentGroup.add(this.seam('right-pant-side-seam', new THREE.Vector3(0.52, -0.28, 0.05), new THREE.Vector3(0.55, -1.66, 0.08), 0.007))

    this.garmentGroup.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }

  private softCylinder(name: string, radiusTop: number, radiusBottom: number, height: number, zScale: number, wrinkle = 1) {
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 96, 18, false)
    const position = geometry.attributes.position

    for (let index = 0; index < position.count; index += 1) {
      const x = position.getX(index)
      const y = position.getY(index)
      const z = position.getZ(index)
      const angle = Math.atan2(z, x)
      const ripple = 1 + Math.sin(angle * 6 + y * 7) * 0.012 * wrinkle
      position.setXYZ(index, x * ripple, y, z * zScale * ripple)
    }

    geometry.computeVertexNormals()
    const mesh = new THREE.Mesh(geometry, this.fabricMaterial)
    mesh.name = name
    return mesh
  }

  private limb(
    name: string,
    start: THREE.Vector3,
    end: THREE.Vector3,
    radiusTop: number,
    radiusBottom: number,
    zScale: number
  ) {
    const direction = new THREE.Vector3().subVectors(end, start)
    const length = direction.length()
    const mesh = this.softCylinder(name, radiusTop, radiusBottom, length, zScale, 0.9)
    mesh.position.copy(start).add(end).multiplyScalar(0.5)
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())
    return mesh
  }

  private ring(name: string, radius: number, tube: number, y: number, zScale: number) {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 18, 96), this.trimMaterial)
    mesh.name = name
    mesh.rotation.x = Math.PI / 2
    mesh.scale.z = zScale
    mesh.position.y = y
    return mesh
  }

  private cuff(name: string, position: THREE.Vector3, side: number) {
    const mesh = this.softCylinder(name, 0.15, 0.16, 0.11, 0.7, 0.3)
    mesh.position.copy(position)
    mesh.rotation.z = side
    mesh.material = this.trimMaterial
    return mesh
  }

  private pantCuff(name: string, position: THREE.Vector3) {
    const mesh = this.softCylinder(name, 0.19, 0.2, 0.12, 0.62, 0.3)
    mesh.position.copy(position)
    mesh.material = this.trimMaterial
    return mesh
  }

  private seam(name: string, start: THREE.Vector3, end: THREE.Vector3, radius: number) {
    const direction = new THREE.Vector3().subVectors(end, start)
    const geometry = new THREE.CylinderGeometry(radius, radius, direction.length(), 12, 1)
    const mesh = new THREE.Mesh(geometry, this.trimMaterial)
    mesh.name = name
    mesh.position.copy(start).add(end).multiplyScalar(0.5)
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())
    return mesh
  }

  private animate = () => {
    this.animationFrame = window.requestAnimationFrame(this.animate)
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    window.cancelAnimationFrame(this.animationFrame)
    this.renderer.dispose()
    this.controls.dispose()
  }
}
