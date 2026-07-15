# wowthisischemistry

xTB 계산 화학 결과와 멀티에이전트 검증을 활용한 **실험 후보 물질 추천 시스템** 및 **홍보 웹페이지** 프로젝트입니다.

## 문서 (에이전트·기여자)

코딩 에이전트와 기여자는 구현 전 `docs/` 를 먼저 읽습니다.

| 문서 | 내용 |
|------|------|
| [docs/README.md](./docs/README.md) | 문서 인덱스 |
| [docs/00-overview.md](./docs/00-overview.md) | 목적·원칙 |
| [docs/sources/xtb-소감문.md](./docs/sources/xtb-소감문.md) | 활동 소감문 (PDF → Markdown) |

에이전트 진입점: [AGENTS.md](./AGENTS.md)

## Getting Started

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인합니다. 페이지는 `app/page.tsx` 에서 수정합니다.

## Stack

- Next.js 16 · React 19 · Tailwind CSS 4
- (설계) Python + xTB (GFN2-xTB) + MCP + 규칙 기반 멀티에이전트

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- 로컬 Next 가이드: `node_modules/next/dist/docs/` (이 버전의 breaking changes)
