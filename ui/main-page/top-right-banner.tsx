import React, { useEffect, useRef, useState } from "react";

const TopRightBanner = () => {
  const [visible, setVisible] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hidden = localStorage.getItem("hideTopRightBanner");
    if (hidden === "true") {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bannerRef.current && !bannerRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("hideTopRightBanner", "true");
  };

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      className="rounded-xl bg-[rgba(0,0,0,0.2)] border border-slate-200 fixed mt-4 right-3 p-3 lg:p-4 top-10 text-white"
    >
      <div className="absolute -top-0.5 -translate-y-1.5 right-0 -translate-x-5 border-b-[8px] border-b-slate-200 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent" />
      <p className="text-xs lg:text-lg">Play with me!</p>
      <button
        className="text-xs mt-2 text-blue-600 hover:underline hover:cursor-pointer"
        onClick={handleClose}
      >
        다시 보지 않기
      </button>
    </div>
  );
};

export default TopRightBanner;
