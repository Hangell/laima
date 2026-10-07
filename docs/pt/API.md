# Referência da API

[README](README.md) · [English](../en/API.md)

Todos os métodos são de instância: `const laima = new Laima()`. Epoch sempre em milissegundos. Operações antigas usam o fuso local e a normalização do JavaScript, sem novas validações que alterem seu contrato.

| Método                                                                          | Comportamento                                                                                             |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `getEpochTime(): number`                                                        | Timestamp atual em milissegundos.                                                                         |
| `epochToDate(epoch: number): Date`                                              | Cria um Date a partir de milissegundos Unix.                                                              |
| `dateToEpoch(date: Date): number`                                               | Retorna date.getTime().                                                                                   |
| `getDaysDifferenceBetweenEpochs(a: number, b: number): number`                  | Diferença absoluta / 86.400.000, arredondada com Math.round.                                              |
| `getDaysDifference(a: Date, b: Date): number`                                   | Mesmo cálculo usando os timestamps dos Dates.                                                             |
| `getTimeDifference(a: Date, b: Date): number`                                   | Diferença absoluta em milissegundos.                                                                      |
| `formatDateForDB(date: Date): string`                                           | YYYY-MM-DD no fuso local.                                                                                 |
| `parseDateFromDB(value: string): Date`                                          | DD-MM-YYYY local; normalização permissiva nativa, inclusive anos 0–99.                                    |
| `addDays(date: Date, days: number): Date`                                       | Novo Date; soma dias de calendário locais, preservando horário.                                           |
| `subDays(date: Date, days: number): Date`                                       | Novo Date; subtrai dias locais. Aceita valores negativos.                                                 |
| `addMonths(date: Date, months: number): Date`                                   | Novo Date; overflow nativo, retorna meia-noite local.                                                     |
| `subMonths(date: Date, months: number): Date`                                   | Novo Date; overflow nativo, preserva horário.                                                             |
| `getMaxDate(a: Date, b: Date): Date`                                            | Retorna a referência da data mais recente; em empate retorna b.                                           |
| `getMinDate(a: Date, b: Date): Date`                                            | Retorna a referência da data mais antiga; em empate retorna b.                                            |
| `format(pattern?: string): string`                                              | Formata agora localmente; padrão YYYY-MM-DD HH:mm:ss. Mantém substituições legadas.                       |
| `formatToLocalString(date: Date): string`                                       | Delega a date.toLocaleString(); depende do ambiente.                                                      |
| `getStartOfDay(date: Date): Date`                                               | Novo Date, 00:00:00.000 local.                                                                            |
| `getEndOfDay(date: Date): Date`                                                 | Novo Date, 23:59:59.999 local.                                                                            |
| `isLeapYear(year: number): boolean`                                             | Regra gregoriana: divisível por 4, exceto séculos não divisíveis por 400.                                 |
| `getDaysInMonth(year: number, month: number): number`                           | Mês de 1 a 12; mantém normalização nativa fora desse intervalo.                                           |
| `getDaysRemainingInMonth(date: Date): number`                                   | Total do mês menos dia atual; exclui o dia atual.                                                         |
| `formatDate(date: Date, pattern?: string, options?: FormatDateOptions): string` | Novo: data fornecida, tokens repetidos, literais e UTC opcional. Date inválido lança RangeError.          |
| `parseISODate(value: string): Date`                                             | Novo: YYYY-MM-DD estrito, meia-noite local; datas impossíveis lançam RangeError. Preserva anos 0000–0099. |

## API adicional

Os métodos novos validam entradas e lançam `RangeError` para datas inválidas, números não finitos, unidades desconhecidas ou resultados fora do intervalo de `Date`. `isValidDate` retorna booleano. Métodos que retornam Date criam objetos novos. Os métodos legados mantêm seus contratos.

