# 메인페이지 개편 구현 계획

> hero-plan.md 기반 상세 구현 계획

## 현재 상태 분석

### 메인페이지 (`app/page.tsx`)
- 좌: 텍스트 영역 (이름, 소개, CTA 버튼) / 우: 3D 캔버스 영역 (glass-panel 안)
- `HeroCanvas` 컴포넌트가 R3F Canvas를 렌더링
- `CenterShape`: TorusKnot + MeshDistortMaterial (오렌지색, 회전 애니메이션)
- `OrbitingDot`: 정적 icosahedron 2개
- Sparkles, OrbitControls (autoRotate) 적용

### 프로젝트 페이지 (`app/projects/page.tsx`)
- `ProjectCard` 컴포넌트로 카드 + 상세 모달 패턴 이미 구현
- `portfolio.ts`에 프로젝트 데이터 5개 정의 (moong, 3Drive, RoomOf, Bonsng Ver2, Ver1)

---

## Phase 1: 메인페이지 3D 캔버스 개편

### 1-1. 대표 3D 모델 교체
- **현재**: TorusKnot (CenterShape)
- **변경**: 나를 대표하는 3D 모델로 교체
  - 선택지 A: GLTF/GLB 모델 로드 (`@react-three/drei`의 `useGLTF`)
  - 선택지 B: 프로그래매틱 지오메트리 조합 (현재 방식 유지하되 형태 변경)
- **결정 필요**: 어떤 3D 모델을 사용할지 (예: 로고, 캐릭터, 추상 오브젝트 등)

### 1-2. 스핀 애니메이션 적용
- `CenterShape`의 `useFrame` 로직은 이미 회전 애니메이션이 있음
- 새 모델에도 동일한 패턴으로 Y축 기준 스핀 애니메이션 적용
- `autoRotate`와 겹치지 않도록 OrbitControls 조정 필요

### 1-3. 캔버스 클릭 → 3D Explore 페이지 이동
- 캔버스 영역(glass-panel)에 클릭 이벤트 추가
- `useRouter().push('/explore')` 또는 `<Link>` 래핑
- 클릭 가능함을 시각적으로 표현 (hover 시 커서 변경, 미묘한 스케일업 등)
- OrbitControls의 드래그/줌과 클릭을 구분해야 함
  - 방법: `pointerDown` → `pointerUp` 사이 이동 거리가 임계값 이하일 때만 클릭으로 처리

### 파일 변경 목록
- `app/components/center-shape.tsx` — 모델 교체 또는 새 컴포넌트로 대체
- `app/components/hero-canvas.tsx` — OrbitControls 설정 조정
- `app/page.tsx` — 캔버스 영역에 클릭 네비게이션 추가

---

## Phase 2: 3D Explore 페이지 구축

### 2-1. 페이지 & 라우트 생성
- `app/explore/page.tsx` 생성
- `"use client"` 클라이언트 컴포넌트
- `PageShell fullBleed` 사용하여 전체 화면 3D 공간

### 2-2. 3D 씬 구성 — ExploreCanvas 컴포넌트
- `app/components/explore-canvas.tsx` 생성
- R3F Canvas 전체 화면 렌더링

#### 중앙 대표 모델
- Phase 1에서 만든 대표 모델 재사용
- 씬 원점(0, 0, 0)에 배치
- 스핀 애니메이션 유지

#### 프로젝트 3D 모델 배치
- `portfolio.ts`의 `projects` 배열 기반
- 중앙 모델 주변으로 원형/구형 배치 알고리즘
  - 프로젝트 5개 → 72도 간격 원형 배치 (반지름 ~4-5 유닛)
  - 또는 3D 공간에서 구면 좌표 배치
- 각 프로젝트 노드 구성:
  - 3D 오브젝트 (구/박스 등 프로젝트별 차별화 또는 통일)
  - 프로젝트 이름 라벨 (`@react-three/drei`의 `Html` 또는 `Text`)
  - hover 시 하이라이트 효과
- **결정 필요**: 프로젝트별 고유 3D 모델 vs 통일된 형태에 색상/텍스트로 구분

### 2-3. 프로젝트 클릭 인터랙션
- 선택지 A: 클릭 → 모달 (현재 `ProjectCard` 모달 재사용)
- 선택지 B: 클릭 → 카메라가 해당 프로젝트로 이동 후 상세 패널 표시
- **권장**: 선택지 A — 기존 모달 로직을 분리하여 재사용
  - `ProjectCard`에서 모달 부분을 `ProjectModal` 컴포넌트로 분리
  - Explore 페이지에서도 동일한 `ProjectModal` 사용

### 2-4. 카메라 & 컨트롤
- OrbitControls로 자유 시점 탐색
- 초기 카메라: 약간 위에서 비스듬히 내려다보는 시점 `[0, 3, 12]`
- 줌/팬 범위 제한

### 2-5. 라이팅 & 환경
- 메인페이지와 동일한 테마 대응 (dark/light)
- Sparkles 또는 Stars로 공간감 연출
- 중앙↔프로젝트 간 연결선 표현 (선택적)

### 파일 생성/변경 목록
- `app/explore/page.tsx` — 새 페이지
- `app/components/explore-canvas.tsx` — 3D 탐색 씬
- `app/components/project-node.tsx` — 프로젝트 3D 노드 컴포넌트
- `app/components/project-modal.tsx` — 기존 `project-card.tsx`에서 모달 분리
- `app/components/project-card.tsx` — 모달 로직 분리 후 리팩터
- `app/components/site-nav.tsx` — Explore 링크 추가 (선택적)

---

## Phase 3: 폴리시 & 전환 효과

### 3-1. 메인 → Explore 전환
- 메인페이지 캔버스 클릭 시 부드러운 전환 효과
- View Transition API 또는 Framer Motion `AnimatePresence` 활용

### 3-2. 반응형 대응
- 모바일: 3D 탐색이 터치로도 자연스럽게 동작하도록 OrbitControls 터치 설정
- 작은 화면에서 프로젝트 노드 라벨 가독성 확보

### 3-3. 성능 최적화
- `React.lazy` + `Suspense`로 Explore 페이지 3D 에셋 지연 로드
- 프로젝트 노드에 LOD(Level of Detail) 또는 거리 기반 조건부 렌더링 고려
- `dpr` 설정으로 디바이스별 해상도 조절

---

## 작업 순서 (권장)

| 순서 | 작업 | 예상 범위 |
|------|------|-----------|
| 1 | 대표 3D 모델 결정 & 제작/선정 | 디자인 결정 |
| 2 | Phase 1: 메인페이지 캔버스 개편 (모델 교체 + 클릭 이동) | 3~4 파일 |
| 3 | Phase 2-1~2-2: Explore 페이지 기본 구조 + 3D 씬 | 2~3 파일 신규 |
| 4 | Phase 2-3: 모달 분리 + 프로젝트 클릭 인터랙션 | 2~3 파일 리팩터 |
| 5 | Phase 2-4~2-5: 카메라/라이팅/환경 | 기존 파일 조정 |
| 6 | Phase 3: 전환 효과 + 반응형 + 성능 최적화 | 전반 |

---

## 선결 사항 (결정 필요)

1. **대표 3D 모델**: GLTF 모델 파일을 준비할 것인지, 프로그래매틱 지오메트리로 만들 것인지
2. **프로젝트 3D 모델**: 각 프로젝트별 고유 모델 vs 통일 형태
3. **프로젝트 클릭 시 동작**: 모달 vs 카메라 이동 + 사이드 패널
4. **네비게이션**: Explore 페이지를 nav에 추가할 것인지 (메인 캔버스 클릭으로만 진입?)
