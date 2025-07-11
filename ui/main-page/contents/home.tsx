import { motion } from "framer-motion";

const HomeContent = () => {
  return (
    <motion.div
      key="bigLogo"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed lg:left-32 lg:top-[40%] top-4/10 left-10 font-oswald text-white lg:text-lg text-xs"
    >
      <p className="opacity-0 lg:opacity-100 lg:w-[55%] leading-relaxed">
        프론트엔드 개발은 단순한 UI 구현을 넘어, 성능 개선과 UX 최적화 등 다양한
        방법으로 사용자의 서비스 이용 편의를 돕고, 더 나아가 흥미로운 경험을
        제공하는 일이라 생각합니다.
      </p>
    </motion.div>
  );
};

export default HomeContent;