| Método                                                                                                  | Comportamento                                                                                                                            |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `isValidDate(value: unknown): value is Date`                                                            | Type guard; false para valores que não sejam Date ou datas inválidas.                                                                    |
| `cloneDate(date: Date): Date`                                                                           | Cópia independente validada.                                                                                                             |
| `add(date: Date, amount: number, unit: DateUnit, options?: DateOptions): Date`                          | Calendário para day/week/month/year; tempo decorrido para unidades menores. Meses/anos limitam ao último dia válido e preservam horário. |
| `subtract(date: Date, amount: number, unit: DateUnit, options?: DateOptions): Date`                     | Mesmos contratos de add; valores positivos movem para trás.                                                                              |
| `addHours(date: Date, hours: number): Date`                                                             | Horas decorridas; aceita frações e negativos.                                                                                            |
| `addMinutes(date: Date, minutes: number): Date`                                                         | Minutos decorridos.                                                                                                                      |
| `addSeconds(date: Date, seconds: number): Date`                                                         | Segundos decorridos.                                                                                                                     |
| `addMonthsClamped(date: Date, months: number, options?: DateOptions): Date`                             | Meses inteiros com limite no último dia válido, preservando horário.                                                                     |
| `addYears(date: Date, years: number, options?: DateOptions): Date`                                      | Anos inteiros com ajuste de 29 de fevereiro.                                                                                             |
| `addBusinessDays(date: Date, days: number, options?: DateOptions): Date`                                | Somente segunda–sexta, excluindo o dia inicial; sem feriados. Zero clona; negativos movem para trás.                                     |
| `startOf(date: Date, unit: BoundaryUnit, options?: WeekOptions): Date`                                  | Início do período; semanas começam na segunda por padrão.                                                                                |
| `endOf(date: Date, unit: BoundaryUnit, options?: WeekOptions): Date`                                    | Último milissegundo do período.                                                                                                          |
| `compareDates(a: Date, b: Date): DateComparison`                                                        | -1 se a for anterior, 1 se posterior, 0 se iguais.                                                                                       |
| `isBefore(a: Date, b: Date): boolean`                                                                   | Instante estritamente anterior.                                                                                                          |
| `isAfter(a: Date, b: Date): boolean`                                                                    | Instante estritamente posterior.                                                                                                         |
| `isEqual(a: Date, b: Date): boolean`                                                                    | Timestamps iguais, independentemente da identidade dos objetos.                                                                          |
| `isSameDay(a: Date, b: Date, options?: DateOptions): boolean`                                           | Mesma data de calendário, ignorando horário.                                                                                             |
| `isWithinInterval(date: Date, interval: DateInterval): boolean`                                         | Extremos inclusivos; intervalos invertidos lançam RangeError.                                                                            |
| `difference(a: Date, b: Date, unit?: TimeUnit): number`                                                 | Diferença decorrida com sinal: b menos a, sem arredondamento; padrão millisecond. Dias são exatamente 24 horas.                          |
| `getCalendarDaysDifference(a: Date, b: Date, options?: DateOptions): number`                            | Dias de calendário com sinal: b menos a, ignorando horário e duração do dia no horário de verão.                                         |
| `getDayOfYear(date: Date, options?: DateOptions): number`                                               | Dia do ano contado a partir de 1 (até 365/366).                                                                                          |
| `getISOWeek(date: Date, options?: DateOptions): ISOWeekInfo`                                            | Ano ISO, semana e dia da semana; semana 1 contém 4 de janeiro.                                                                           |
| `isWeekend(date: Date, options?: DateOptions): boolean`                                                 | Sábado ou domingo.                                                                                                                       |
| `getAge(birthDate: Date, referenceDate?: Date, options?: DateOptions): number`                          | Anos completos de calendário; referência padrão é agora. Aniversário de 29 de fevereiro usa 28 em anos não bissextos.                    |
| `getDateInfo(date: Date, options?: DateOptions): DateInfo`                                              | Metadados de calendário, semana ISO, milissegundos e segundos.                                                                           |
| `fromUnix(seconds: number): Date`                                                                       | Segundos Unix para Date; frações seguem truncamento nativo de milissegundos.                                                             |
| `toUnix(date: Date): number`                                                                            | Segundos Unix arredondados para baixo, inclusive timestamps negativos.                                                                   |
| `getDurationParts(milliseconds: number): DurationParts`                                                 | Duração inteira segura decomposta em valores absolutos e sinal separado.                                                                 |
| `formatInTimeZone(date: Date, timeZone: string, locale?: string, options?: ZonedFormatOptions): string` | Formatação Intl em fuso IANA; locale padrão en-US.                                                                                       |

