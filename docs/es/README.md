# 🕰️ Laima

<p align="center">
  <img src="../../assets/logo.png" alt="Logo de Laima">
  <br />
  <strong>Un potente conjunto de herramientas JavaScript/TypeScript para fechas y horas, sin dependencias en tiempo de ejecución.</strong>
  <br />
  Da formato a fechas, compara momentos y calcula el tiempo fácilmente, en tu aplicación o en la terminal.
</p>

[![npm version](https://badge.fury.io/js/laima.svg)](https://www.npmjs.com/package/laima)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

[🇺🇸 English](../../README.md) · [🇧🇷 Português](../pt/README.md) · [🇷🇺 Русский](../ru/README.md) · [🇮🇳 हिन्दी](../hi/README.md) · [🇨🇳 中文](../zh/README.md) · **🇪🇸 Español**

Biblioteca TypeScript/JavaScript para convertir, comparar, manipular y dar formato a fechas, sin dependencias en tiempo de ejecución. La CLI opcional se incluye en el mismo paquete npm.

## Instalación y uso

```sh
npm install laima
```

```ts
import Laima from 'laima';

const laima = new Laima();
const date = laima.parseISODate('2024-02-29');
console.log(laima.formatDate(date, 'DD/MM/YYYY')); // 29/02/2024
console.log(laima.addDays(date, 1)); // un Date nuevo; date no se modifica
```

```js
const Laima = require('laima').default;
const laima = new Laima();
console.log(laima.format());
```

[Referencia completa de la API en inglés](../en/API.md) · [Referencia en portugués](../pt/API.md)

## Utilidades de fecha y hora

La API tipada incluye cálculos de calendario y tiempo transcurrido, meses y años ajustados al último día válido, límites de períodos, diferencias con signo, intervalos inclusivos, semanas ISO, metadatos, edad, días laborables de lunes a viernes, segundos Unix, componentes de duración y formato en zonas IANA. Los nuevos métodos validan las entradas y no modifican las fechas originales. Consulta la [API ampliada y los contratos de tipos en inglés](../en/API.md#extended-api).

```ts
const date = new Date('2024-01-31T12:00:00Z');
laima.add(date, 1, 'month', { utc: true }); // 2024-02-29T12:00:00.000Z
laima.getISOWeek(date, { utc: true });
laima.getDurationParts(-1500);
```

## Uso opcional en la terminal

Instala Node.js y npm. CI comprueba Node.js 22 y 24 en Linux, macOS y Windows.

```sh
npx laima --help
npx laima format 2024-02-29T12:00:00Z "DD/MM/YYYY HH:mm" --utc
npx laima add-days 2024-02-28 1
npx laima diff 2024-01-01 2024-01-10
npx laima date 0
```

Para ejecutar `laima` directamente:

```sh
npm install --global laima
laima --help
```

Las entradas que solo contienen una fecha usan la medianoche local. Las marcas de tiempo deben incluir `Z` o un desplazamiento (`±HH:mm`). El formato usa la hora local salvo que se indique `--utc`. `date` y `add-days` devuelven marcas de tiempo ISO en UTC. Los errores se escriben en stderr con código de salida 1; los resultados correctos, en stdout con código 0. Consulta la [referencia de la CLI en inglés](../en/API.md#cli).

## Compatibilidad

Los imports y métodos existentes siguen disponibles. Las diferencias en días son valores absolutos redondeados en períodos de 24 horas; no permiten saber si un plazo ya venció. Las operaciones de calendario usan la hora local y pueden atravesar cambios de horario de verano.

- `format(pattern?)` conserva su algoritmo anterior. Usa `formatDate(date, pattern?, options?)` para tokens repetidos, texto literal entre corchetes y UTC.
- `parseDateFromDB` sigue leyendo `DD-MM-YYYY` de forma permisiva, mientras que `formatDateForDB` produce `YYYY-MM-DD`. Usa `parseISODate` para leer estrictamente este último formato.
- Se conserva el desbordamiento nativo de meses: sumar un mes al 31 de enero puede producir una fecha de marzo. `addMonths` restablece la hora a medianoche; `subMonths` conserva la hora del día.
- Se eliminaron los logs de depuración. El comportamiento anterior ante fechas no válidas se conserva; los nuevos métodos estrictos lanzan `RangeError`.

## Organización

```text
src/
  laima.ts           # fachada de la API pública
  types.ts           # tipos compartidos
  core/              # operaciones de fechas por responsabilidad
  cli.ts             # entrada del ejecutable
  cli/               # comandos, parsing y ayuda
tests/
  unit/              # comportamiento de módulos y CLI
  compatibility/     # contratos y peculiaridades anteriores
  integration/       # instalación y uso del paquete npm
config/              # Jest, commitlint y TypeScript de pruebas
scripts/             # limpieza del build y hooks de desarrollo
docs/                # documentación por idioma
dist/                # salida generada por el build
```

Consulta la [guía de arquitectura en inglés](../en/ARCHITECTURE.md) para conocer las responsabilidades y dónde realizar cada cambio.

## Desarrollo y contribuciones

Usa Node.js 22 o 24 y npm:

```sh
npm ci
npm run check
```

`check` ejecuta lint, Prettier, comprobaciones de tipos, pruebas de cobertura y validación del paquete en un consumidor. Consulta [CONTRIBUTING](../../CONTRIBUTING.md) para hooks, Conventional Commits, pruebas de zona horaria, traducciones y publicaciones; la guía está en inglés y portugués.

La [configuración de CodeRabbit](../../.coderabbit.yaml) requiere que un mantenedor instale y autorice la aplicación en el repositorio de GitHub. El archivo por sí solo no activa el servicio; consulta la [documentación oficial](https://docs.coderabbit.ai/reference/configuration).

## Nombre, autor y licencia

Laima está inspirada en la diosa báltica del destino y del tiempo. Creada por [Rodrigo Rangel](https://github.com/Hangell) · [hangell.org](https://hangell.org). [Licencia MIT](../../LICENSE).

Apoyo: PIX `rodrigo@hangell.org` · Crypto/NFT `0xEd4d1be72F807Faa358C966a8eF63367c200130F`.
