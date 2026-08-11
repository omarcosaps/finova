---
name: fix-issue
description: Systematic bug-fix workflow for Finova frontend — root cause first, no workarounds. Use when fixing bugs, debugging UI/behavior issues, or when the user asks to corrigir / fix an issue.
---

# Fix Issue — Finova Frontend

Corrigir bugs com causa raiz. Frontend only salvo pedido explícito de backend.

## Workflow

### 1. Reproduzir e delimitar

- Entender o comportamento esperado vs atual
- Identificar rota, componente e estado envolvidos
- Verificar se há spec/progress em `agentdocs/features/` relacionado

### 2. Diagnosticar (antes de editar)

Apresentar:

## Diagnóstico

Causa raiz (não só sintomas).

## Estratégia

Correção mínima e correta (sem workaround).

## Arquivos impactados

Lista objetiva.

## Possíveis regressões

O que pode quebrar.

### 3. Implementar

Somente após o diagnóstico:

1. Ler codebase e componentes/tokens existentes
2. Aplicar a correção na causa raiz
3. Reutilizar Design System — não inventar UI paralela
4. Validar estados (loading, empty, error, focus) se a UI estiver envolvida

### 4. Verificar

- [ ] Bug não reproduz mais no fluxo descrito
- [ ] Sem regressão óbvia em features relacionadas
- [ ] Acessibilidade e tokens preservados
- [ ] Escopo limitado ao necessário

### 5. Encerrar

Resumir causa raiz, o que mudou e como validar manualmente.

Se a correção veio de uma feature em `agentdocs/`, atualizar `progress/session-NNN.md` quando fizer sentido no fluxo SDD.

## Anti-padrões

- Patch sintomático que mascara o bug
- Duplicar componente “só para este caso”
- Hardcoded de spacing/cores
- Ampliar escopo para refactors não pedidos
