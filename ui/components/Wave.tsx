import { Plane, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";

import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";
import { useRef } from "react";
import { useControls, folder } from "leva";

export default function Wave() {
  const {
    animate,
    bigWavesElevation,
    bigWavesFrequency,
    bigWavesSpeed,
    smallWavesElevation,
    smallWavesFrequency,
    smallWavesSpeed,
    smallWavesIteration,
    surfaceColor,
    depthColor,
    colorOffset,
    colorMultiplier,
  } = useControls({
    animate: true,
    bigWaves: folder({
      bigWavesElevation: 0.028,
      bigWavesFrequency: [4, 1.5],
      bigWavesSpeed: 0.75,
    }),
    smallWaves: folder({
      smallWavesElevation: 0.15,
      smallWavesFrequency: 3,
      smallWavesSpeed: 0.2,
      smallWavesIteration: 3,
    }),
    colors: folder({
      surfaceColor: "#9bd8ff",
      depthColor: "#186691",
      colorOffset: 0.25,
      colorMultiplier: 2,
    }),
  });
  const shaderRef = useRef(null);
  useFrame((_, delta) => animate && (shaderRef.current.uTime += delta));
  return (
    <Plane args={[2, 2, 1024, 1024]} receiveShadow rotation-x={-Math.PI / 2}>
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
        uSurfaceColor={surfaceColor}
        uDepthColor={depthColor}
        uColorOffset={colorOffset}
        uColorMultiplier={colorMultiplier}
      />
    </Plane>
  );
}

const WaveMaterial = new shaderMaterial(
  {
    uTime: 0,

    uBigWavesElevation: 0.028,
    uBigWavesFrequency: [4, 1.5],
    uBigWavesSpeed: 0.75,

    uSmallWavesElevation: 0.15,
    uSmallWavesFrequency: 3,
    uSmallWavesSpeed: 0.2,
    uSmallWavesIteration: 3,

    uSurfaceColor: new THREE.Color("#9bd8ff"),
    uDepthColor: new THREE.Color("#186691"),
    uColorOffset: 0.25,
    uColorMultiplier: 2,
  },
  vertex,
  fragment,
);
WaveMaterial.key = THREE.MathUtils.generateUUID();
extend({ WaveMaterial });
