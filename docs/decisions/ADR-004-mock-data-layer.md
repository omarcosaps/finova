# ADR-004 — Camada de dados mock em `lib/`

**Status:** Aceito

## Contexto

O Finova está em fase de construção de interface e ainda não tem backend, API ou autenticação. Mesmo assim, as telas precisam de dados realistas, tipos e validação para desenvolver e demonstrar os fluxos.

## Decisão

Centralizar dados, tipos, validação e factories em arquivos `lib/*-mock.ts`, um por domínio:

- [transacoes-mock.ts](../../lib/transacoes-mock.ts)
- [cartoes-mock.ts](../../lib/cartoes-mock.ts)
- [resumo-mock.ts](../../lib/resumo-mock.ts)
- [configuracoes-mock.ts](../../lib/configuracoes-mock.ts)

Cada arquivo exporta tipos (PascalCase), constantes de dados e funções puras (validação, formatação, criação de registros). Valores monetários são mantidos em **centavos** e formatados na exibição por [currency.ts](../../lib/currency.ts).

## Consequências

- A UI é desenvolvida sem depender de backend; os drawers validam e criam registros contra a camada mock.
- Tipos e validação já ficam prontos para migrar quando houver API real — a substituição tende a ocorrer nesses módulos, preservando a interface.
- Não há persistência: os dados são efêmeros (estado React) e ações como salvar fazem `console.log`. Veja [state-management.md](../state-management.md).
- A evolução para uma camada de dados remota está registrada em [roadmap.md](../roadmap.md).
