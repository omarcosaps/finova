# Documentação técnica do Finova

Esta pasta reúne a documentação técnica do Finova. Ela complementa — e não substitui — duas fontes de verdade que já existem no projeto:

- [`AGENTS.md`](../AGENTS.md) — regras de engenharia e princípios do Design System.
- [`/styleguide`](../app/styleguide) — documentação viva de tokens e componentes, renderizada em runtime.

O objetivo é registrar o estado atual do projeto, as decisões de arquitetura e produto, e servir de referência para novas implementações (humanas ou por agentes de IA).

## Índice

| Documento | Escopo |
|-----------|--------|
| [architecture.md](architecture.md) | Arquitetura geral, stack, camadas e responsabilidades |
| [project-structure.md](project-structure.md) | Explicação de cada diretório do repositório |
| [design-system.md](design-system.md) | Tokens, cores, tipografia, spacing, radius, sombras e princípios |
| [components.md](components.md) | Inventário de componentes reutilizáveis |
| [routing.md](routing.md) | Rotas de produto e de styleguide |
| [modules.md](modules.md) | Módulos de produto: objetivo, telas, componentes e status |
| [state-management.md](state-management.md) | Como o estado é gerenciado hoje |
| [conventions.md](conventions.md) | Nomenclatura, branches, commits e organização |
| [roadmap.md](roadmap.md) | Funcionalidades concluídas, em andamento e planejadas |
| [changelog.md](changelog.md) | Principais evoluções do projeto |
| [decisions/](decisions) | Architecture Decision Records (ADRs) |

## Princípios desta documentação

1. **Baseada na codebase.** Cada afirmação é rastreável a um arquivo, rota ou componente real. Nada é inventado.
2. **Sem duplicação.** Cada documento tem um escopo próprio; valores detalhados (como tokens) apontam para a fonte de verdade em vez de serem copiados.
3. **Links cruzados.** Documentos se referenciam entre si e apontam para os arquivos de origem.
4. **Evolutiva.** A documentação deve ser atualizada junto com as mudanças de código que a afetam. Ao abrir um PR que altere arquitetura, componentes, rotas ou padrões, atualize o documento correspondente.
