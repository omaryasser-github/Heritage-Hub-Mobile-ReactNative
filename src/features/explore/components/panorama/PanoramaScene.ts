import { Renderer, loadAsync, THREE } from 'expo-three';
import { ImageSourcePropType } from 'react-native';
import { ExpoWebGLRenderingContext } from 'expo-gl';
import { LocalizedPanoramaHotspot, PanoramaViewConfig } from '../../../../core/data/types';
import {
  applyCameraRotation,
  pitchYawToPosition,
  SPHERE_SURFACE_RADIUS,
  SphericalAngles,
} from './panoramaMath';

const SPHERE_RADIUS = 50;
const HOTSPOT_COLLIDER_RADIUS = 3;
const HOTSPOT_MARKER_RADIUS = 1.1;
const HOTSPOT_RING_RADIUS = 1.6;
const MARKER_COLOR = 0xd9a941;
const MARKER_FOCUS_COLOR = 0xffffff;
const CAMERA_FOV = 75;

export interface PanoramaSceneBundle {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  raycaster: THREE.Raycaster;
  hotspotMeshes: THREE.Mesh[];
  markerMeshes: THREE.Mesh[];
  angles: SphericalAngles;
  focusedHotspotId: string | null;
  dispose: () => void;
}

function patchGlContext(gl: ExpoWebGLRenderingContext): void {
  const pixelStorei = gl.pixelStorei.bind(gl);
  gl.pixelStorei = (...args: Parameters<typeof gl.pixelStorei>) => {
    const [parameter] = args;
    if (parameter === gl.UNPACK_FLIP_Y_WEBGL) {
      return pixelStorei(...args);
    }
  };
}

function enhanceTexture(texture: THREE.Texture, renderer: THREE.WebGLRenderer): void {
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy?.() ?? 1;
  if (maxAnisotropy > 1) {
    texture.anisotropy = Math.min(8, maxAnisotropy);
  }
}

function createSphereEnvironment(
  texture: THREE.Texture,
  segments: number
): { mesh: THREE.Mesh; geometry: THREE.BufferGeometry } {
  const geometry = new THREE.SphereGeometry(SPHERE_RADIUS, segments, segments);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
  });
  return { mesh: new THREE.Mesh(geometry, material), geometry };
}

function createHotspotMeshes(hotspots: LocalizedPanoramaHotspot[]): {
  allMeshes: THREE.Mesh[];
  colliders: THREE.Mesh[];
  markers: THREE.Mesh[];
} {
  const allMeshes: THREE.Mesh[] = [];
  const colliders: THREE.Mesh[] = [];
  const markers: THREE.Mesh[] = [];

  hotspots.forEach((hotspot) => {
    const position = pitchYawToPosition(hotspot.pitch, hotspot.yaw, SPHERE_SURFACE_RADIUS);

    const collider = new THREE.Mesh(
      new THREE.SphereGeometry(HOTSPOT_COLLIDER_RADIUS, 10, 10),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    collider.position.set(position.x, position.y, position.z);
    collider.userData = { hotspotId: hotspot.id, isCollider: true };

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(HOTSPOT_MARKER_RADIUS * 0.85, HOTSPOT_RING_RADIUS, 24),
      new THREE.MeshBasicMaterial({
        color: MARKER_COLOR,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
      })
    );
    ring.position.copy(collider.position);
    ring.userData = { hotspotId: hotspot.id, isRing: true };

    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(HOTSPOT_MARKER_RADIUS, 12, 12),
      new THREE.MeshBasicMaterial({
        color: MARKER_COLOR,
        transparent: true,
        opacity: 0.95,
      })
    );
    marker.position.copy(collider.position);
    marker.userData = { hotspotId: hotspot.id, isMarker: true };

    colliders.push(collider);
    markers.push(marker);
    allMeshes.push(collider, ring, marker);
  });

  return { allMeshes, colliders, markers };
}

