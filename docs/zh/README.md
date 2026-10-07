# 🕰️ Laima

[🇺🇸 English](../../README.md) · [🇧🇷 Português](../pt/README.md) · [🇷🇺 Русский](../ru/README.md) · [🇮🇳 हिन्दी](../hi/README.md) · **🇨🇳 中文** · [🇪🇸 Español](../es/README.md)

一个用于转换、比较、操作和格式化日期的 TypeScript/JavaScript 库，没有运行时依赖。可选的 CLI 随同一个 npm 包提供。

> 这里介绍的新增功能仍在开发中（参见 [CHANGELOG](../../CHANGELOG.md)），将在下一次发布后通过 npm 提供。本次准备工作尚未修改包版本。

## 安装与使用

```sh
npm install laima
```

```ts
import Laima from 'laima';

const laima = new Laima();
const date = laima.parseISODate('2024-02-29');
console.log(laima.formatDate(date, 'DD/MM/YYYY')); // 29/02/2024
console.log(laima.addDays(date, 1)); // 返回新的 Date，不修改原来的 date
```

```js
const Laima = require('laima').default;
const laima = new Laima();
console.log(laima.format());
```

[完整英文 API 参考](../en/API.md) · [葡萄牙语 API 参考](../pt/API.md)

## 日期与时间工具

类型化 API 新增了日历与经过时间的运算、月份和年份的有效日期限制、周期边界、带符号的差值、包含端点的区间、ISO 周、日期元数据、年龄、周一至周五的工作日、Unix 秒数、时长分解和 IANA 时区格式化。新方法验证输入且不修改原日期。参见[英文扩展 API 和类型约定](../en/API.md#extended-api)。

```ts
const date = new Date('2024-01-31T12:00:00Z');
laima.add(date, 1, 'month', { utc: true }); // 2024-02-29T12:00:00.000Z
laima.getISOWeek(date, { utc: true });
laima.getDurationParts(-1500);
```

## 可选的终端用法

请安装 Node.js 和 npm。CI 在 Linux、macOS 和 Windows 上检查 Node.js 22 和 24。

```sh
npx laima --help
npx laima format 2024-02-29T12:00:00Z "DD/MM/YYYY HH:mm" --utc
npx laima add-days 2024-02-28 1
npx laima diff 2024-01-01 2024-01-10
npx laima date 0
```

如需直接运行 `laima`：

```sh
npm install --global laima
laima --help
```

仅包含日期的输入使用本地时间的午夜。时间戳必须包含 `Z` 或时区偏移量（`±HH:mm`）。格式化默认使用本地时间，指定 `--utc` 后使用 UTC。`date` 和 `add-days` 输出 UTC 的 ISO 时间戳。错误写入 stderr，退出码为 1；成功结果写入 stdout，退出码为 0。参见[英文 CLI 参考](../en/API.md#cli)。

## 兼容性

现有导入方式和方法保持可用。天数差是按 24 小时计算并四舍五入的绝对值，不能判断截止日期是否已过。日历操作使用本地时间，可能跨越夏令时切换。

- `format(pattern?)` 保留原有算法。如需重复标记、方括号中的字面文本或 UTC，请使用 `formatDate(date, pattern?, options?)`。
- `parseDateFromDB` 仍宽松解析 `DD-MM-YYYY`，而 `formatDateForDB` 输出 `YYYY-MM-DD`。请使用 `parseISODate` 严格解析后者。
- 保留 JavaScript 原生的月份溢出行为：1 月 31 日加一个月可能落在 3 月。`addMonths` 将时间重置为午夜；`subMonths` 保留当天的时间。
- 调试日志已移除。旧方法处理无效日期的行为保持不变；新的严格方法会抛出 `RangeError`。

## 项目结构

```text
src/
  laima.ts           # 公共 API 门面
  types.ts           # 共享类型
  core/              # 按职责划分的日期操作
  cli.ts             # 可执行文件入口
  cli/               # 命令、输入解析和帮助
tests/
  unit/              # 模块和 CLI 行为
  compatibility/     # 旧版契约和特殊行为
  integration/       # npm 包安装和使用
config/              # Jest、commitlint 和测试 TypeScript
scripts/             # 构建清理和开发钩子
docs/                # 按语言组织的文档
dist/                # 构建生成的输出
```

各模块的职责和修改位置请参见[英文架构指南](../en/ARCHITECTURE.md)。

## 开发与贡献

使用 Node.js 22 或 24 以及 npm：

```sh
npm ci
npm run check
```

`check` 运行 lint、Prettier、类型检查、覆盖率测试和包消费者验证。有关钩子、Conventional Commits、时区测试、翻译和发布，请参见 [CONTRIBUTING](../../CONTRIBUTING.md)；该指南提供英文和葡萄牙语版本。

[CodeRabbit 配置](../../.coderabbit.yaml)需要维护者在 GitHub 仓库中安装并授权 CodeRabbit 应用。仅有配置文件不会启用服务；请参见[官方文档](https://docs.coderabbit.ai/reference/configuration)。

## 名称、作者与许可

Laima 的名称源自波罗的海神话中的命运与时间女神。作者：[Rodrigo Rangel](https://github.com/Hangell) · [hangell.org](https://hangell.org)。采用 [MIT 许可证](../../LICENSE)。

支持项目: PIX `rodrigo@hangell.org` · Crypto/NFT `0xEd4d1be72F807Faa358C966a8eF63367c200130F`.
