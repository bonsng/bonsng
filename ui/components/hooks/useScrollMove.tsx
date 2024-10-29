import { useCallback, useEffect, useRef } from "react";
import { element } from "prop-types";

const thresholds: Array<number> = [];
for (let i = 0; i < 1.0; i += 0.0001) {
  thresholds.push(i);
}

const useScrollMove = () => {
  const dom = useRef();

  const handleScroll = useCallback((entries) => {
    entries.forEach((entry) => {
      const { current } = dom;
      const anchors: HTMLAnchorElement =
        current.nextElementSibling.querySelectorAll("a");
      const anchor = anchors[0];
      if (anchor) {
        const visiblePct = Math.floor(entry.intersectionRatio * 10000) / 100;
        const translateRatio = 4.0 * visiblePct;
        const widthRatio = 10 + 0.5 * visiblePct;
        current.style.opacity = visiblePct / 100;
        anchor.style.transform = `translate3D(0,-${translateRatio}%,0)`;
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
