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
  period: "2019.03 ~ 2025.08 (졸업)",
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
  details: string[];
  image: string;
  github: string;
  live: string;
};

export const projects: Project[] = [
  {
    title: "3Drive",
    period: "2025.03 - 2025.07",
    description: "3D 기반 클라우드 스토리지 서비스",
    details: [
      "기존 2D 리스트/트리 중심 탐색 방식에서 벗어나, 3D 공간 기반 파일 탐색 경험을 제공한 클라우드 스토리지 서비스입니다.",
      "React Three Fiber와 Three.js를 활용해 폴더/파일의 계층 관계를 공간 좌표와 연결선으로 시각화하고, 구조를 직관적으로 인지할 수 있도록 설계했습니다.",
      "전체 폴더 구조를 기준으로 객체별 각도·위치를 계산하는 좌표 생성 알고리즘을 구현했고, 객체 충돌 방지 로직을 적용해 조작 시 혼잡도를 낮췄습니다.",
      "거리 기반 모델/컴포넌트 조건부 렌더링과 검색 debounce를 적용해 불필요한 연산 및 API 호출을 줄여 렌더링 성능을 최적화했습니다.",
      "파일 탐색기 특성상 반복 호출되는 모달을 추상화하고, forwardRef/useImperativeHandle/Context API 기반으로 제어 구조를 분리해 리렌더링 비용을 낮췄습니다.",
      "AWS EC2 백엔드와 연동해 파일 리스트 조회, 이동, 삭제, 업로드를 동기화했으며 next-auth 기반 인증 흐름과 상태 관리 모듈을 함께 구성했습니다.",
    ],
    image: "/project-images/3drive.png",
    github: "https://github.com/bonsng/3Drive-mock",
    live: "https://3-drive-mock.vercel.app/",
  },
  {
    title: "RoomOf",
    period: "2023.09 - 2023.12",
    description: "가상 메모리얼 서비스",
    details: [
      "그리운 사람을 추억할 수 있는 몰입형 가상 공간을 제공하는 메모리얼 서비스로, 감성적인 UI와 인터랙티브 경험에 초점을 맞췄습니다.",
      "Three.js 기반 3D 렌더링과 React Three Fiber UI 구성을 결합해 장면 구성의 유연성을 높이고, 사용자 시점 중심의 상호작용을 구현했습니다.",
      "카메라 및 오브젝트 제어 로직을 사용자 인터랙션 흐름에 맞춰 설계해 탐색 과정에서의 몰입감과 조작 안정성을 개선했습니다.",
      "Texture Baking을 통해 3D 모델 텍스처 비용을 줄이고, 복잡한 장면에서도 초기 로딩 부담을 완화하도록 최적화했습니다.",
      "3D 자산과 방명록 데이터를 동시에 요청한 뒤 Suspense로 합류시켜 초기 페인트 시점을 단축하고 체감 로딩 속도를 개선했습니다.",
      "JWT 기반 인증 로직과 마우스/스크롤 이벤트 관리 훅을 적용해 사용자 동작에 민감하게 반응하는 UX를 구현했습니다.",
    ],
    image: "/project-images/roomof.png",
    github: "https://github.com/bonsng/RoomOfRebuild",
    live: "https://room-of-rebuild.vercel.app/",
  },
  {
    title: "Bonsng Ver1",
    period: "2025.01 - 2025.08",
    description: "개인 포트폴리오",
    details: [
      "개인 포트폴리오 1차 버전으로, 프로젝트 아카이빙과 자기소개를 중심으로 정보 구조를 설계했습니다.",
      "섹션별 UI 컴포넌트를 분리해 재사용성을 높였고, 페이지 확장 시 구조 변경 비용이 낮도록 레이아웃을 모듈화했습니다.",
      "프로젝트 카드, 소개, 연락처 등 핵심 정보를 빠르게 스캔할 수 있도록 시각적 우선순위와 타이포그래피 계층을 정리했습니다.",
      "스타일 토큰과 공통 패턴을 정리해 유지보수성을 높이고, 이후 버전에서 기능 추가가 가능하도록 기반을 마련했습니다.",
      "반응형 레이아웃 기준을 명확히 잡아 모바일/데스크톱 전환 시 정보 밀도와 가독성이 크게 흔들리지 않도록 조정했습니다.",
    ],
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
