import { WaveMaterial } from "@/ui/main-page/wave";
import { extend, MaterialNode } from "@react-three/fiber";

declare module "@react-three/fiber" {
  interface ThreeElements {
    waveMaterial: MaterialNode<WaveMaterial, typeof WaveMaterial>;
  }
}

extend({ WaveMaterial });
