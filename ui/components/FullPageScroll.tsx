// "use client";
// import { PropsWithChildren, useEffect, useRef, useState } from "react";
// import { usePageNumberState } from "@/ui/PageNumber/pageNumber.provider";
// import Nav from "@/ui/nav/Nav";
// import { contents } from "@/ui/data/contents";
// import { Dots } from "@/ui/components/Dot";
//
// type PFullPageScroll = {
//   onPageChange?: (page: number) => void;
//   onLoad?: (limit: number) => void;
// } & PropsWithChildren;
//
// export const FullPageScroll: React.FC<PFullPageScroll> = ({
//   children,
//   onLoad = () => {},
//   onPageChange = () => {},
// }) => {
//   const outerDivRef = useRef<HTMLDivElement>(null);
//   const currentPage = useRef<number>(0);
//   const canScroll = useRef<boolean>(true);
//   const oldTouchY = useRef<number>(0);
//   const [, refresh] = useState<number>(0);
//   const { state, dispatch } = usePageNumberState();
//
//   /**
//    * Scroll Actions
//    */
//   // Scroll Down
//   const smoothScroll = (targetY: number, duration: number) => {
//     const startY = outerDivRef.current?.scrollTop || 0;
//     const distance = targetY - startY;
//     const startTime = performance.now();
//
//     const animateScroll = (currentTime: number) => {
//       const elapsed = currentTime - startTime;
//       const progress = Math.min(elapsed / duration, 1); // 0 ~ 1 사이의 값
//
//       // 이징 함수 (easeOutCubic)
//       const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
//       const easedProgress = easeOutCubic(progress);
//
//       if (outerDivRef.current) {
//         outerDivRef.current.scrollTop = startY + distance * easedProgress;
//       }
//
//       if (progress < 1) {
//         requestAnimationFrame(animateScroll);
//       }
//     };
//
//     requestAnimationFrame(animateScroll);
//   };
//
//   const scrollDown = () => {
//     const pageHeight = outerDivRef.current?.children.item(0)?.clientHeight;
//     if (outerDivRef.current && pageHeight) {
//       outerDivRef.current.scrollTo({
//         top: pageHeight * (currentPage.current + 1),
//         left: 0,
//         behavior: "smooth",
//       });
//       // smoothScroll(pageHeight * (currentPage.current + 1), 1300);
//       canScroll.current = false;
//       setTimeout(() => {
//         canScroll.current = true;
//       }, 1000);
//       if (outerDivRef.current.childElementCount - 1 > currentPage.current) {
//         currentPage.current++;
//       }
//     }
//     console.log(currentPage.current);
//     dispatch({ type: "SET_PAGE_NUMBER", payload: currentPage.current });
//     console.log("page number: ", state.pageNumber);
//     onPageChange(currentPage.current);
//     refresh((v) => v + 1);
//   };
//
//   // Scroll Up
//   const scrollUp = () => {
//     const pageHeight = outerDivRef.current?.children.item(0)?.clientHeight;
//     if (outerDivRef.current && pageHeight) {
//       outerDivRef.current.scrollTo({
//         top: pageHeight * (currentPage.current - 1),
//         left: 0,
//         behavior: "smooth",
//       });
//       // smoothScroll(pageHeight * (currentPage.current - 1), 1300);
//       canScroll.current = false;
//       setTimeout(() => {
//         canScroll.current = true;
//       }, 1000);
//       if (currentPage.current > 0) {
//         currentPage.current--;
//       }
//     }
//     console.log(currentPage.current);
//     dispatch({ type: "SET_PAGE_NUMBER", payload: currentPage.current });
//     console.log("page number: ", state.pageNumber);
//     onPageChange(currentPage.current);
//     refresh((v) => v + 1);
//   };
//
//   /**
//    * Handlers
//    */
//   // Wheel Handler
//   const wheelHandler = (e: WheelEvent) => {
//     e.preventDefault();
//     if (!canScroll.current) return;
//     const { deltaY } = e;
//     console.log("scroll to", outerDivRef.current?.scrollHeight);
//     if (outerDivRef.current) {
//       if (deltaY > 0) {
//         scrollDown();
//       } else if (deltaY < 0) {
//         scrollUp();
//       }
//     }
//   };
//
//   // Scroll Handler
//   const scrollHandler = (e: Event) => {
//     e.preventDefault();
//   };
//
//   // Touch Handler (for mobile)
//   const onTouchDown = (e: TouchEvent) => {
//     oldTouchY.current = e.changedTouches.item(0)?.clientY || 0;
//   };
//   const onTouchUp = (e: TouchEvent) => {
//     const currentTouchY = e.changedTouches.item(0)?.clientY || 0;
//     const isScrollDown: boolean = oldTouchY.current - currentTouchY > 0;
//     if (isScrollDown) {
//       scrollDown();
//     } else {
//       scrollUp();
//     }
//   };
//
//   useEffect(() => {
//     const outer = outerDivRef.current;
//     if (!outer) return;
//     onLoad(outer.childElementCount);
//     refresh((v) => v + 1);
//     outer.addEventListener("wheel", wheelHandler);
//     outer.addEventListener("scroll", scrollHandler);
//     outer.addEventListener("touchmove", scrollHandler);
//     outer.addEventListener("touchstart", onTouchDown);
//     outer.addEventListener("touchend", onTouchUp);
//     return () => {
//       outer.removeEventListener("wheel", wheelHandler);
//       outer.removeEventListener("scroll", scrollHandler);
//       outer.removeEventListener("touchmove", scrollHandler);
//       outer.removeEventListener("touchstart", onTouchDown);
//       outer.removeEventListener("touchend", onTouchUp);
//     };
//   }, []);
//
//   const movePageTo = (index: number) => {
//     const num = currentPage.current;
//     if (index > num) for (let i = 0; i < index - num; i++) scrollDown();
//     else if (index < num) for (let i = 0; i < num - index; i++) scrollUp();
//   };
//
//   return (
//     <>
//       <Nav />
//       <div ref={outerDivRef} className="h-screen w-full overflow-y-hidden">
//         {children}
//       </div>
//       <Dots
//         contents={contents}
//         currentIndex={currentPage.current}
//         onDotClick={movePageTo}
//       />
//     </>
//   );
// };
