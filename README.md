<h1 align="center">Bonseung Koo</h1>
<p align="center"><strong>Frontend Engineer</strong></p>
<p align="center">
  사용자에게 직관적이고 흥미로운 경험을 주는 인터랙티브 웹을 만듭니다.
</p>

<p align="center">
  <a href="https://github.com/bonsng">
    <img src="https://img.shields.io/badge/GitHub-bonsng-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
</p>

## Stack

| Category         | Technologies                                   |
| ---------------- | ---------------------------------------------- |
| Lang & Framework | JavaScript, TypeScript, React, Next.js, Python |
| Infra            | Vercel, AWS S3, GitHub Actions                 |
| Library          | Three.js, Tailwind CSS, Zustand, Framer Motion |
| Test             | Vitest, React Testing Library                  |
| AI               | OpenAI API, Claude Code CLI                    |

## Projects

| Project               | Description                      | Links                                                                                           |
| --------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| 뭉(moong)             | 반려견 전용 가계부 서비스        | [Live](https://moongmoong.site) · [GitHub](https://github.com/bonsng/WEB-Team5-Moong)           |
| 3Drive                | 3D 기반 클라우드 스토리지 서비스 | [Live](https://3-drive-mock.vercel.app/) · [GitHub](https://github.com/bonsng/3Drive-mock)      |
| RoomOf                | 가상 메모리얼 서비스             | [Live](https://room-of-rebuild.vercel.app/) · [GitHub](https://github.com/bonsng/RoomOfRebuild) |
| Bonsng Portfolio (V1) | 개인 포트폴리오                  | [Live](https://bonsng.vercel.app) · [GitHub](https://github.com/bonsng/bonsng-old)              |

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

## Contact

- Email: [john.k7795@gmail.com](mailto:john.k7795@gmail.com)
- GitHub: [github.com/bonsng](https://github.com/bonsng)
