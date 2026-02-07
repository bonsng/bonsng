export const hero = {
  name: "Bonseung Koo",
  title: "Bonsng Portfolio",
  intro:
    "프론트엔드 개발은 단순한 UI 구현을 넘어 성능 개선과 UX 최적화로 사용자의 서비스 이용 편의를 높이고, 더 나아가 흥미로운 경험을 제공하는 일이라고 생각합니다.",
};

export const profile =
  "새로운 기술에 대한 거부감이 없으며, 변화에 빠르게 적응하고 배우는 것을 즐깁니다. 특히 Three.js를 활용한 3D UI에 흥미를 느껴 직관적이고 풍부한 사용자 경험을 구현하는 데 집중해 왔습니다.";

export const education = {
  school: "중앙대학교 소프트웨어학과",
  period: "2019.03 ~ 2025.08 (졸업 예정)",
};

export const skills = {
  languages: ["JavaScript", "TypeScript", "HTML5", "CSS3", "Python"],
  frontend: [
    "React",
    "Next.js",
    "Three.js",
    "Redux",
    "Tailwind CSS",
    "Framer Motion",
    "Zustand",
  ],
};

export type Project = {
  title: string;
  period: string;
  description: string;
  image: string;
  github: string;
  live: string;
};

export const projects: Project[] = [
  {
    title: "3Drive",
    period: "2025.03 - 2025.07",
    description: "3D 기반 클라우드 스토리지 서비스",
    image: "/project-images/3drive.png",
    github: "https://github.com/bonsng/3Drive-mock",
    live: "https://3-drive-mock.vercel.app/",
  },
  {
    title: "RoomOf",
    period: "2023.09 - 2023.12",
    description: "가상 메모리얼 서비스",
    image: "/project-images/roomof.png",
    github: "https://github.com/bonsng/RoomOfRebuild",
    live: "https://room-of-rebuild.vercel.app/",
  },
  {
    title: "Bonsng Ver1",
    period: "2025.01 - 2025.08",
    description: "개인 포트폴리오",
    image: "/project-images/bonsng.png",
    github: "https://github.com/bonsng/bonsng-old",
    live: "https://bonsng.vercel.app",
  },
];

export const contacts = [
  {
    label: "Email",
    value: "john.k7795@gmail.com",
    href: "mailto:john.k7795@gmail.com",
  },
  {
    label: "Phone",
    value: "010-7795-5801",
    href: "tel:01077955801",
  },
  {
    label: "GitHub",
    value: "github.com/bonsng",
    href: "https://github.com/bonsng",
  },
];
