import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SettingsProvider, useSettings } from "../settings-context";
import type { ReactNode } from "react";

// --- Mocks ---

const mockRefresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
}));

// --- Helpers ---

function wrapper({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider initialTheme="light" initialLanguage="ko">
      {children}
    </SettingsProvider>
  );
}

// --- Tests ---

describe("useSettings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.cookie = "bonsng-language=; max-age=0";
    localStorage.clear();
  });

  it("Provider 없이 호출하면 에러 발생", () => {
    expect(() => {
      renderHook(() => useSettings());
    }).toThrow("useSettings must be used within SettingsProvider");
  });

  it("초기 language 값을 반환한다", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });
    expect(result.current.language).toBe("ko");
  });

  it("setLanguage 호출 시 쿠키가 동기적으로 설정된다", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => {
      result.current.setLanguage("en");
    });

    expect(document.cookie).toContain("bonsng-language=en");
  });

  it("setLanguage 호출 시 router.refresh()가 호출된다", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => {
      result.current.setLanguage("en");
    });

    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("쿠키가 router.refresh() 보다 먼저 설정된다", () => {
    // refresh() 호출 시점에 쿠키가 이미 설정되어 있는지 검증
    let cookieAtRefreshTime = "";
    mockRefresh.mockImplementation(() => {
      cookieAtRefreshTime = document.cookie;
    });

    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => {
      result.current.setLanguage("en");
    });

    expect(cookieAtRefreshTime).toContain("bonsng-language=en");
  });

  it("setLanguage 호출 시 localStorage도 업데이트된다", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => {
      result.current.setLanguage("en");
    });

    expect(localStorage.getItem("bonsng-language")).toBe("en");
  });
});
