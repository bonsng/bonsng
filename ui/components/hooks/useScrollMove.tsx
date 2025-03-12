import { useCallback, useEffect, useRef } from "react";

const thresholds: number[] = [];
for (let i = 0; i < 1.0; i += 0.0001) {
  thresholds.push(i);
}

const useScrollMove = () => {
  const dom = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback((entries: IntersectionObserverEntry[]) => {
    const { current } = dom;

    if (!current) return;
    const anchor = document.querySelector<HTMLAnchorElement>("header a");
    const nav = document.querySelector<HTMLDivElement>("header div");

    entries.forEach((entry) => {
      if (!anchor || !nav) return;

      const ratio = entry.intersectionRatio;
      const visiblePct = Math.floor(ratio * 10000) / 100;
      const translateRatio = 0.5 * visiblePct;
      const widthRatio = 10 + 0.3 * visiblePct;

      anchor.style.transform = `translate3D(10%,${translateRatio}%,0)`;
      anchor.style.width = `${widthRatio}%`;

      current.style.opacity = ratio <= 0.4 ? `${(ratio / 4) * 10}` : `${1}`;
      nav.style.opacity = `${ratio <= 0.4 ? 1 - (ratio / 4) * 10 : 0}`;
    });
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, {
        threshold: thresholds,
      });
      observer.observe(current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [handleScroll]);

  return { ref: dom };
};

export default useScrollMove;
