import clsx from "clsx";
import { usePageNumberState } from "@/ui/context/page-number.provider";
import React from "react";

type PDot = {
  index: number;
  content: string;
};

const Dot: React.FC<PDot> = ({ index, content }) => {
  const { state, dispatch } = usePageNumberState();
  const selected = index === state.pageNumber;

  return (
    <div
      className={clsx(
        "relative w-2 h-2 rounded-2xl text-sm lg:text-base my-3 transition-colors cursor-pointer text-white flex justify-end items-center duration-300",
        {
          "bg-white": selected, // 선택된 경우 하얀색
          "bg-transparent hover:text-gray-500": !selected, // 기본 회색, 호버 시 하얀색
        },
      )}
      onClick={() => dispatch({ type: "SET_PAGE_NUMBER", payload: index })}
    >
      <p
        className={clsx("transition-opacity duration-300", {
          "opacity-100": !selected,
          "opacity-0": selected,
        })}
      >
        {content}
      </p>
    </div>
  );
};

type TDots = {
  contents: string[];
};

export const Dots: React.FC<TDots> = ({ contents }) => {
  return (
    <div className="fixed top-0 right-6 lg:right-12 h-full z-50" id="nav-dots">
      <div className="fixed flex flex-col h-full items-center justify-center">
        {contents.map((v, idx) => (
          <Dot key={idx} index={idx} content={v}></Dot>
        ))}
      </div>
    </div>
  );
};
