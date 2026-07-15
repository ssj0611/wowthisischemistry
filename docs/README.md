# docs — 에이전트용 프로젝트 문서

이 디렉터리는 Cursor/코딩 에이전트가 **프로젝트 목적·경계·설계 원칙**을 빠르게 파악하도록 정리한 문서입니다.

## 읽는 순서 (권장)

| 순서 | 문서 | 용도 |
|------|------|------|
| 1 | [00-overview.md](./00-overview.md) | 무엇을 만드는지, 무엇을 하지 않는지 |
| 2 | [01-architecture.md](./01-architecture.md) | xTB → JSON → 에이전트 → 보고서 흐름 |
| 3 | [02-pipeline-and-mcp.md](./02-pipeline-and-mcp.md) | 계산·파싱·MCP 도구 계약 |
| 4 | [03-multi-agents.md](./03-multi-agents.md) | 에이전트 역할·추천 상태·제외 규칙 |
| 5 | [04-case-microplastics.md](./04-case-microplastics.md) | 사례 적용(풍화 미세플라스틱 필터) |
| 6 | [05-web-promo.md](./05-web-promo.md) | 홍보 웹페이지(Next.js) 범위 |
| — | [sources/xtb-소감문.md](./sources/xtb-소감문.md) | 원본 PDF 전문 마크다운 |

## 원본 자료

- PDF: 사용자 Downloads의 `xtb.pdf` (대덕고 2026 크로스오버 AI 소감문)
- 변환본: `docs/sources/xtb-소감문.md`

## 현재 저장소 상태

- **프론트:** Next.js 16 + React 19 + Tailwind 4 (`app/`)
- **계산/에이전트 백엔드:** 소감문상 Python + xTB + MCP 설계가 핵심이나, 이 저장소에는 아직 골격(웹)만 있을 수 있음 → 구현 시 아래 문서를 **단일 진실 소스(SSOT)** 로 따른다.
