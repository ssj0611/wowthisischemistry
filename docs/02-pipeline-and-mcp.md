# 02 · 파이프라인 · MCP 도구 계약

## xTB 기본 조건

- 방법: **GFN2-xTB**
- 구조 최적화: 사용
- 입력: `.xyz`

## 파서 JSON에 포함해야 할 최소 필드

| 필드 | 용도 |
|------|------|
| `total_energy` | 상대 안정성 비교 |
| `max_positive_charge` / `max_negative_charge` | 정전기 상호작용 |
| `dipole_moment` | 극성 |
| `geometry_converged` | 결과 신뢰성 |
| `raw_log_path` | 감사·재현 |
| (권장) `candidate_id`, `role`, `charge`, `is_control` | 메타·대조군 처리 |

> 에이전트·보고서 구현 시 위 키를 바꾸려면 파서·스키마·문서·UI를 함께 갱신한다.

## MCP 도구

| 도구 | 역할 |
|------|------|
| `calculate_candidate` | 단일 `.xyz` → xTB → JSON |
| `calculate_candidate_batch` | 다수 후보 일괄 계산 |
| `generate_evidence_table` | 후보별 계산 결과 표 |
| `evaluate_candidates` | 규칙 기반 에이전트 평가 |
| `run_experiment_pipeline` | 입력→계산→평가→보고서 end-to-end |
| `generate_experiment_report` | 평가 결과 → 실험 설계 보고서 |

## 단계 분리 규칙

1. **계산**과 **해석**을 분리한다 (러너 ≠ 파서).
2. MCP는 “도구 계약”을 지키는 진입점이다. 핵심 판단은 규칙 평가에서 한다.
3. Gemini 등 LLM은 선택 의존성이다. **API 키 없이도** 계산·평가·기본 보고서는 동작해야 한다.

## 안티패턴

- xTB 원시 로그 전체를 프롬프트에 넣어 LLM이 수치를 읽게 하기
- LLM이 제시한 에너지/전하로 JSON을 덮어쓰기
- 파서 없이 UI에서 로그를 정규식으로 재파싱하기
