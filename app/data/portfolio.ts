export type LocalizedText = {
  ko: string;
  en: string;
};

export type DetailItem = {
  ko: string;
  en: string;
  blog?: string;
};

export type DetailSubSection = {
  title: LocalizedText;
  blog?: string;
  items: DetailItem[];
};

export type DetailSection = {
  title: LocalizedText;
  blog?: string;
  link?: { url: string; label: string };
  subSections?: DetailSubSection[];
  items?: DetailItem[];
};

export const hero = {
  name: "Bonseung Koo",
  title: "Portfolio",
  role: {
    ko: "Frontend Engineer",
    en: "Frontend Engineer",
  } satisfies LocalizedText,
  intro: {
    ko: "프론트엔드 개발은 단순한 UI 구현을 넘어, 성능 최적화와 UX 개선을 통해 사용자의 편의를 높이고 더 나아가 흥미로운 경험을 만드는 일이라고 생각합니다. '가장 먼저 보이는 것'인 만큼, 그에 걸맞은 책임감으로 임하고 있습니다.",
    en: "I believe frontend development goes beyond simple UI implementation — it is about enhancing user convenience through performance optimization and UX improvements, and ultimately creating engaging experiences. As the first thing users see, I approach it with a strong sense of responsibility.",
  } satisfies LocalizedText,
};

export const profile: LocalizedText = {
  ko: "새로운 기술을 빠르게 습득하고 실제 프로젝트에 적용하며 성장하는 것을 즐깁니다. 특히 Three.js를 활용한 데이터 시각화에 깊은 흥미를 느껴, 직관적이고 풍부한 사용자 경험을 구현하는 데 집중해 왔습니다. 시각적 완성도에만 머물지 않고, 학부에서 쌓은 전공 지식을 바탕으로 효율적이고 안정적인 코드를 작성하고자 꾸준히 노력하고 있습니다. 또한, 빠르게 발전하는 AI 기술의 흐름에도 민감하게 반응하며, 이를 개발 전반에 적극적으로 활용하고자 합니다.",
  en: "I enjoy rapidly learning new technologies and growing by applying them to real projects. I have a deep interest in data visualization with Three.js and have focused on building intuitive, rich user experiences. Beyond visual polish, I consistently strive to write efficient and stable code grounded in the CS fundamentals I built during my studies. I also stay attuned to the rapidly evolving AI landscape and actively incorporate it throughout my development workflow.",
};

export const education = {
  school: {
    ko: "중앙대학교 소프트웨어학과",
    en: "Chung-Ang University, Computer Science and Engineering",
  } satisfies LocalizedText,
  period: "2019.03 ~ 2025.08 (졸업)",
};

export type SkillRow = {
  category: string;
  items: string[];
};

export const skills: SkillRow[] = [
  { category: "Lang & Framework", items: ["JavaScript", "TypeScript", "React", "Next.js", "Python"] },
  { category: "Infra", items: ["Vercel", "AWS S3", "GitHub Actions"] },
  { category: "Library", items: ["Three.js", "Tailwind CSS", "Zustand", "Framer Motion"] },
  { category: "Test", items: ["Vitest", "React Testing Library"] },
  { category: "AI", items: ["OpenAI API", "Claude Code CLI"] },
];

export type Project = {
  title: string;
  period: string;
  description: LocalizedText;
  details: DetailSection[];
  image: string;
  github: string;
  live: string;
};

