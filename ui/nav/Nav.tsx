"use client";
import NameHeader from "@/public/svgs/bonsng3.svg";
import useScrollMove from "@/ui/components/hooks/useScrollMove";

export default function Nav() {
  const animatedItem = useScrollMove();
  return (
    <section className="sticky top-0 bg-gray-600 w-full flex justify-center">
      <div className="w-[95%] border-b-[1px]">
        <div className="flex justify-between relative w-full pl-4 pr-4 pt-8 pb-8 text-white ">
          <svg className="animate-bounce w-6 h-6 z-10 absolute -top-3 left-0 right-0"></svg>
          <div
            className="absolute top-0 left-0 w-full h-screen"
            {...animatedItem}
          />
          <div className="absolute flex justify-center top-0 left-0 right-0 bottom-0 z-1">
            <a className={`absolute transition-[width] select-none`}>
              <div className="mt-2">
                <NameHeader width="100%" />
              </div>
            </a>
          </div>
          <div className="flex text-lg">About</div>
          <div className="flex text-lg">Projects</div>
        </div>
      </div>
    </section>
  );
}
