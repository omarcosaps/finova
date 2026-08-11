---
name: review
description: Review frontend changes in Finova against Design System, conventions, accessibility, and regression risk. Use when reviewing a PR, diff, or local changes, or when the user asks for code review / revisão.
---

# Review — Finova Frontend

Revisão focada em frontend. Não alterar código salvo pedido explícito para corrigir findings.

## Contexto a carregar

1. Diff ou arquivos mencionados pelo usuário
2. `.cursor/rules/` (workflow, Design System, convenções)
3. Componentes/tokens relacionados em `components/ui`, `components/finova`, `app/globals.css`
4. Styleguide se a mudança for de UI

## Checklist

### Design System

- [ ] Usa tokens e componentes existentes (sem hardcoded / CSS duplicado)
- [ ] Ordem Styleguide → Componentes → Implementação respeitada
- [ ] Novos primitivos têm showcase/navegação no styleguide quando aplicável

### Convenções

- [ ] Nomenclatura e organização (`*-view.tsx`, `finova-*`, drawers, mocks)
- [ ] `page.tsx` Server / views Client corretos
- [ ] pt-BR, moeda via `lib/currency.ts`, datas com locale adequado

### Qualidade

- [ ] Sem duplicação evitável; composição em vez de novos componentes genéricos
- [ ] Acessibilidade: contraste, focus, teclado, labels
- [ ] Performance: re-renders desnecessários, bundle, overengineering
- [ ] Regressões em rotas/features relacionadas

### Escopo

- [ ] Apenas frontend (sem backend não solicitado)
- [ ] Mudança proporcional ao pedido

## Formato do relatório

```markdown
## Resumo
1–2 frases com o veredito.

## Findings
### Blocking
- ...

### Should fix
- ...

### Nice to have
- ...

## O que está bem
- ...
```

Severidade:

- **Blocking** — quebra DS, acessibilidade grave, regressão clara, ou viola convenção estrutural
- **Should fix** — inconsistência relevante ou risco médio
- **Nice to have** — polish opcional
