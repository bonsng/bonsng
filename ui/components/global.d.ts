import { WaveMaterial } from "./Wave";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waveMaterial: ReactThreeFiber.Node<
        typeof WaveMaterial & JSX.IntrinsicElements["waveMaterial"],
        typeof WaveMaterial
      >;
    }
  }
}
