"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/ui/components/color-picker/button";
import ColorBox from "@/ui/components/color-picker/color-box";
import { AnimatePresence, motion } from "framer-motion";
import ColorView from "@/ui/components/color-picker/color-view";

const ColorPicker = () => {
  const [openColorPicker, setOpenColorPicker] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setOpenColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={pickerRef} className="fixed top-3 right-3 z-50">
      <Button
        openColorPicker={openColorPicker}
        setOpenColorPicker={setOpenColorPicker}
      />
      <AnimatePresence>
        {openColorPicker && (
          <motion.div
            transition={{ type: "spring", duration: 0.3, bounce: 0.3 }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            <ColorBox>
              <div className="font-poppins font-light">Color Box</div>
              <ColorView />
            </ColorBox>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;
