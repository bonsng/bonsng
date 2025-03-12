import { AnimatePresence, motion } from "framer-motion";
import Hex from "@/ui/components/color-picker/Hex";
import { useColorsState } from "@/ui/components/color-picker/colors.provider";

const colors = [
  "#82bce0",
  "#FFFFFF",
  "#000000",
  "#5cc86b",
  "#5c6ec8",
  "#457b9c",
  "#f4e792",
  "#5a3280",
  "#2d64c5",
  "#7a564b",
];

const ColorView = () => {
  // const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const { state, dispatch } = useColorsState();

  return (
    <>
      <div className="flex gap-3 flex-wrap justify-center my-4">
        {colors.map((color) => (
          <button
            key={color}
            // onClick={() => setSelectedColor(color)}
            onClick={() => dispatch({ type: "SET_COLOR", payload: color })}
            className="flex justify-center items-center hover:cursor-pointer"
          >
            <div
              className="w-6 h-6 border-none rounded-full z-10 relative"
              style={{ backgroundColor: color }}
            />
            <AnimatePresence mode="wait">
              {state.currentColor === color && (
                <motion.div
                  transition={{ type: "spring", duration: 0.3, bounce: 0.3 }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="z-0 w-7 h-7 ring-2 ring-blue-500 absolute rounded-full"
                ></motion.div>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
      <div className="flex">
        <Hex color={state.currentColor} />
      </div>
    </>
  );
};

export default ColorView;
