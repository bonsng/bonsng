"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/ui/components/color-picker/button";
import ColorBox from "@/ui/components/color-picker/color-box";
import { AnimatePresence, motion } from "framer-motion";
import ColorView from "@/ui/components/color-picker/color-view";
import { useModalContext } from "@/ui/modal/modal-context.provider";

const ColorPicker = () => {
  const [openColorPicker, setOpenColorPicker] = useState<boolean>(false);
  const { state } = useModalContext();
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
    !state.isOpen && (
      <AnimatePresence>
        <motion.div
          ref={pickerRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="fixed top-1 right-1 lg:top-2 z-50"
        >
          <Button
            openColorPicker={openColorPicker}
            setOpenColorPicker={setOpenColorPicker}
          />
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
        </motion.div>
      </AnimatePresence>
    )
  );
};

export default ColorPicker;
