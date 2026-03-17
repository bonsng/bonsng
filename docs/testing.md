# Testing Guide

## 프레임워크

- **Vitest** — Vite 기반 테스트 러너. Next.js 프로젝트에서 빠른 실행과 ESM 호환성 제공.
- **React Testing Library (RTL)** — 사용자 관점의 컴포넌트/훅 테스트.
- **@testing-library/jest-dom** — DOM assertion 매처 (`toBeInTheDocument` 등).

## 실행 방법

```bash
npm test           # 전체 테스트 1회 실행
npm run test:watch # 파일 변경 시 자동 재실행 (watch 모드)
```

## 테스트 파일 위치

- 컴포넌트 테스트: `app/components/__tests__/<name>.test.tsx`
- 동일 디렉토리의 `__tests__/` 폴더에 위치시킨다.

## Next.js 모듈 모킹

`next/navigation` 등 Next.js 전용 모듈은 `vi.mock()`으로 모킹한다.

```tsx
import { vi } from "vitest";

const mockRefresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
}));
```

## 테스트 작성 가이드라인

- 구현 디테일이 아닌 **동작(behavior)** 을 테스트한다.
- 훅 테스트 시 `renderHook`을 사용하고, Provider가 필요하면 `wrapper` 옵션으로 감싼다.
- 모킹은 최소한으로 — 외부 의존성(라우터, 쿠키 등)만 모킹한다.
