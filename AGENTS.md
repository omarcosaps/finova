<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Finova - Engineering Rules

## Sobre o projeto

Finova é um sistema financeiro construído com:

- Next.js
- React
- TypeScript
- Design System próprio
- Styleguide interno

---

# Mandatory Workflow

Antes de qualquer implementação:

1. Ler a codebase.
2. Identificar componentes existentes.
3. Identificar tokens existentes.
4. Consultar o Styleguide.
5. Avaliar impactos em funcionalidades relacionadas.

Nunca assumir que um componente não existe sem procurar.

---

# Design System First

Antes de criar qualquer UI:

Consultar:

- components/ui
- Styleguide
- Componentes existentes
- Tokens existentes

Ordem obrigatória:

Styleguide → Componentes → Implementação

---

# Component Reuse

Antes de criar qualquer componente:

Perguntar:

"Este componente já existe?"

Se existir:

- reutilizar
- compor
- estender

Evitar duplicação.

---

# UI Rules

Toda interface deve:

- Utilizar tokens existentes.
- Utilizar componentes existentes.
- Respeitar spacing do sistema.
- Respeitar tipografia do sistema.
- Respeitar cores semânticas do sistema.

Evitar:

- Hardcoded values
- CSS duplicado
- Componentes redundantes

---

# Design Review

Sempre validar:

- Espaçamento
- Alinhamento
- Hierarquia visual
- Estados dos componentes
- Responsividade

Objetivo:

Pixel-perfect.

---

# Bug Fix Workflow

Ao corrigir bugs:

1. Encontrar causa raiz.
2. Explicar causa raiz.
3. Propor estratégia.
4. Implementar correção.

Não criar workarounds.

---

# Required Response Format

Antes de alterar código apresentar:

## Diagnóstico

...

## Estratégia

...

## Arquivos impactados

...

## Possíveis regressões

...

Somente depois implementar.

---

# Accessibility

Validar:

- Contraste
- Focus states
- Navegação por teclado
- Screen readers

---

# Performance

Avaliar:

- Re-renders
- Bundle impact
- Lazy loading
- Component composition

Evitar overengineering.

---

# Prioridades

1. Reutilização
2. Consistência
3. Escalabilidade
4. Performance
5. Acessibilidade

Design System é a fonte de verdade.