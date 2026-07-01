# Gerenciamento de estado

O Finova ainda **não tem um padrão global consolidado** de estado. Não há Zustand, Redux, Jotai nem TanStack Query no projeto (Redux aparece apenas como dependência transitiva de `recharts`, sem uso no app). Este documento descreve o estado atual.

## Estado local

A abordagem dominante é estado local com hooks de React (`useState`, `useCallback`, `useEffect`) dentro das views e dos drawers. Exemplos:

- **Transações:** a lista fica em estado local; o drawer adiciona itens via callback.

```168:174:app/transacoes/transacoes-view.tsx
        <NovaTransacaoDrawer
          open={novaTransacaoOpen}
          onOpenChange={setNovaTransacaoOpen}
          onSubmit={(transaction) => {
            setTransactions((prev) => [transaction, ...prev])
            setPage(0)
          }}
        />
```

- **Drawers:** o estado `open` é controlado pelo pai; o formulário mantém estado interno e é resetado ao fechar. Veja [ADR-002](decisions/ADR-002-drawer-pattern.md).
- **Configurações:** múltiplos `useState` (perfil, empresa, notificações, tema); Salvar faz `console.log`, sem persistência.

## Context API

O uso de Context é mínimo e restrito a primitivos de UI:

- `TooltipProvider` em [app-providers.tsx](../components/app-providers.tsx) (provider global).
- `SidebarContext` em [sidebar.tsx](../components/ui/sidebar.tsx) (variante da sidebar).
- `ChartContext` em [chart.tsx](../components/ui/chart.tsx) (config do gráfico).

## Camada de dados (mock)

Os dados de domínio, sua validação e as factories ficam em [`lib/*-mock.ts`](../lib). O padrão é: tipos exportados + constantes + funções puras (validação, formatação, criação de registros). Valores monetários são mantidos em **centavos** e formatados na exibição por [currency.ts](../lib/currency.ts). Detalhes em [ADR-004](decisions/ADR-004-mock-data-layer.md).

## Estado de servidor

Não existe. Não há `fetch`, rotas `app/api/`, cache assíncrono ou integração remota. O `@tanstack/react-table` é usado apenas para o [Data Table](../components/ui/data-table.tsx) (ordenação/paginação em memória), não para estado de servidor.

## Lacunas observadas

Registradas aqui como fatos, sem prescrever solução — decisões de biblioteca ficam para [roadmap.md](roadmap.md) e futuros ADRs:

- O alias `@/hooks` está definido em [components.json](../components.json), mas a pasta `hooks/` não existe.
- Não há uma camada de estado global para dados compartilhados entre rotas (ex.: transações criadas no Resumo não persistem em Transações).
- A troca de tema não é global; cada tela lida com aparência de forma isolada.
