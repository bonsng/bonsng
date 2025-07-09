import { motion, AnimatePresence } from "framer-motion";
import { usePageNumberState } from "@/ui/context/page-number.provider";
import Home from "@/ui/main-page/contents/home";
import About from "@/ui/main-page/contents/About";
import Projects from "@/ui/main-page/contents/Projects";
import Skills from "@/ui/main-page/contents/Skills";
import Contact from "@/ui/main-page/contents/Contact";

const components = [Home, About, Projects, Skills, Contact];

const MainPageHtml = () => {
  const { state } = usePageNumberState();
  const PageComponent = components[state.pageNumber];

  return (
    <div className="w-full h-full flex justify-center items-center overflow-y-auto z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={state.pageNumber}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full z-30 pt-20 pb-6 px-4"
        >
          <div className="relative top-0 w-full bg-no-repeat bg-cover bg-center overflow-y-auto">
            <PageComponent />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainPageHtml;
