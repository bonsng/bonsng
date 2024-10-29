"use client";

import NameHeader from "@/public/svgs/bonsng3.svg";

export default function Header() {
  return (
    <div className="absolute flex items-center justify-center w-full top-0 left-0 bottom-0 right-0 z-10">
      <a className="absolute inline-block ">
        <NameHeader width="100%" />
      </a>
    </div>
  );
}