### Tipos e contratos

Todos os tipos são reexportados por `laima`:

- `DateUnit`: `millisecond`, `second`, `minute`, `hour`, `day`, `week`, `month`, `year`.
- `TimeUnit`: `millisecond`, `second`, `minute`, `hour`, `day`, `week`.
- `CalendarUnit`: `day`, `week`, `month`, `year`.
- `BoundaryUnit`: `second`, `minute`, `hour`, `day`, `week`, `month`, `year`.
- `DateOptions` / `FormatDateOptions`: `{ utc?: boolean }`.
- `WeekOptions`: `{ utc?: boolean, weekStartsOn?: Weekday }`.
- `Weekday`: `0–6`; `ISOWeekday`: `1–7`; `DateComparison`: `-1`, `0`, `1`.
- `DateInterval`: `{ start: Date, end: Date }`.
- `ISOWeekInfo`: `{ year, week, weekday }`.
- `DurationParts`: `{ sign, days, hours, minutes, seconds, milliseconds }`.
- `DateInfo`: `{ year, month, day, weekday, dayOfYear, daysInMonth, leapYear, weekend, isoWeek, epochMilliseconds, unixSeconds }`.
- `ZonedFormatOptions`: `Intl.DateTimeFormatOptions` sem `timeZone`.

Em `add`/`subtract`, unidades de calendário exigem inteiros seguros e respeitam horário local ou UTC; unidades menores aceitam frações. Em `difference`, dias/semanas são períodos fixos de 24 horas/7 dias, sem arredondamento. `getCalendarDaysDifference` ignora horário e duração variável de dias no horário de verão. Semanas começam na segunda por padrão; `weekStartsOn: 0` usa domingo. `getAge` ignora horário, rejeita nascimento futuro e adota 28 de fevereiro como aniversário de 29 de fevereiro em anos comuns.

`DateInfo.month` usa 1–12; `weekday` usa domingo = 0; `ISOWeekInfo.weekday` usa segunda = 1, domingo = 7. O ano ISO pode diferir do ano civil. Durações usam dias de exatamente 24 horas e não representam meses/anos. `formatInTimeZone` exige suporte Intl no ambiente e usa seus dados de locale/fuso.

```ts
import Laima, { DateOptions, DateInfo, DurationParts } from 'laima';

const laima = new Laima();
const options: DateOptions = { utc: true };
const date = new Date('2024-01-31T12:00:00Z');
laima.add(date, 1, 'month', options); // 2024-02-29T12:00:00.000Z
laima.startOf(date, 'week', { ...options, weekStartsOn: 1 });
laima.difference(date, laima.addHours(date, 1.5), 'hour'); // 1.5
const info: DateInfo = laima.getDateInfo(date, options);
const duration: DurationParts = laima.getDurationParts(-1500);
laima.formatInTimeZone(date, 'America/Sao_Paulo', 'pt-BR');
```

## Formatação

Tokens antigos: `YYYY YY MM M DD D HH H hh h mm m ss s`. `format` substitui cada token uma vez, em ordem; tokens repetidos podem produzir resultados incompletos. O token `a`, anunciado em comentários antigos, não era implementado nesse método.

`formatDate` substitui todos os tokens em uma passagem e adiciona `a`/`A` (am/pm e AM/PM). Use `[texto literal]` para proteger texto. `{ utc: true }` usa UTC; a ausência da opção usa o fuso local. String de formato vazia retorna string vazia.

```ts
import Laima, { FormatDateOptions } from 'laima';

const laima = new Laima();
const options: FormatDateOptions = { utc: true };
const date = new Date('2024-02-29T15:04:05Z');
laima.formatDate(date, 'YYYY/YYYY [at] hh:mm A', options);
// "2024/2024 at 03:04 PM"
laima.parseISODate('2024-02-29');
```

## CLI

