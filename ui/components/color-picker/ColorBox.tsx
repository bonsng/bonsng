import React from "react";

interface Props {
  children: React.ReactNode;
}

const ColorBox = ({ children }: Props) => {
  return (
    <div className="rounded-xl w-56 h-56 bg-[rgba(0,0,0,0.2)] border border-slate-200 absolute mt-4 -left-3 -translate-x-2/3 p-4 text-white">
      <div className="absolute -top-0.5 -translate-y-1.5 right-0 -translate-x-5 border-b-[8px] border-b-slate-200 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent" />
      {children}
    </div>
  );
};

export default ColorBox;
