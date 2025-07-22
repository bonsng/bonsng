import { ReactNode } from "react";

const About = () => {
  return (
    <div className="flex flex-col w-3/4 justify-center text-white text-lg lg:w-3/4 lg:px-10">
      <ContentWrapper>
        <Title title={"Profile"} />
        <p className="text-sm lg:text-lg">
          새로운 기술에 대한 거부감이 없으며, 변화에 빠르게 적응하고 배우는 것을
          즐깁니다. 또한, 배운 내용을 실제 프로젝트에 적용해보며 스스로 성장해
          나가고 있습니다. 특히 Three.js를 활용한 3D UI에 흥미를 느껴, 이를
          활용하여 직관적이며 더욱 풍부한 사용자 경험을 구현하는 데 집중해
          왔습니다. 항상 사용자의 관점을 우선시하여 설계를 하려 노력하고
          있습니다. 사용자에게 가장 먼저 보이는 것이라는 마음으로 책임감을
          가지고 임하겠습니다.
        </p>
      </ContentWrapper>
      <ContentWrapper>
        <Title title={"Education"} />
        <p className="text-sm lg:text-lg">중앙대학교 소프트웨어학과</p>
        <p className="text-xs lg:text-lg">2019.03 ~ 2025.08 (졸업 예정)</p>
      </ContentWrapper>
      <ContentWrapper>
        <Title title={"Skills"} />
        <h3 className="font-semibold">Languages</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" />
          <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
          <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" />
          <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" />
          <img src="https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white" />
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Frontend</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" />
            <img src="https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white" />
            <img src="https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white" />
            <img src="https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white" />
            <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white" />
            <img src="https://img.shields.io/badge/Framer_Motion-EF476F?logo=framer&logoColor=white" />
            <img src="https://img.shields.io/badge/Zustand-000000?logo=react&logoColor=white" />
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="mt-4 lg:mt-10 lg:mb-5">{children}</div>;
};

const Title = ({ title }: { title: string }) => {
  return <h1 className="lg:text-4xl text-xl mb-2">/ {title}</h1>;
};

export default About;