export const projects: Project[] = [
  {
    title: "뭉(moong)",
    period: "2026.01 - 2026.03",
    description: {
      ko: "반려견 전용 가계부 서비스",
      en: "Pet Dog Expense Tracker Service",
    },
    details: [
      {
        title: {
          ko: "SSE 실시간 알림 시스템 구현 - 다양한 저금 이벤트 실시간 알림 제공",
          en: "SSE Real-time Notification System - Real-time Alerts for Savings Events",
        },
        subSections: [
          {
            title: { ko: "설계 및 아키텍처", en: "Design & Architecture" },
            blog: "https://publish.obsidian.md/bonsng/blog/%EC%86%8C%ED%94%84%ED%8B%B0%EC%96%B4+%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84/%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8+-+Moong/SSE+&+%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/SSE+%EC%84%A4%EA%B3%84+%E2%80%90+%EC%9E%84%EC%8B%9C+%ED%86%A0%ED%81%B0+%EB%B0%A9%EC%8B%9D+%EC%97%B0%EA%B2%B0",
            items: [
              { ko: "fetch + ReadableStream 기반 SSE 실시간 알림 시스템 설계", en: "Designed SSE real-time notification system based on fetch + ReadableStream" },
              { ko: "임시 토큰 방식으로 Vercel 서버리스 타임아웃 우회 아키텍처 설계", en: "Designed architecture to bypass Vercel serverless timeout using temporary token approach" },
            ],
          },
          {
            title: { ko: "안정성 및 최적화", en: "Stability & Optimization" },
            blog: "https://publish.obsidian.md/bonsng/blog/%EC%86%8C%ED%94%84%ED%8B%B0%EC%96%B4+%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84/%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8+-+Moong/SSE+&+%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/SSE+%EC%8B%AC%ED%99%94+%E2%80%90+%EC%9E%AC%EC%97%B0%EA%B2%B0+%EC%A0%84%EB%9E%B5+%EB%B0%8F+%EA%B3%A0%EB%8F%84%ED%99%94",
            items: [
              { ko: "지수 백오프 + Equal Jitter 재연결 전략으로 서버 부하 분산", en: "Distributed server load with exponential backoff + Equal Jitter reconnection strategy" },
              { ko: "하트비트 모니터링 + 탭 가시성 API 연동으로 불필요한 연결 제거", en: "Eliminated unnecessary connections via heartbeat monitoring + Tab Visibility API integration" },
            ],
          },
        ],
      },
      {
        title: {
          ko: "서버 컴포넌트 단위 에러 바운더리",
          en: "Server Component-level Error Boundaries",
        },
        subSections: [
          {
            title: { ko: "\"성공에만 집중하는\" 비동기 UI 패턴 적용", en: "Async UI Pattern Focused on \"Success Only\"" },
            blog: "https://publish.obsidian.md/bonsng/blog/%EC%86%8C%ED%94%84%ED%8B%B0%EC%96%B4+%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84/%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8+-+Moong/%EC%97%90%EB%9F%AC+%EC%B2%98%EB%A6%AC/%EB%8F%99%EA%B8%B0%EC%B2%98%EB%9F%BC+%EC%93%B0%EB%8A%94+%EB%B9%84%EB%8F%99%EA%B8%B0+UI+-+Suspense+&+Error+Boundary",
            items: [
              { ko: "공용 ErrorBoundary 클래스 컴포넌트 구현", en: "Implemented a shared ErrorBoundary class component" },
            ],
          },
          {
            title: { ko: "에러 바운더리 고도화", en: "Advanced Error Boundary" },
            blog: "https://publish.obsidian.md/bonsng/blog/%EC%86%8C%ED%94%84%ED%8B%B0%EC%96%B4+%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84/%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8+-+Moong/%EC%97%90%EB%9F%AC+%EC%B2%98%EB%A6%AC/Error+Boundary+%EA%B3%A0%EB%8F%84%ED%99%94+(Next.js+%EC%9A%A9+%EC%BB%A4%EC%8A%A4%ED%85%80)",
            items: [
              { ko: "서버 컴포넌트의 재시도 적용 및 에러 전파용 커스텀 훅 구현", en: "Applied server component retry logic and built a custom hook for error propagation" },
            ],
          },
          {
            title: { ko: "트러블 슈팅 및 해결", en: "Troubleshooting & Resolution" },
            blog: "https://publish.obsidian.md/bonsng/blog/%EC%86%8C%ED%94%84%ED%8B%B0%EC%96%B4+%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84/%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8+-+Moong/%EC%97%90%EB%9F%AC+%EC%B2%98%EB%A6%AC/Server+Component%EB%8A%94+throw%ED%95%98%EC%A7%80+%EC%95%8A%EB%8A%94%EB%8B%A4+%E2%80%90+Next.js+%EC%97%90%EB%9F%AC+%EC%B2%98%EB%A6%AC%EC%99%80+%EB%9D%BC%EC%9A%B0%ED%84%B0+%EC%98%A4%EC%97%BC+%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85",
            items: [
              { ko: "Next.js 라우터의 한계 파악 및 2-tier 에러 처리 아키텍처 구현", en: "Identified Next.js router limitations and implemented a 2-tier error handling architecture" },
            ],
          },
        ],
      },
      {
        title: {
          ko: "다양한 Next.js 라우팅 전략 활용",
          en: "Diverse Next.js Routing Strategies",
        },
        items: [
          { ko: "병렬 라우팅을 통한 독립 에러/로딩 처리", en: "Independent error/loading handling via parallel routing" },
          { ko: "경로 가로채기를 활용한 모달 구현", en: "Modal implementation using route interception" },
          { ko: "탭 전환시 reconciliation 되지 않아 데이터가 쌓이는 문제 해결", en: "Resolved data accumulation issue caused by missing reconciliation on tab switches", blog: "https://publish.obsidian.md/bonsng/blog/%EC%86%8C%ED%94%84%ED%8B%B0%EC%96%B4+%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84/%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8+-+Moong/Next.js/Parallel+Route+%EC%99%80+%EB%8D%B0%EC%9D%B4%ED%84%B0+%EC%8C%93%EC%9E%84+%ED%98%84%EC%83%81+(Forecast+%ED%8E%98%EC%9D%B4%EC%A7%80)" },
        ],
      },
      {
        title: {
          ko: "저금통 물리 시뮬레이션 (Matter.js)",
          en: "Piggy Bank Physics Simulation (Matter.js)",
        },
        blog: "https://publish.obsidian.md/bonsng/blog/%EC%86%8C%ED%94%84%ED%8B%B0%EC%96%B4+%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84/%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8+-+Moong/%ED%8E%98%EC%9D%B4%EC%A7%80+%EC%84%A4%EA%B3%84/Matter.js+%EC%99%80+%EC%A0%80%EA%B8%88%ED%86%B5+%ED%8E%98%EC%9D%B4%EC%A7%80",
        items: [
          { ko: "Matter.js 기반 저금통 인터랙션 구현", en: "Implemented piggy bank interaction based on Matter.js" },
          { ko: "동적 임포트로 번들 최적화", en: "Optimized bundle size with dynamic imports" },
          { ko: "금액 비례 동전 크기 알고리즘으로 넘치지 않는 저금통 구현", en: "Built a non-overflowing piggy bank with amount-proportional coin sizing algorithm" },
          { ko: "클린업 함수로 메모리 누수 방지", en: "Prevented memory leaks with cleanup functions" },
        ],
      },
      {
        title: {
          ko: "Vibe Coding을 통한 랜딩 페이지 제작",
          en: "Landing Page via Vibe Coding",
        },
        link: { url: "https://github.com/bonsng/moong-onboarding", label: "Github" },
      },
    ],
    image: "/project-images/moong.png",
    github: "https://github.com/bonsng/WEB-Team5-Moong",
    live: "https://moongmoong.site",
  },
  {
    title: "3Drive",
    period: "2025.03 - 2025.07",
    description: {
      ko: "3D 기반 클라우드 스토리지 서비스",
      en: "3D Cloud Storage Service",
    },
    details: [
      {
        title: {
          ko: "추상화 수준을 맞춘 모달 구현",
          en: "Modal Implementation with Matched Abstraction Levels",
        },
        items: [
          { ko: "파일 탐색기 특성상 잦은 모달 호출을 고려하여 모달 추상화", en: "Abstracted modals considering frequent invocations inherent to file explorers" },
          { ko: "모달 상태 관리를 분리하여 상위 컴포넌트의 부담 최소화 및 불필요한 리렌더링 제거", en: "Separated modal state management to minimize parent component burden and eliminate unnecessary re-renders" },
          { ko: "Context API를 통해 모달의 상태를 받아와 별개의 단독 컴포넌트에서 모달 렌더링 실시", en: "Retrieved modal state via Context API and rendered modals in isolated standalone components" },
          { ko: "유지보수성 향상을 통해 개발자 경험 개선", en: "Improved developer experience through enhanced maintainability" },
        ],
      },
      {
        title: {
          ko: "파일 메타데이터 동기화 및 백엔드 연동",
          en: "File Metadata Sync and Backend Integration",
        },
        items: [
          { ko: "AWS EC2 기반 서버와 연동하여 파일 리스트, 이동, 삭제, 업로드 등의 동기화 기능 구현", en: "Implemented sync features for file listing, move, delete, and upload with AWS EC2-based server" },
          { ko: "next-auth를 활용하여 미들웨어 처리 후 Context API를 통한 상태 관리 모듈 개발", en: "Developed state management module via Context API after middleware processing using next-auth" },
          { ko: "useMemo를 통한 파일 메타데이터 저장 최적화", en: "Optimized file metadata storage with useMemo" },
        ],
      },
      {
        title: {
          ko: "3D 공간 UI 및 좌표 생성 알고리즘",
          en: "3D Spatial UI and Coordinate Generation Algorithm",
        },
        items: [
          { ko: "React Three Fiber와 Three.js를 활용하여 폴더 및 파일을 구 조직으로 배치하고, 선 연결로 구조 시각화", en: "Arranged folders and files in spherical organization using React Three Fiber and Three.js, visualizing structure with line connections" },
          { ko: "전체 폴더 구조를 기반으로, 각 객체에 고유한 각도 및 위치를 부여하는 알고리즘 구현", en: "Implemented algorithm assigning unique angles and positions to each object based on overall folder structure" },
          { ko: "객체 간 충돌 방지 로직 적용으로 UX 저하 요소 제거", en: "Eliminated UX degradation by applying collision prevention logic between objects" },
          { ko: "검색기능 debounce 적용으로 API 호출 최소화", en: "Minimized API calls by applying debounce to search functionality" },
          { ko: "거리에 따른 모델 및 컴포넌트 조건부 렌더링으로 성능 최적화", en: "Optimized performance with distance-based conditional rendering of models and components" },
        ],
      },
    ],
    image: "/project-images/3drive.png",
    github: "https://github.com/bonsng/3Drive-mock",
    live: "https://3-drive-mock.vercel.app/",
  },
  {
    title: "RoomOf",
    period: "2023.09 - 2023.12",
    description: {
      ko: "가상 메모리얼 서비스",
      en: "Virtual Memorial Service",
    },
    details: [
      {
        title: {
          ko: "Three.js 기반의 3D 렌더링",
          en: "Three.js-based 3D Rendering",
        },
        items: [
          { ko: "React Three Fiber를 활용한 3D UI 구현", en: "Implemented 3D UI using React Three Fiber" },
          { ko: "사용자 시점의 인터랙션을 반영한 카메라 및 객체 제어", en: "Camera and object control reflecting user-perspective interactions" },
          { ko: "Texture Baking을 통한 모델 텍스처 최적화", en: "Model texture optimization via Texture Baking" },
          { ko: "3D 자산과 방명록 데이터를 동시 요청, Suspense 합류로 초기 페인트율 단축", en: "Shortened initial paint time by concurrent 3D asset and guestbook data requests merged with Suspense" },
        ],
      },
      {
        title: {
          ko: "JWT Token 기반 인증 로직 구현",
          en: "JWT Token-based Authentication",
        },
        items: [
          { ko: "Access / Refresh token을 활용한 인증 흐름 설계 및 구현", en: "Designed and implemented authentication flow using Access / Refresh tokens" },
        ],
      },
      {
        title: {
          ko: "React Custom Hook을 통한 마우스/스크롤 이벤트 관리",
          en: "Mouse/Scroll Event Management via React Custom Hooks",
        },
        items: [
          { ko: "사용자 움직임에 민감하게 반응하는 구조로 UX 최적화", en: "Optimized UX with a structure that responds sensitively to user movements" },
          { ko: "컴포넌트 간 재사용성을 고려한 구조화", en: "Structured for reusability across components" },
        ],
      },
    ],
    image: "/project-images/roomof.png",
    github: "https://github.com/bonsng/RoomOfRebuild",
    live: "https://room-of-rebuild.vercel.app/",
  },
  {
    title: "Bonsng Ver2",
    period: "2026.01 - Present",
    description: {
      ko: "개인 포트폴리오 리뉴얼",
      en: "Personal Portfolio Renewal",
    },
    details: [
      {
        title: {
          ko: "인터랙티브 3D Hero 및 레이아웃 설계",
          en: "Interactive 3D Hero and Layout Design",
        },
        items: [
          { ko: "홈 화면을 데스크톱 2분할/모바일 스택 구조로 재설계하고, 3D Hero 영역과 텍스트 영역의 균형을 개선했습니다.", en: "Redesigned the home screen into a desktop split layout and mobile stacked layout, improving balance between 3D hero visuals and textual content." },
          { ko: "네비게이션에 glass 스타일, 활성 인디케이터, 하단 접근 UX를 적용해 시각적 일관성과 사용 흐름을 강화했습니다.", en: "Refined navigation with glass styling, active indicator behavior, and bottom-reveal UX to improve consistency and interaction flow." },
        ],
      },
      {
        title: {
          ko: "프로젝트 상세 모달 및 다국어/테마 지원",
          en: "Project Detail Modals and i18n/Theme Support",
        },
        items: [
          { ko: "Projects 섹션에 카드 클릭 기반 상세 모달을 도입해 프로젝트 맥락, 기술 선택, 구현 포인트를 더 깊게 전달하도록 구성했습니다.", en: "Added click-to-open detail modals in Projects so each project can communicate context, technical decisions, and implementation depth more clearly." },
          { ko: "다크 모드와 한/영 언어 설정을 추가하고, 쿠키 기반 초기 렌더 동기화로 새로고침 시 깜빡임을 줄였습니다.", en: "Introduced dark mode and Korean/English settings, with cookie-based initial render sync to minimize refresh flicker." },
        ],
      },
      {
        title: {
          ko: "CI 파이프라인 구성",
          en: "CI Pipeline Setup",
        },
        items: [
          { ko: "GitHub Actions CI(lint/build) 파이프라인을 도입해 기본 품질 검증을 자동화했습니다.", en: "Set up a GitHub Actions CI pipeline (lint/build) to automate baseline quality checks." },
        ],
      },
    ],
    image: "/project-images/bonsng_ver2.png",
    github: "https://github.com/bonsng/bonsng",
    live: "https://bonsng.vercel.app",
  },
  {
    title: "Bonsng Ver1",
    period: "2025.01 - 2025.08",
    description: {
      ko: "개인 포트폴리오",
      en: "Personal Portfolio",
    },
    details: [
      {
        title: {
          ko: "정보 구조 설계 및 컴포넌트 모듈화",
          en: "Information Architecture and Component Modularization",
        },
        items: [
          { ko: "프로젝트 아카이빙과 자기소개를 중심으로 정보 구조를 설계했습니다.", en: "Designed information architecture centered on project archiving and personal introduction." },
          { ko: "섹션별 UI 컴포넌트를 분리해 재사용성을 높였고, 페이지 확장 시 구조 변경 비용이 낮도록 레이아웃을 모듈화했습니다.", en: "Separated section-level UI into reusable components and modularized layout structure for easier future expansion." },
        ],
      },
      {
        title: {
          ko: "시각 계층 및 반응형 레이아웃",
          en: "Visual Hierarchy and Responsive Layout",
        },
        items: [
          { ko: "프로젝트 카드, 소개, 연락처 등 핵심 정보를 빠르게 스캔할 수 있도록 시각적 우선순위와 타이포그래피 계층을 정리했습니다.", en: "Refined visual hierarchy and typography to make projects, profile, and contact information quickly scannable." },
          { ko: "스타일 토큰과 공통 패턴을 정리해 유지보수성을 높이고, 이후 버전에서 기능 추가가 가능하도록 기반을 마련했습니다.", en: "Organized style tokens and common patterns to improve maintainability and support iterative feature additions." },
          { ko: "반응형 레이아웃 기준을 명확히 잡아 모바일/데스크톱 전환 시 정보 밀도와 가독성이 크게 흔들리지 않도록 조정했습니다.", en: "Defined responsive layout rules to keep readability and information density consistent across mobile and desktop." },
        ],
      },
    ],
    image: "/project-images/bonsng.png",
    github: "https://github.com/bonsng/bonsng-old",
    live: "https://bonsng.vercel.app",
  },
];

export const contacts = [
  {
    label: {
      ko: "이메일",
      en: "Email",
    } satisfies LocalizedText,
    value: "john.k7795@gmail.com",
    href: "mailto:john.k7795@gmail.com",
  },
  {
    label: {
      ko: "전화",
      en: "Phone",
    } satisfies LocalizedText,
    value: "010-7795-5801",
    href: "tel:01077955801",
  },
  {
    label: {
      ko: "깃허브",
      en: "GitHub",
    } satisfies LocalizedText,
    value: "github.com/bonsng",
    href: "https://github.com/bonsng",
  },
];
