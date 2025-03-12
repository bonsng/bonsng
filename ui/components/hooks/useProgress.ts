import { useCallback, useEffect, useState } from "react";

export const useProgress = (): number => {
  const [width, setWidth] = useState<number>(0);
  const handleProgress = useCallback((): void => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop == 0) {
      setWidth(0);
      return;
    }
    const windowHeight: number = scrollHeight - clientHeight;
    const currentPosition: number = scrollTop / windowHeight;

    setWidth(currentPosition * 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleProgress, true);

    return () => {
      window.removeEventListener("scroll", handleProgress, true);
    };
  }, [handleProgress]);

  return width;
};
