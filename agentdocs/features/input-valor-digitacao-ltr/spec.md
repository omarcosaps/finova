# Feature: Input de valor — digitação da esquerda para a direita

## Status

- [x] Draft
- [x] Review
- [x] Approved
- [x] In Progress
- [x] Complete

## Overview

O `CurrencyInput` usa máscara cent-based da direita para a esquerda (2 → 0,02 → 0,21). Esta feature inverte a ordem para digitação natural pt-BR: parte inteira primeiro, vírgula para os centavos (2 → 21 → 21,50). O contrato em centavos (`valueCents`) permanece.

## Goals

- Digitar valores monetários da esquerda para a direita, como se escreve.
- Permitir centavos via vírgula, com no máximo 2 casas.
- Manter a API `valueCents` / `onValueCentsChange` para não alterar os drawers.
- Reutilizar `CurrencyInput` em todos os campos de valor existentes.

## Non-Goals

- Showcase novo no styleguide.
- Biblioteca externa de máscara.
- Alterar formatação read-only (`formatBRL`).
- Backend ou persistência.
- Mudar validação dos mocks (“maior que zero”).

## User Stories

### Gestor financeiro

- Como gestor, quero digitar `21` e ver R$ 21, não R$ 0,21, para o campo corresponder à escrita habitual.
- Como gestor, quero usar a vírgula para entrar os centavos (`21,50`), para informar valores quebrados sem máscara de caixa eletrônico.

### Desenvolvedor / agente

- Como implementador, quero a lógica LTR em funções puras em `lib/currency.ts`, para o componente só despachar teclas e paste.

## Requirements

### Functional Requirements

1. **[FR-1]** Dígitos MUST entrar da esquerda para a direita na parte inteira (`2` → `21` → `2100` centavos).
2. **[FR-2]** Vírgula (e ponto do teclado) MUST iniciar os centavos. MUST haver no máximo 1 separador e 2 casas decimais.
3. **[FR-3]** `0,21` MUST ser possível (zero + vírgula + dígitos).
4. **[FR-4]** Backspace MUST apagar o último caractere lógico (dígito ou vírgula), não dividir centavos por 10.
5. **[FR-5]** No blur, o valor MUST normalizar para 2 casas (`21,5` → `21,50`). Campo com 0 centavos MUST ficar vazio (placeholder).
6. **[FR-6]** Fora de foco / valor carregado (edição) MUST usar `formatCentsForInput` (ex.: `1.234,56`).
7. **[FR-7]** Paste MUST interpretar `"21"` como R$ 21,00 e `"21,50"` / `"1.234,56"` como decimal pt-BR — MUST NOT tratar a sequência de dígitos como centavos.
8. **[FR-8]** `inputMode` default MUST ser `decimal`.
9. **[FR-9]** Valores acima de `MAX_CENTS` (R$ 9.999.999.999,99) MUST ser rejeitados.
10. **[FR-10]** A API `valueCents` / `onValueCentsChange` MUST permanecer. Drawers MUST NOT precisar de mudança de contrato.

### Non-Functional Requirements

1. **[NFR-1]** UI MUST continuar usando `InputGroup` + prefixo `R$` e tokens existentes.
2. **[NFR-2]** Lógica de máscara MUST viver em `lib/currency.ts` (funções puras).
3. **[NFR-3]** Frontend only.

## Edge Cases

| ID | Cenário | Comportamento esperado |
|----|---------|------------------------|
| EC-1 | Campo vazio | Placeholder `0,00`; `valueCents = 0` |
| EC-2 | Vírgula no campo vazio | Exibe `0,` |
| EC-3 | Terceiro dígito decimal | Ignorado |
| EC-4 | Segunda vírgula / ponto | Ignorado |
| EC-5 | Backspace em `21,50` | `21,5` → `21,` → `21` → `2` → vazio |
| EC-6 | Paste `21` | R$ 21,00 (2100 centavos), não `0,21` |
| EC-7 | Abrir edição com valor existente | Mostra `formatCentsForInput` (2 casas + milhar) |
| EC-8 | Overflow `MAX_CENTS` | Dígito extra ignorado |
| EC-9 | Blur em `0` ou `0,` | Campo vazio |

## Acceptance Criteria

- [x] Digitar `2`, `1` exibe `21` (não `0,21`).
- [x] Digitar `21` + `,` + `50` exibe `21,50`.
- [x] Digitar `0,21` resulta em 21 centavos.
- [x] Backspace em `21,50` percorre `21,5` → `21,` → `21`.
- [x] Blur em `21,5` exibe `21,50`.
- [x] Colar `21` vira R$ 21,00.
- [x] Nova transação, editar transação, alertas (valor mínimo) e limite do cartão usam o mesmo comportamento.
- [x] Abrir o drawer de edição mostra o valor já salvo formatado.

## Dependencies

- [`components/ui/currency-input.tsx`](../../../components/ui/currency-input.tsx)
- [`lib/currency.ts`](../../../lib/currency.ts)
- Drawers que já usam `CurrencyInput`

## Open Questions

- [x] Modelo de digitação: natural com vírgula (acordado).

## References

- [plan.md](plan.md)
- [notes/research-estado-atual.md](notes/research-estado-atual.md)
