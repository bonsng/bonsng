import { Plane, shaderMaterial } from "@react-three/drei";
import { useRef } from "react";
import vertexShader from "@/ui/shaders/vertex.glsl";
import fragmentShader from "@/ui/shaders/fragment.glsl";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useColorsState } from "@/ui/context/colors.provider";
import { depthColors } from "@/lib/data/colors";
import { folder, useControls } from "leva";

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
  vertexShader,
  fragmentShader,
);
WaveMaterial.key = THREE.MathUtils.generateUUID();
extend({ WaveMaterial });

export default function Wave() {
  const { state } = useColorsState();
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const planeRef = useRef(null);

  useFrame((_, delta) => {
    if (animate && shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta;
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
      depthColor: `${depthColors[state.currentColor]}`,
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
        uDepthColor={depthColors[state.currentColor]}
        uColorOffset={colorOffset}
        uColorMultiplier={colorMultiplier}
      />
    </Plane>
  );
}
