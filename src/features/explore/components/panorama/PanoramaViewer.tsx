import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import { ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LocalizedPanoramaHotspot, PanoramaViewConfig } from '../../../../core/data/types';
import { Colors } from '../../../../shared/constants/colors';
import { Typography } from '../../../../shared/components/Typography';
import { useResponsive } from '../../../../shared/utils/responsive';
import { useTranslation } from 'react-i18next';
import {
  clampPitch,
  normalizeTouchToNdc,
  projectHotspotsToScreen,
  ProjectedHotspotPin,
  sphereSegmentsForDevice,
} from './panoramaMath';
import {
  createPanoramaScene,
  focusCameraOnHotspot,
  PanoramaSceneBundle,
  raycastHotspot,
  renderPanoramaFrame,
} from './PanoramaScene';

const PAN_SENSITIVITY = 0.18;
const TAP_MOVE_THRESHOLD = 12;
const PIN_PROJECTION_INTERVAL = 2;

export interface PanoramaViewerHandle {
  focusHotspot: (hotspot: LocalizedPanoramaHotspot) => void;
}

interface PanoramaViewerProps {
  texture: ImageSourcePropType;
  viewConfig?: PanoramaViewConfig;
  hotspots: LocalizedPanoramaHotspot[];
  focusedHotspotId?: string | null;
  onHotspotSelect: (hotspot: LocalizedPanoramaHotspot) => void;
}

