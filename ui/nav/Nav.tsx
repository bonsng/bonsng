"use client";

import Header from "@/ui/MainPage/Header";

export default function Nav() {
  return (
    <section className="sticky top-0 bg-transparent w-full flex justify-center">
      <div className="w-[95%] border-b-[1px]">
        <div className="flex justify-between relative w-full pl-4 pr-4 pt-8 pb-8 text-white ">
          <Header />
          <div className="flex text-lg">About</div>
          <div className="flex text-lg">Projects</div>
        </div>
      </div>
    </section>
  );
}
