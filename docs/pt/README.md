# 🕰️ Laima

[![npm version](https://badge.fury.io/js/laima.svg)](https://www.npmjs.com/package/laima)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

[🇺🇸 English](../../README.md) · **🇧🇷 Português** · [🇷🇺 Русский](../ru/README.md) · [🇮🇳 हिन्दी](../hi/README.md) · [🇨🇳 中文](../zh/README.md) · [🇪🇸 Español](../es/README.md)

Biblioteca TypeScript/JavaScript para converter, comparar, manipular e formatar datas, sem dependências em runtime. A CLI opcional usa o mesmo pacote npm.

## Instalação e uso

```sh
npm install laima
```

```ts
import Laima from 'laima';

const laima = new Laima();
const date = laima.parseISODate('2024-02-29');
console.log(laima.formatDate(date, 'DD/MM/YYYY')); // 29/02/2024
console.log(laima.addDays(date, 1)); // novo Date, sem alterar date
```

```js
// CommonJS: o export default existente é preservado.
const Laima = require('laima').default;
const laima = new Laima();
console.log(laima.format());
```

[Referência completa da API em português](API.md) · [Referência da API em inglês](../en/API.md)

## Utilitários de data e hora

A API tipada inclui cálculo de calendário e tempo decorrido, meses/anos com ajuste ao último dia válido, limites de períodos, diferenças com sinal, intervalos inclusivos, semanas ISO, metadados, idade, dias úteis de segunda a sexta, segundos Unix, componentes de duração e formatação em fusos IANA. Métodos novos validam entradas e não alteram as datas recebidas. Veja a [API adicional e os contratos de tipos](API.md#api-adicional).

```ts
const date = new Date('2024-01-31T12:00:00Z');
laima.add(date, 1, 'month', { utc: true }); // 2024-02-29T12:00:00.000Z
laima.getISOWeek(date, { utc: true });
laima.getDurationParts(-1500);
```

## Terminal (opcional)

Com Node.js e npm instalados, a CLI funciona em Linux, macOS e Windows. O CI verifica Node.js 22 e 24 nesses sistemas.

```sh
npx laima --help
npx laima format 2024-02-29T12:00:00Z "DD/MM/YYYY HH:mm" --utc
npx laima add-days 2024-02-28 1
npx laima diff 2024-01-01 2024-01-10
npx laima date 0
```

Para usar `laima` diretamente:

```sh
npm install --global laima
laima --help
```

Datas sem horário (`YYYY-MM-DD`) usam meia-noite **local**. Timestamps devem incluir `Z` ou um offset (`±HH:mm`). `format` usa o fuso local por padrão; `--utc` usa UTC. Resultados de `date` e `add-days` são timestamps ISO em UTC. Erros vão para stderr, com código de saída 1; resultados vão para stdout, com código 0. Consulte a [referência dos comandos](API.md#cli).

## Compatibilidade

A API existente permanece disponível. Diferenças de dias são absolutas e arredondadas em períodos de 24 horas; não indicam se um prazo venceu. Operações de calendário usam o fuso local e podem atravessar mudanças de horário de verão.

- `format(pattern?)` mantém o algoritmo legado. Use `formatDate(date, pattern?, options?)` para tokens repetidos, textos entre colchetes e UTC.
- `parseDateFromDB` continua lendo `DD-MM-YYYY`, com normalização permissiva de `Date`; `formatDateForDB` produz `YYYY-MM-DD`. Use `parseISODate` para ler esse último formato estritamente.
- Meses continuam com o overflow nativo de `Date`: 31 de janeiro + 1 mês pode cair em março. `addMonths` retorna meia-noite; `subMonths` preserva o horário.
- Os logs de depuração foram removidos. Métodos antigos continuam com seu tratamento existente de datas inválidas; os novos métodos estritos lançam `RangeError`.

## Organização

```text
src/
  laima.ts           # fachada da API pública
  types.ts           # tipos compartilhados
  core/              # operações de datas por responsabilidade
  cli.ts             # entrada do executável
  cli/               # comandos, parsing e ajuda
tests/
  unit/              # comportamento dos módulos e CLI
  compatibility/     # contratos e peculiaridades legados
  integration/       # instalação e uso do pacote npm
config/              # Jest, commitlint e TypeScript dos testes
scripts/             # limpeza de build e hooks de desenvolvimento
docs/                # documentação por idioma
dist/                # saída gerada pelo build
```

Veja a [arquitetura](ARCHITECTURE.md) para entender as responsabilidades e onde fazer cada alteração.

## Desenvolvimento e contribuições

Use Node.js 22 ou 24 e npm:

```sh
npm ci
npm run check
```

`check` executa lint, Prettier, verificação de tipos, testes com cobertura e validação do pacote instalado em um consumidor temporário. [CONTRIBUTING.md](../../CONTRIBUTING.md) explica os hooks, Conventional Commits, testes de fuso, tradução e publicação.

A configuração do CodeRabbit está em [.coderabbit.yaml](../../.coderabbit.yaml). Um mantenedor precisa instalar/autorizar o app CodeRabbit para este repositório no GitHub; o arquivo sozinho não ativa o serviço. Veja a [documentação oficial](https://docs.coderabbit.ai/reference/configuration).

## Nome, autor e licença

Laima é inspirada na deusa báltica do destino e do tempo. Criada por [Rodrigo Rangel](https://github.com/Hangell) · [hangell.org](https://hangell.org). Licença [MIT](../../LICENSE).

Apoio: PIX `rodrigo@hangell.org` · Crypto/NFT `0xEd4d1be72F807Faa358C966a8eF63367c200130F`.