export const PanoramaViewer = forwardRef<PanoramaViewerHandle, PanoramaViewerProps>(
  ({ texture, viewConfig, hotspots, focusedHotspotId, onHotspotSelect }, ref) => {
    const { t } = useTranslation();
    const { isSmallDevice, sWidth, sFont } = useResponsive();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [projectedPins, setProjectedPins] = useState<ProjectedHotspotPin[]>([]);

    const bundleRef = useRef<PanoramaSceneBundle | null>(null);
    const glRef = useRef<ExpoWebGLRenderingContext | null>(null);
    const frameRef = useRef<number | null>(null);
    const frameCountRef = useRef(0);
    const layoutRef = useRef({ width: 1, height: 1 });
    const dragStartRef = useRef({ moved: false });
    const hotspotsRef = useRef(hotspots);
    const onHotspotSelectRef = useRef(onHotspotSelect);
    const focusedHotspotIdRef = useRef(focusedHotspotId);

    hotspotsRef.current = hotspots;
    onHotspotSelectRef.current = onHotspotSelect;
    focusedHotspotIdRef.current = focusedHotspotId;

    useEffect(() => {
      const bundle = bundleRef.current;
      if (bundle) {
        bundle.focusedHotspotId = focusedHotspotId ?? null;
      }
    }, [focusedHotspotId]);

    useImperativeHandle(ref, () => ({
      focusHotspot: (hotspot: LocalizedPanoramaHotspot) => {
        const bundle = bundleRef.current;
        if (!bundle) return;
        focusCameraOnHotspot(bundle, hotspot);
        setShowHint(false);
      },
    }));

    const updateProjectedPins = useCallback(() => {
      const bundle = bundleRef.current;
      const { width, height } = layoutRef.current;
      if (!bundle || width <= 0 || height <= 0) return;

      const pins = projectHotspotsToScreen(bundle.camera, hotspotsRef.current, width, height);
      setProjectedPins(pins);
    }, []);

    const stopLoop = useCallback(() => {
      if (frameRef.current != null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    }, []);

    const startLoop = useCallback(() => {
      const tick = () => {
        const bundle = bundleRef.current;
        const gl = glRef.current;
        if (bundle && gl) {
          renderPanoramaFrame(bundle, gl);
          frameCountRef.current += 1;
          if (frameCountRef.current % PIN_PROJECTION_INTERVAL === 0) {
            updateProjectedPins();
          }
        }
        frameRef.current = requestAnimationFrame(tick);
      };
      stopLoop();
      frameRef.current = requestAnimationFrame(tick);
    }, [stopLoop, updateProjectedPins]);

    useEffect(() => {
      return () => {
        stopLoop();
        bundleRef.current?.dispose();
        bundleRef.current = null;
        glRef.current = null;
      };
    }, [stopLoop]);

    const onContextCreate = useCallback(
      async (gl: ExpoWebGLRenderingContext) => {
        glRef.current = gl;
        setIsLoading(true);
        setHasError(false);

        try {
          bundleRef.current?.dispose();
        const bundle = await createPanoramaScene(
          gl,
          texture,
          hotspotsRef.current,
          sphereSegmentsForDevice(isSmallDevice),
          layoutRef.current.width,
          layoutRef.current.height,
          viewConfig
        );
          bundle.focusedHotspotId = focusedHotspotIdRef.current ?? null;
          bundleRef.current = bundle;
          startLoop();
          updateProjectedPins();
          setIsLoading(false);
        } catch {
          setHasError(true);
          setIsLoading(false);
        }
      },
      [isSmallDevice, startLoop, texture, updateProjectedPins, viewConfig]
    );

    const selectHotspot = useCallback((hotspot: LocalizedPanoramaHotspot) => {
      const bundle = bundleRef.current;
      if (bundle) {
        focusCameraOnHotspot(bundle, hotspot);
      }
      setShowHint(false);
      onHotspotSelectRef.current(hotspot);
    }, []);

    const handleTapRaycast = useCallback(
      (event: GestureResponderEvent) => {
        const bundle = bundleRef.current;
        if (!bundle) return;

        const { locationX, locationY } = event.nativeEvent;
        const { width, height } = layoutRef.current;
        if (width <= 0 || height <= 0) return;

        const ndc = normalizeTouchToNdc(locationX, locationY, width, height);
        const hit = raycastHotspot(bundle, ndc, hotspotsRef.current);
        if (hit) {
          selectHotspot(hit);
        }
      },
      [selectHotspot]
    );

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            dragStartRef.current.moved = false;
          },
          onPanResponderMove: (_, gestureState) => {
            const bundle = bundleRef.current;
            if (!bundle) return;

            if (
              Math.abs(gestureState.dx) > TAP_MOVE_THRESHOLD ||
              Math.abs(gestureState.dy) > TAP_MOVE_THRESHOLD
            ) {
              dragStartRef.current.moved = true;
              setShowHint(false);
            }

            bundle.angles.yaw -= gestureState.dx * PAN_SENSITIVITY;
            bundle.angles.pitch = clampPitch(
              bundle.angles.pitch + gestureState.dy * PAN_SENSITIVITY
            );
          },
          onPanResponderRelease: (event) => {
            if (!dragStartRef.current.moved) {
              handleTapRaycast(event);
            }
          },
        }),
      [handleTapRaycast]
    );

    const hotspotById = useMemo(
      () => new Map(hotspots.map((item) => [item.id, item])),
      [hotspots]
    );

    return (
      <View
        style={styles.container}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          layoutRef.current = { width, height };
          updateProjectedPins();
        }}
        {...panResponder.panHandlers}
      >
        <GLView style={styles.glView} onContextCreate={onContextCreate} />

        {!isLoading && !hasError
          ? projectedPins
              .filter((pin) => pin.visible)
              .map((pin) => {
                const hotspot = hotspotById.get(pin.id);
                if (!hotspot) return null;
                const isFocused = pin.id === focusedHotspotId;

                return (
                  <TouchableOpacity
                    key={pin.id}
                    style={[
                      styles.screenPin,
                      {
                        left: pin.x - sWidth(20),
                        top: pin.y - sWidth(20),
                      },
                    ]}
                    onPress={() => selectHotspot(hotspot)}
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    activeOpacity={0.9}
                  >
                    <View style={[styles.pinDot, isFocused && styles.pinDotFocused]}>
                      <Ionicons name="location" size={sWidth(16)} color={Colors.textPrimary} />
                    </View>
                    <Typography
                      variant="labelSm"
                      color={Colors.textOnDark}
                      numberOfLines={2}
                      style={[styles.pinLabel, { fontSize: sFont(11), maxWidth: sWidth(110) }]}
                    >
                      {pin.title}
                    </Typography>
                  </TouchableOpacity>
                );
              })
          : null}

        {showHint && !isLoading && !hasError ? (
          <View style={styles.hintBanner} pointerEvents="none">
            <Ionicons name="hand-left-outline" size={sWidth(18)} color={Colors.textOnDark} />
            <Typography variant="labelLg" color={Colors.textOnDark} style={{ fontSize: sFont(13) }}>
              {t('cardDetails.panoramaDragHint')}
            </Typography>
            <Typography variant="labelSm" color={Colors.textOnDarkMuted} style={{ fontSize: sFont(12) }}>
              {t('cardDetails.panoramaHotspotHint')}
            </Typography>
          </View>
        ) : null}

        {isLoading ? (
          <View style={styles.overlay} pointerEvents="none">
            <ActivityIndicator size="large" color={Colors.primary} />
            <Typography variant="bodyMd" color={Colors.textOnDark} style={styles.loadingText}>
              {t('cardDetails.panoramaLoading')}
            </Typography>
          </View>
        ) : null}

        {hasError ? (
          <View style={styles.overlay}>
            <Typography variant="bodyMd" color={Colors.textOnDark} align="center">
              {t('cardDetails.panoramaUnavailable')}
            </Typography>
          </View>
        ) : null}
      </View>
    );
  }
);

PanoramaViewer.displayName = 'PanoramaViewer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceDark,
  },
  glView: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.overlayAuth,
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 12,
  },
  hintBanner: {
    position: 'absolute',
    top: '38%',
    left: 24,
    right: 24,
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  screenPin: {
    position: 'absolute',
    alignItems: 'center',
    width: 120,
  },
  pinDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.textOnDark,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  pinDotFocused: {
    backgroundColor: Colors.tabActive,
    borderColor: Colors.primaryDeep,
    transform: [{ scale: 1.1 }],
  },
  pinLabel: {
    marginTop: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
