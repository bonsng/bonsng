import { usePageNumberState } from "@/ui/context/page-number.provider";
import clsx from "clsx";

const Layer = () => {
  const { state } = usePageNumberState();
  return (
    <>
      <div
        className={clsx(
          "w-full h-screen fixed left-0 top-0 bg-[#000000] z-10 transition-opacity duration-1000",
          {
            "opacity-0": state.pageNumber === 0,
            "opacity-40": state.pageNumber > 0,
          },
        )}
      />

      {/* 네모 윤곽선 애니메이션 div */}
      {state.pageNumber > 0 && (
        <div className="absolute left-[1%] top-[2%] w-[98%] h-[96%] z-20 flex items-center justify-center">
          {/* 테두리 4개 - div로 구현 */}
          <div className="absolute top-0 left-0 animate-borderX lg:h-[0.1px]  h-[1px] bg-white origin-left" />
          <div className="absolute top-0 right-0 lg:w-[0.1px] w-[1px] animate-borderY bg-white origin-top" />
          <div className="absolute bottom-0 right-0 animate-borderX lg:h-[0.1px] h-[1px] bg-white origin-right" />
          <div className="absolute bottom-0 left-0 lg:w-[0.1px] w-[1px] animate-borderY bg-white origin-bottom" />
        </div>
      )}
    </>
  );
};

export default Layer;
