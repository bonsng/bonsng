import { motion, AnimatePresence } from "framer-motion";
import About from "./Contents/About";
import Projects from "./Contents/Projects";
import Skills from "./Contents/Skills";
import Contact from "./Contents/Contact";
import { usePageNumberState } from "@/ui/PageNumber/pageNumber.provider";
import Home from "@/ui/MainPage/Html/Home";

const components = [Home, About, Projects, Skills, Contact];

const MainPageHtml = () => {
  const { state } = usePageNumberState();
  const PageComponent = components[state.pageNumber];

  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={state.pageNumber}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full z-30 pt-20 pb-6 px-4"
        >
          <PageComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainPageHtml;