function updateMarkerVisuals(bundle: PanoramaSceneBundle, timeSeconds: number): void {
  bundle.markerMeshes.forEach((marker, index) => {
    const pulse = 1 + 0.12 * Math.sin(timeSeconds * 2.8 + index);
    marker.scale.setScalar(pulse);
    marker.lookAt(bundle.camera.position);

    const material = marker.material as THREE.MeshBasicMaterial;
    const isFocused = marker.userData.hotspotId === bundle.focusedHotspotId;
    material.color.setHex(isFocused ? MARKER_FOCUS_COLOR : MARKER_COLOR);
    material.opacity = isFocused ? 1 : 0.95;
  });

  bundle.scene.children.forEach((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh && child.userData.isRing) {
      child.lookAt(bundle.camera.position);
      const ringPulse = 1 + 0.18 * Math.sin(timeSeconds * 2.8 + 0.5);
      child.scale.setScalar(ringPulse);
    }
  });
}

export async function createPanoramaScene(
  gl: ExpoWebGLRenderingContext,
  textureSource: ImageSourcePropType,
  hotspots: LocalizedPanoramaHotspot[],
  segments: number,
  layoutWidth: number,
  layoutHeight: number,
  viewConfig?: PanoramaViewConfig
): Promise<PanoramaSceneBundle> {
  patchGlContext(gl);

  const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
  const renderer = new Renderer({ gl }) as unknown as THREE.WebGLRenderer;
  renderer.setSize(width, height);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    viewConfig?.cameraFov ?? CAMERA_FOV,
    layoutWidth / layoutHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 0);

  const texture = (await loadAsync(textureSource)) as THREE.Texture;
  enhanceTexture(texture, renderer);

  const { mesh: environmentMesh, geometry: environmentGeometry } = createSphereEnvironment(
    texture,
    segments
  );
  scene.add(environmentMesh);

  const { allMeshes, colliders, markers } = createHotspotMeshes(hotspots);
  allMeshes.forEach((mesh) => scene.add(mesh));

  const angles: SphericalAngles = {
    yaw: viewConfig?.defaultYaw ?? 0,
    pitch: viewConfig?.defaultPitch ?? 0,
  };
  applyCameraRotation(camera, angles);

  const dispose = () => {
    environmentGeometry.dispose();
    (environmentMesh.material as THREE.MeshBasicMaterial).dispose();
    texture.dispose();
    allMeshes.forEach((mesh) => {
      mesh.geometry.dispose();
      (mesh.material as THREE.MeshBasicMaterial).dispose();
    });
    renderer.dispose();
  };

  return {
    scene,
    camera,
    renderer,
    raycaster: new THREE.Raycaster(),
    hotspotMeshes: colliders,
    markerMeshes: markers,
    angles,
    focusedHotspotId: null,
    dispose,
  };
}

export function renderPanoramaFrame(bundle: PanoramaSceneBundle, gl: ExpoWebGLRenderingContext): void {
  applyCameraRotation(bundle.camera, bundle.angles);
  updateMarkerVisuals(bundle, Date.now() / 1000);
  bundle.renderer.render(bundle.scene, bundle.camera);
  gl.endFrameEXP();
}

export function raycastHotspot(
  bundle: PanoramaSceneBundle,
  ndc: THREE.Vector2,
  hotspots: LocalizedPanoramaHotspot[]
): LocalizedPanoramaHotspot | null {
  bundle.raycaster.setFromCamera(ndc, bundle.camera);
  const hits = bundle.raycaster.intersectObjects(bundle.hotspotMeshes, false);
  if (hits.length === 0) return null;

  const hotspotId = hits[0].object.userData.hotspotId as string;
  return hotspots.find((item) => item.id === hotspotId) ?? null;
}

export function focusCameraOnHotspot(
  bundle: PanoramaSceneBundle,
  hotspot: LocalizedPanoramaHotspot
): void {
  bundle.angles.yaw = hotspot.yaw;
  bundle.angles.pitch = hotspot.pitch;
  bundle.focusedHotspotId = hotspot.id;
}
