"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePageNumberState } from "@/ui/PageNumber/pageNumber.provider";

export default function Logo() {
  const { state, dispatch } = usePageNumberState();
  const goHome = () => {
    dispatch({ type: "SET_PAGE_NUMBER", payload: 0 });
  };
  return (
    <>
      <header className="fixed top-0 h-0 w-full z-50 ">
        {/*<div*/}
        {/*  className="absolute z-[11] left-8 top-8 font-oswald text-white font-thin text-4xl hover:cursor-pointer"*/}
        {/*  onClick={goHome}*/}
        {/*>*/}
        {/*  Bonseung Koo*/}
        {/*</div>*/}
        <AnimatePresence mode="wait">
          {state.pageNumber !== 0 ? (
            <SmallLogo handleClick={goHome} />
          ) : (
            <BigLogo handleClick={goHome} />
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

const SmallLogo = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <motion.div
      key="smallLogo"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="absolute z-[50] left-8 top-8 font-oswald text-white font-thin text-4xl hover:cursor-pointer"
      onClick={handleClick}
    >
      Bonsng
    </motion.div>
  );
};

const BigLogo = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <motion.div
      key="bigLogo"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="absolute z-[50] lg:left-32 top-24 left-12  font-oswald text-white font-[1] lg:text-9xl text-6xl hover:cursor-pointer"
      onClick={handleClick}
    >
      Bonseung
      <br />
      Koo
    </motion.div>
  );
};
