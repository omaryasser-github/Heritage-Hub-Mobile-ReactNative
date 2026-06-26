import { THREE } from 'expo-three';
import { LocalizedPanoramaHotspot } from '../../../../core/data/types';

const DEG2RAD = Math.PI / 180;
const PITCH_LIMIT = 85;
const SPHERE_SURFACE_RADIUS = 49;

export interface SphericalAngles {
  yaw: number;
  pitch: number;
}

export interface ProjectedHotspotPin {
  id: string;
  title: string;
  x: number;
  y: number;
  visible: boolean;
}

export function clampPitch(pitch: number): number {
  return Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, pitch));
}

/** Convert authored pitch/yaw (degrees) to a point on the panorama sphere. */
export function pitchYawToPosition(pitch: number, yaw: number, radius: number) {
  const pitchRad = pitch * DEG2RAD;
  const yawRad = yaw * DEG2RAD;
  const cosPitch = Math.cos(pitchRad);

  return {
    x: radius * cosPitch * Math.sin(yawRad),
    y: radius * Math.sin(pitchRad),
    z: -radius * cosPitch * Math.cos(yawRad),
  };
}

export function normalizeTouchToNdc(
  locationX: number,
  locationY: number,
  layoutWidth: number,
  layoutHeight: number
): THREE.Vector2 {
  return new THREE.Vector2(
    (locationX / layoutWidth) * 2 - 1,
    -(locationY / layoutHeight) * 2 + 1
  );
}

export function applyCameraRotation(
  camera: THREE.PerspectiveCamera,
  angles: SphericalAngles
): void {
  camera.rotation.order = 'YXZ';
  camera.rotation.y = angles.yaw * DEG2RAD;
  camera.rotation.x = angles.pitch * DEG2RAD;
}

export function sphereSegmentsForDevice(isSmallDevice: boolean): number {
  return isSmallDevice ? 24 : 32;
}

const projectionVector = new THREE.Vector3();

export function projectHotspotsToScreen(
  camera: THREE.PerspectiveCamera,
  hotspots: LocalizedPanoramaHotspot[],
  layoutWidth: number,
  layoutHeight: number
): ProjectedHotspotPin[] {
  return hotspots.map((hotspot) => {
    const position = pitchYawToPosition(hotspot.pitch, hotspot.yaw, SPHERE_SURFACE_RADIUS);
    projectionVector.set(position.x, position.y, position.z);
    projectionVector.project(camera);

    const inFront = projectionVector.z < 1;
    const x = (projectionVector.x * 0.5 + 0.5) * layoutWidth;
    const y = (-projectionVector.y * 0.5 + 0.5) * layoutHeight;
    const onScreen =
      x >= -40 &&
      x <= layoutWidth + 40 &&
      y >= -40 &&
      y <= layoutHeight + 40;

    return {
      id: hotspot.id,
      title: hotspot.title,
      x,
      y,
      visible: inFront && onScreen,
    };
  });
}

export { SPHERE_SURFACE_RADIUS };
