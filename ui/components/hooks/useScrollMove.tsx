import { useCallback, useEffect, useRef } from "react";

const thresholds: Array<number> = [];
for (let i = 0; i < 1.0; i += 0.01) {
  thresholds.push(i);
}

const useScrollMove = () => {
  const dom = useRef();

  const handleScroll = useCallback((entries) => {
    // const { current } = dom;
    entries.forEach((entry) => {
      const box = entry.target;
      const anchor: HTMLAnchorElement =
        box.nextElementSibling.querySelector("a");
      if (anchor) {
        const visiblePct = Math.floor(entry.intersectionRatio * 10000) / 100;
        const translateRatio = visiblePct - 40;
        const widthRatio = 100 - visiblePct * 0.9;
        anchor.style.transform = `translate3D(0,${translateRatio}%,0)`;
        anchor.style.width = `${widthRatio}%`;
      }
    });
  }, []);

  useEffect(() => {
    let observer;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, {
        threshold: thresholds,
      });
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return {
    ref: dom,
  };
};

export default useScrollMove;
