# Arquitetura

[README](README.md) · [English](../en/ARCHITECTURE.md)

A Laima usa uma fachada pública e módulos organizados por responsabilidade. O objetivo é permitir mudanças internas pequenas, mantendo os imports, os métodos e os comportamentos já utilizados por consumidores npm.

## Biblioteca

`src/laima.ts` implementa a fachada: a classe exportada continua oferecendo os mesmos métodos de instância, delegando suas operações a `src/core/`. O nome histórico da classe é preservado. `getDaysDifference` continua chamando `this.getDaysDifferenceBetweenEpochs`, respeitando sobrescritas em subclasses.

| Arquivo                  | Responsabilidade                                                  |
| ------------------------ | ----------------------------------------------------------------- |
| `src/core/time.ts`       | Epoch, conversões e diferenças de duração                         |
| `src/core/arithmetic.ts` | Adição e subtração de dias e meses                                |
| `src/core/comparison.ts` | Escolha da maior e menor data                                     |
| `src/core/calendar.ts`   | Limites de dia, meses e anos bissextos                            |
| `src/core/formatting.ts` | Formatação legada, DB, local e por tokens                         |
| `src/core/parsing.ts`    | Leitura legada de DB e parsing ISO estrito                        |
| `src/core/duration.ts`   | Componentes de duração decorrida com sinal                        |
| `src/core/validation.ts` | Validação estrita, unidades e campos de calendário compartilhados |
| `src/types.ts`           | Tipos compartilhados e reexportados pela fachada                  |

Os módulos não dependem da CLI nem do sistema de arquivos. A operação de tempo atual consulta o relógio do ambiente; as outras recebem seus dados como argumentos. Mantenha a normalização e o fuso dos métodos legados. Os módulos internos não constituem uma nova API pública suportada.

## CLI

`src/cli.ts` é o adaptador do terminal: lê a versão do pacote, recebe `process.argv`, conecta stdout/stderr e define o código de saída. A biblioteca não importa esse adaptador.

`src/cli/runner.ts` processa comandos, utilizando a fachada. Recebe argumentos, funções de saída e versão como parâmetros; pode ser testado sem encerrar o processo nem acessar arquivos. `commands.ts` despacha os comandos adicionais; `parsers.ts` valida datas, unidades e opções de calendário; `help.ts` contém a ajuda. O dispatcher mantém um `switch` explícito para os poucos comandos existentes.

Fluxo: **terminal → adaptador → runner → fachada → módulo de datas**.

## Testes e ferramentas

- `tests/unit/`: comportamento da biblioteca, novos utilitários e CLI.
- `tests/compatibility/`: normalização legada, identidade dos Dates, arredondamento, formatação e sobrescritas.
- `tests/integration/package.cjs`: empacota e instala um consumidor temporário, verificando imports, tipos e executável real.
- `config/`: Jest, commitlint e TypeScript dos testes.
- `scripts/`: limpeza do build e preparação dos hooks.

A cobertura unitária mede a fachada, os módulos e o runner. O adaptador `src/cli.ts` é validado executando o pacote instalado; `src/types.ts` é verificado pelo compilador e pelo consumidor TypeScript.

## Build e compatibilidade npm

`tsconfig.json` usa `src/` como raiz e gera a estrutura correspondente em `dist/`. A limpeza antes da compilação evita módulos antigos no tarball. O npm inclui a árvore de `dist/`, com JavaScript e declarações dos módulos necessários.

Continuam preservados: `main: dist/laima.js`, `types: dist/laima.d.ts`, executável `dist/cli.js`, default import TypeScript e `require('laima').default`. Não adicione dependências do Node aos módulos da biblioteca; somente a CLI deve acessar o terminal e arquivos.

## Onde alterar

Para ajustar uma operação, localize seu módulo em `src/core/` e mantenha a assinatura da fachada. Para adicionar uma API, implemente a operação, exponha um método pela fachada e atualize tipos, testes e as duas documentações. Para alterar um comando, use o runner ou os parsers e preserve o contrato stdout/stderr/código de saída. Valide tudo com `npm run check`.
