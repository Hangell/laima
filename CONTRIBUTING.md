# Contribuindo / Contributing

[Português](#português) · [English](#english)

## Português

A participação segue o [Código de Conduta](CODE_OF_CONDUCT.md). Relate vulnerabilidades de forma privada conforme a [Política de Segurança](SECURITY.md), antes de abrir issues ou PRs públicos com detalhes sensíveis.

### Preparação

Use Node.js 22 ou 24 e npm. Faça um fork, clone-o e crie uma branch para a mudança.

```sh
npm ci
npm run check
```

O `prepare` instala hooks Husky em um checkout Git de desenvolvimento. O pre-commit executa ESLint e Prettier nos arquivos preparados; o commit-msg valida Conventional Commits. `HUSKY=0` desativa hooks em CI; eles não são necessários para consumidores do pacote. A integração usa as [instruções oficiais do Husky](https://typicode.github.io/husky/how-to.html).

### Comandos

| Comando                           | Uso                                                               |
| --------------------------------- | ----------------------------------------------------------------- |
| `npm test`                        | Testes determinísticos de biblioteca e CLI                        |
| `npm run test:watch`              | Testes durante desenvolvimento                                    |
| `npm run test:coverage`           | Cobertura mínima de 90% em branches, funções, linhas e statements |
| `npm run lint` / `lint:fix`       | ESLint para TypeScript e scripts                                  |
| `npm run format` / `format:check` | Prettier para código e documentação                               |
| `npm run typecheck`               | Tipos de biblioteca, CLI e testes                                 |
| `npm run test:package`            | Build, tarball e consumidor real CommonJS/TypeScript/CLI          |
| `npm run check`                   | Todas as verificações necessárias                                 |
| `npm run commit`                  | Assistente de commit existente (`git-cz`)                         |

### Organização e arquitetura

A [arquitetura](docs/pt/ARCHITECTURE.md) descreve a fachada pública, os módulos de datas e o adaptador da CLI. Código vai em `src/`; testes normais em `tests/unit/`, contratos legados em `tests/compatibility/` e verificação do pacote em `tests/integration/`. Configurações específicas ficam em `config/`; arquivos de descoberta automática (ESLint, Prettier e TypeScript principal) ficam na raiz. O build limpa `dist/` e o recria a partir de `src/`.

### Compatibilidade e testes

Preserve `require('laima').default`, o default import TypeScript, nomes, argumentos e retornos públicos. Registre bugs e peculiaridades antigos em testes antes de mudar a implementação. Prefira novos métodos/opções para mudanças semânticas; quebras exigem major version e guia de migração. Não adicione dependências runtime sem justificar seu custo.

Não altere silenciosamente o parsing legado, overflow de meses, arredondamento absoluto ou comportamento de horário. Teste datas inválidas, anos bissextos, viradas de mês/ano, imutabilidade, tokens, fuso local/UTC e horário de verão. Testes com relógio simulado devem restaurá-lo. CI executa a suíte em UTC, America/Sao_Paulo e America/New_York em Linux, Windows e macOS com Node.js 22/24.

Na máquina local, repita testes em outros fusos quando a mudança depender de calendário. POSIX: `TZ=America/New_York npm test`. PowerShell: `$env:TZ='America/New_York'; npm test`. Use `npm run test:package` para validar alterações no empacotamento e CLI.

### Commits e PRs

Use `tipo(escopo opcional): descrição`, por exemplo `feat(cli): add UTC formatting` ou `fix(parser): reject invalid ISO dates`. Tipos: `feat`, `fix`, `docs`, `test`, `refactor`, `perf`, `build`, `ci`, `chore`, `style`, `revert`. Use `!` e um rodapé `BREAKING CHANGE:` para quebras. `feat` normalmente exige minor; `fix` exige patch. Escolha uma mensagem que passe o commitlint, inclusive quando usar `npm run commit`.

Abra um PR explicando o problema, resultado e validação. Atualize [CHANGELOG](CHANGELOG.md) e o [README principal em inglês](README.md), as traduções (`pt`, `ru`, `hi`, `zh`, `es`) e as referências de API afetadas. Traduções devem manter a mesma estrutura, assinaturas e exemplos. Novos idiomas vão em `docs/<locale>/` e devem ser vinculados nos READMEs.

O CI valida commits do PR. CodeRabbit usa [.coderabbit.yaml](.coderabbit.yaml); um mantenedor deve instalar/autorizar o app no GitHub. Configurar o arquivo não instala o app. O mantenedor pode configurar branch protection para exigir os checks de CI.

### Publicação (mantenedores)

Escolha a versão SemVer após revisão, atualize versão e lockfile (`npm version minor --no-git-tag-version`, por exemplo), finalize o changelog e execute `npm run check`. Revise `npm pack --dry-run`. Commit e tag `v<versão>` devem apontar para o código revisado. Uma release publicada no GitHub dispara publicação npm pelo workflow, que confere a tag e exige o secret `KEY_LAIMA` válido para publicação. Não use uma versão já publicada. Releases estáveis usam a dist-tag `latest`; pré-releases marcadas no GitHub usam `next`.

`prepack` gera o build; `prepublishOnly` executa todas as verificações. Publique sempre da raiz do repositório. Não copie `package.json` para `dist`. Mudanças comuns em `main` executam CI, sem publicação automática. Não faça commit dos builds gerados; `dist/` é ignorado pelo Git e recriado pelo build.

## English

Participation follows the [Code of Conduct](CODE_OF_CONDUCT.md). Report vulnerabilities privately according to the [Security Policy](SECURITY.md) before opening public issues or PRs with sensitive details.

### Setup and checks

Use Node.js 22 or 24 and npm. Fork and clone the repository, create a branch, run `npm ci`, then `npm run check`. Husky installs development hooks in Git checkouts: pre-commit runs lint-staged (ESLint/Prettier), and commit-msg runs commitlint. Hooks are skipped in CI or with `HUSKY=0` and are unnecessary for package consumers.

Commands: `npm test`, `npm run test:watch`, `npm run test:coverage` (90% minimum for branches/functions/lines/statements), `npm run lint`, `npm run lint:fix`, `npm run format`, `npm run format:check`, `npm run typecheck`, `npm run test:package`, and `npm run check` for all required checks. `npm run commit` retains the existing git-cz assistant; ensure its output passes commitlint.

### Organization and architecture

The [architecture guide](docs/en/ARCHITECTURE.md) describes the public facade, date modules and CLI adapter. Source belongs in `src/`, normal tests in `tests/unit/`, legacy contracts in `tests/compatibility/`, and package checks in `tests/integration/`. Tool-specific configurations live in `config/`; auto-discovered configurations (ESLint, Prettier and the main TypeScript config) remain at the root. Builds clean `dist/` and regenerate it from `src/`.

### Compatibility and tests

Preserve the default export, `require('laima').default`, public method names, arguments and returns. Capture existing quirks in tests before implementation changes. Prefer additive methods/options for semantic improvements; breaking changes require a major version and migration guide. Justify any runtime dependency.

Do not silently change legacy parsing, month overflow, absolute rounding or time-of-day behavior. Test invalid dates, leap years, month/year boundaries, immutability, tokens, local/UTC behavior and DST. Restore mocked clocks. CI runs Node.js 22/24 on Linux, Windows and macOS in UTC, America/Sao_Paulo and America/New_York. Local POSIX: `TZ=America/New_York npm test`; PowerShell: `$env:TZ='America/New_York'; npm test`. Package tests install a tarball and check CommonJS, declarations and the npm CLI executable.

### Commits, PRs and translations

Use Conventional Commits: `type(optional-scope): description`, such as `feat(cli): add UTC formatting`. Types: feat, fix, docs, test, refactor, perf, build, ci, chore, style, revert. Use `!` and a `BREAKING CHANGE:` footer for breaking changes. Features generally require minor releases; fixes require patches. CI checks PR commits.

Describe the problem, resulting behavior and validation in the PR. Update CHANGELOG, the main English README, the translated READMEs (`pt`, `ru`, `hi`, `zh`, `es`) and affected API references together, preserving matching structure, signatures and examples. Add new languages under `docs/<locale>/` and link them from the READMEs.

CodeRabbit requires maintainer installation/authorization on GitHub; the YAML file alone does not install the app. Maintainers can require CI via branch protection.

### Releases (maintainers)

After review, choose a SemVer version, update package and lockfile (for example `npm version minor --no-git-tag-version`), finalize the changelog, run `npm run check`, and inspect `npm pack --dry-run`. Commit and tag the reviewed code as `v<version>`. A published GitHub release triggers npm publication, checks the tag and requires the valid `KEY_LAIMA` publishing secret. Never reuse a published version. Stable releases use the `latest` dist-tag; releases marked as prereleases on GitHub use `next`.

`prepack` builds; `prepublishOnly` runs all checks. Publish from the repository root; do not copy package.json into dist. Ordinary main pushes run CI without publishing. Do not commit generated builds; `dist/` is ignored by Git and regenerated by the build.
