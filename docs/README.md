# Bonsng Portfolio
>포트폴리오 작업을 하면서 생긴 문제들 정리

## 3D Asset Optimization

### GLB Model (bumpy_sphere.glb)

`gltf-transform`을 사용하여 텍스처 압축 및 메시 최적화를 적용했다.

| 항목          | 원본      | 최적화 후         |
| ------------- | --------- | ----------------- |
| 텍스처 포맷   | PNG       | WebP              |
| 텍스처 해상도 | 1024x1024 | 1024x1024 (유지)  |
| 파일 크기     | 721 KB    | 141 KB (**-80%**) |

주요 병목이 텍스처(전체의 83%)였기 때문에 Draco(mesh 압축)보다 텍스처 WebP 변환이 훨씬 효과적이었다.

```bash
npx @gltf-transform/cli optimize input.glb output.glb --texture-compress webp
```

### HDRI Environment Map

drei `Environment` 컴포넌트의 `preset="studio"`는 외부 CDN(`raw.githack.com`)에서 HDR 파일을 다운로드한다. 이를 로컬로 가져와 자체 CDN(Vercel)에서 서빙하도록 변경했다.

| 항목 | 변경 전                           | 변경 후                                     |
| ---- | --------------------------------- | ------------------------------------------- |
| 소스 | `raw.githack.com` (외부 CDN)      | `/hdri/studio_small_03_1k.hdr` (Vercel CDN) |
| 파일 | `studio_small_03_1k.hdr` (1.7 MB) | 동일 파일                                   |

외부 DNS 조회와 느린 CDN 응답을 제거하여 HDRI 로딩 속도를 개선했다.

### Canvas Loading UX

3D 에셋(GLB + HDRI) 로딩 중 사용자 경험을 위해 로딩 인디케이터를 추가했다.

- `useProgress` (drei)로 로딩 진행률 감지
- Glass-morphism 스타일의 blur 오버레이 + SVG 프로그레스 링
- 로딩 완료 시 blur-to-clear fade-out 트랜지션
