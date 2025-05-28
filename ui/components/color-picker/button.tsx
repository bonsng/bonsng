import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface ButtonProps {
  openColorPicker: boolean;
  setOpenColorPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

const Button = (props: ButtonProps) => {
  const { openColorPicker, setOpenColorPicker } = props;

  return (
    <motion.button
      onClick={() => setOpenColorPicker(!openColorPicker)}
      whileTap={{ scale: 0.97 }}
      className={clsx(
        "font-poppins text-lg flex justify-center bg-transparent font-extralight rounded-sm border-none p-2 relative transition-colors duration-75 hover:cursor-pointer",
        openColorPicker
          ? "text-slate-600 border-slate-600"
          : "text-slate-200 border-slate-200",
      )}
    >
      Colors
    </motion.button>
  );
};

export default Button;
