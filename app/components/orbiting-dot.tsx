"use client";

export default function OrbitingDot({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position}>
      <icosahedronGeometry args={[0.16, 1]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.6} />
    </mesh>
  );
}