| Comando                                 | Resultado                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| `laima now`                             | Epoch atual em ms.                                                             |
| `laima epoch <date>`                    | Timestamp em ms.                                                               |
| `laima date <epoch>`                    | Timestamp ISO UTC.                                                             |
| `laima format <date> [pattern] [--utc]` | Data formatada; padrão YYYY-MM-DD HH:mm:ss. --utc deve ser o último argumento. |
| `laima add-days <date> <days>`          | Novo timestamp ISO UTC; dias devem ser inteiros seguros.                       |
| `laima diff <date1> <date2>`            | Diferença absoluta arredondada em dias de 24 horas.                            |
| `laima --help / -h`                     | Ajuda.                                                                         |
| `laima --version / -v`                  | Versão do pacote.                                                              |

### Comandos adicionais

| Comando                                                     | Resultado                                                                  |
| ----------------------------------------------------------- | -------------------------------------------------------------------------- |
| `laima add <date> <amount> <unit> [--utc]`                  | Cálculo de calendário/tempo decorrido; ajuste de mês/ano.                  |
| `laima subtract <date> <amount> <unit> [--utc]`             | Subtrai unidades; saída ISO UTC.                                           |
| `laima start-of <date> <unit> [--utc] [--week-start <0-6>]` | Início do período em ISO UTC.                                              |
| `laima end-of <date> <unit> [--utc] [--week-start <0-6>]`   | Fim do período em ISO UTC.                                                 |
| `laima compare <date1> <date2>`                             | -1, 0 ou 1 (primeira data comparada à segunda).                            |
| `laima diff-time <date1> <date2> [unit]`                    | Diferença decorrida com sinal: segunda menos primeira; padrão millisecond. |
| `laima calendar-diff <date1> <date2> [--utc]`               | Diferença de dias de calendário com sinal.                                 |
| `laima business-days <date> <days> [--utc]`                 | Soma dias de segunda a sexta; sem feriados.                                |
| `laima age <birthDate> [referenceDate] [--utc]`             | Anos completos de calendário.                                              |
| `laima iso-week <date> [--utc]`                             | JSON ISOWeekInfo.                                                          |
| `laima day-of-year <date> [--utc]`                          | Dia do ano.                                                                |
| `laima is-weekend <date> [--utc]`                           | true ou false.                                                             |
| `laima info <date> [--utc]`                                 | JSON DateInfo.                                                             |
| `laima within <date> <start> <end>`                         | Intervalo inclusivo: true ou false.                                        |
| `laima unix <date>`                                         | Segundos Unix.                                                             |
| `laima from-unix <seconds>`                                 | Timestamp ISO UTC.                                                         |
| `laima duration <milliseconds>`                             | JSON DurationParts.                                                        |
| `laima tz <date> <timeZone> [locale]`                       | String localizada via Intl no fuso solicitado.                             |

Unidades seguem os tipos acima. `diff-time` não aceita meses/anos; limites não aceitam milissegundos. Nas operações de calendário, `--utc` muda os campos usados no cálculo; entradas somente de data continuam sendo interpretadas à meia-noite local. Para instantes determinísticos, forneça um timestamp com `Z` ou offset. Comandos novos de calendário aceitam `--utc` e, nos limites, `--week-start`; opções duplicadas ou desconhecidas geram erro.

```sh
laima add 2024-01-31T12:00:00Z 1 month --utc
laima start-of 2024-06-12T12:00:00Z week --utc --week-start 0
laima business-days 2024-06-14T12:00:00Z 1 --utc
laima info 2024-02-29T12:00:00Z --utc
laima duration -1500
laima tz 2024-01-31T12:00:00Z America/Sao_Paulo pt-BR
```

Entradas: `YYYY-MM-DD` (local) ou `YYYY-MM-DDTHH:mm:ss[.SSS]Z` / offset `±HH:mm`. Números epoch podem ser negativos e são sempre milissegundos. Argumentos extras, datas inválidas e comandos desconhecidos causam código 1 e mensagem no stderr. Código 0 e stdout para sucesso. Não há interação nem leitura de arquivos.

Para desenvolver antes de publicar: `npm run build` e `node dist/cli.js --help`.
