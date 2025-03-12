import { Plane, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";

import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";
import { useRef } from "react";
import { useControls, folder } from "leva";
import { useColorsState } from "@/ui/components/color-picker/colors.provider";

export const WaveMaterial = shaderMaterial(
  {
    uTime: 0,

    uBigWavesElevation: 0.028,
    uBigWavesFrequency: [4, 1.5],
    uBigWavesSpeed: 0.75,

    uSmallWavesElevation: 0.15,
    uSmallWavesFrequency: 3,
    uSmallWavesSpeed: 0.2,
    uSmallWavesIteration: 3,

    uSurfaceColor: new THREE.Color("#0e4367"),
    uDepthColor: new THREE.Color("#000000"),
    uColorOffset: 0.25,
    uColorMultiplier: 2,
  },
  vertex,
  fragment,
);
WaveMaterial.key = THREE.MathUtils.generateUUID();
extend({ WaveMaterial });

export default function Wave() {
  const { state } = useColorsState();
  console.log(state);
  const shaderRef = useRef<any>(null);
  const planeRef = useRef(null);

  useFrame((_, delta) => {
    if (animate && shaderRef.current) {
      shaderRef.current.uTime += delta;
    }
  });

  const {
    animate,
    bigWavesElevation,
    bigWavesFrequency,
    bigWavesSpeed,
    smallWavesElevation,
    smallWavesFrequency,
    smallWavesSpeed,
    smallWavesIteration,
    depthColor,
    colorOffset,
    colorMultiplier,
  } = useControls({
    animate: true,
    bigWaves: folder({
      bigWavesElevation: { value: 0.028, step: 0.001 },
      bigWavesFrequency: { value: { x: 4.0, y: 1.5 }, joystick: false },
      bigWavesSpeed: 0.75,
    }),
    smallWaves: folder({
      smallWavesElevation: 0.15,
      smallWavesFrequency: 3,
      smallWavesSpeed: 0.2,
      smallWavesIteration: 3,
    }),
    colors: folder({
      surfaceColor: `${state.currentColor}`,
      depthColor: "#0f425e",
      colorOffset: 0.25,
      colorMultiplier: 2,
    }),
  });

  return (
    <Plane
      args={[2, 2, 1024, 1024]}
      receiveShadow
      rotation-x={-Math.PI / 2}
      ref={planeRef}
    >
      <waveMaterial
        key={WaveMaterial.key}
        ref={shaderRef}
        uBigWavesElevation={bigWavesElevation}
        uBigWavesFrequency={bigWavesFrequency}
        uBigWavesSpeed={bigWavesSpeed}
        uSmallWavesElevation={smallWavesElevation}
        uSmallWavesFrequency={smallWavesFrequency}
        uSmallWavesSpeed={smallWavesSpeed}
        uSmallWavesIteration={smallWavesIteration}
        uSurfaceColor={state.currentColor}
        uDepthColor={depthColor}
        uColorOffset={colorOffset}
        uColorMultiplier={colorMultiplier}
      />
    </Plane>
  );
}
