# Research: Drawer de edição não abre ao clicar na transação

**Date**: 2026-08-03
**Related spec**: [spec.md](../spec.md)

## Sintoma reportado

Ao clicar em uma linha da tabela em `/transacoes`, o drawer/modal de edição **não abre**.

## Estado do repositório analisado

| Contexto | Branch / commit | Integração presente? |
|----------|-----------------|----------------------|
| Workspace local (análise) | `fix/build-lint-preexisting-errors` @ `6fc4531` | **Não** |
| `origin/main` (pós PR #40) | merge `18188d6` | **Sim** |

PR #40 (`feat/modal-edicao-transacoes`) foi **merged** em `origin/main`, mas branches locais anteriores ao merge **não contêm** o código.

## Evidências — branch local sem integração

`app/transacoes/transacoes-view.tsx` (branch atual):

- Sem import de `EditarTransacaoDrawer`
- Sem estado `edicaoOpen` / `transacaoEmEdicao`
- Sem `handleEditTransaction`
- `TableRow` **sem** `onClick`, `onKeyDown` ou handlers de teclado
- Arquivo `components/finova/editar-transacao-drawer.tsx` **inexistente**

```tsx
// transacoes-view.tsx — linha estática, sem interação
<TableRow key={t.id}>
  <TableCell>...</TableCell>
</TableRow>
```

**Conclusão RC-1:** em ambientes que não incorporaram o merge da PR #40, o clique não tem efeito porque **a feature não está no código executado**.

## Evidências — código em `origin/main` (pós-merge)

Integração presente e aparentemente correta:

- `handleEditTransaction` define `transacaoEmEdicao` + `edicaoOpen`
- `TableRow` com `onClick={() => handleEditTransaction(t)}`
- `EditarTransacaoDrawer` renderizado com props controladas

### Risco RC-2: padrão de mount do Drawer

`EditarTransacaoDrawer` (main):

```tsx
if (!transaction) {
  return null
}
return <Drawer open={open} ...>
```

Comparar com `CartaoDrawer` e `NovaTransacaoDrawer`, que **sempre montam** o `Drawer`, mesmo sem entidade selecionada.

Desmontar o Root do Vaul quando `transaction === null` pode impedir abertura confiável em alguns ciclos de render (mount com `open={true}` no primeiro frame). Padrão recomendado: manter o Drawer montado e usar `open={open && !!transaction}`.

### Risco RC-3: erro em runtime no formulário

Se `Transaction` no estado local não tiver `sourceId`/`notes` (dados de sessão anterior ao merge), `getEdicaoFormValuesFromTransaction` pode falhar silenciosamente ou quebrar render. Após merge, `buildTransacoesList` inclui esses campos — **recarregar a página** resolve.

## Diagnóstico consolidado

| ID | Causa | Probabilidade | Como confirmar |
|----|-------|---------------|----------------|
| RC-1 | Branch local desatualizada (sem PR #40) | **Alta** | `git log --oneline \| grep modal-edicao` ou buscar `EditarTransacaoDrawer` no view |
| RC-2 | `return null` desmonta Vaul Root | Média | Reproduzir em `main` atualizado; inspecionar React DevTools |
| RC-3 | Estado React stale / campos mock ausentes | Baixa | Hard refresh; verificar console por erros |

## Ação imediata sugerida (antes de codar)

1. `git fetch origin && git checkout main && git pull`
2. Confirmar presença de `EditarTransacaoDrawer` e `onClick` na tabela
3. Reiniciar `npm run dev`
4. Testar clique e verificar console do browser

Se ainda falhar em `main` atualizado → implementar fix RC-2.
