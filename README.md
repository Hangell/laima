# 🕰️ Laima

[![npm version](https://badge.fury.io/js/laima.svg)](https://badge.fury.io/js/laima)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Laima** é uma biblioteca TypeScript/JavaScript moderna e intuitiva para manipulação de datas, oferecendo uma API simples e eficiente para todas as suas necessidades relacionadas a tempo e datas.

## 🚀 Recursos Principais

- ⚡ **Performance otimizada** - Operações rápidas e eficientes
- 🎯 **API intuitiva** - Métodos claros e fáceis de usar
- 📅 **Manipulação completa** - Adicionar, subtrair, comparar e formatar datas
- 🌐 **Suporte a múltiplos formatos** - Formatação flexível de datas
- 📦 **Zero dependências** - Leve e sem bibliotecas externas
- 🔷 **TypeScript nativo** - Tipagem completa incluída
- 🧪 **Amplamente testada** - Cobertura completa de testes

## 📦 Instalação

```bash
npm install laima
```

```bash
yarn add laima
```

```bash
pnpm add laima
```

## 🛠️ Uso Básico

### Importação

```javascript
// CommonJS
const Laima = require('laima').default;
const laima = new Laima();
```

```typescript
// ES Modules / TypeScript
import Laima from 'laima';
const laima = new Laima();
```

## 📖 Documentação da API

### ⏰ Tempo Epoch

#### `getEpochTime(): number`
Retorna o timestamp atual em milissegundos.

```javascript
const now = laima.getEpochTime();
console.log(now); // 1620650111095
```

#### `epochToDate(epochTime: number): Date`
Converte um valor epoch para um objeto Date.

```javascript
const epoch = 1620650111095;
const date = laima.epochToDate(epoch);
console.log(date); // 2021-05-10T14:25:11.095Z
```

#### `dateToEpoch(date: Date): number`
Converte um objeto Date para valor epoch.

```javascript
const date = new Date();
const epoch = laima.dateToEpoch(date);
console.log(epoch); // 1620650111095
```

### 📊 Cálculos de Diferença

#### `getDaysDifference(date1: Date, date2: Date): number`
Calcula a diferença em dias entre duas datas.

```javascript
const date1 = new Date('2023-05-01');
const date2 = new Date('2023-05-10');
const days = laima.getDaysDifference(date1, date2);
console.log(days); // 9
```

#### `getDaysDifferenceBetweenEpochs(epoch1: number, epoch2: number): number`
Calcula a diferença em dias entre dois valores epoch.

```javascript
const epoch1 = 1620650111095;
const epoch2 = 1620736511095;
const days = laima.getDaysDifferenceBetweenEpochs(epoch1, epoch2);
console.log(days); // 1
```

#### `getTimeDifference(date1: Date, date2: Date): number`
Retorna a diferença em milissegundos entre duas datas.

```javascript
const date1 = new Date('2023-05-01 10:00:00');
const date2 = new Date('2023-05-01 12:00:00');
const diff = laima.getTimeDifference(date1, date2);
console.log(diff); // 7200000 (2 horas em ms)
```

### 🔄 Manipulação de Datas

#### `addDays(date: Date, days: number): Date`
Adiciona dias a uma data.

```javascript
const date = new Date('2023-05-01');
const newDate = laima.addDays(date, 7);
console.log(newDate); // 2023-05-08
```

#### `subDays(date: Date, days: number): Date`
Remove dias de uma data.

```javascript
const date = new Date('2023-05-10');
const newDate = laima.subDays(date, 3);
console.log(newDate); // 2023-05-07
```

#### `addMonths(date: Date, months: number): Date`
Adiciona meses a uma data.

```javascript
const date = new Date('2023-01-15');
const newDate = laima.addMonths(date, 2);
console.log(newDate); // 2023-03-15
```

#### `subMonths(date: Date, months: number): Date`
Remove meses de uma data.

```javascript
const date = new Date('2023-05-15');
const newDate = laima.subMonths(date, 1);
console.log(newDate); // 2023-04-15
```

### 🎨 Formatação

#### `format(formatString?: string): string`
Formata a data/hora atual usando tokens personalizados.

**Tokens disponíveis:**
- `YYYY` - Ano completo (2023)
- `YY` - Ano com 2 dígitos (23)
- `MM` - Mês com 2 dígitos (01-12)
- `M` - Mês sem zero à esquerda (1-12)
- `DD` - Dia com 2 dígitos (01-31)
- `D` - Dia sem zero à esquerda (1-31)
- `HH` - Hora 24h com 2 dígitos (00-23)
- `H` - Hora 24h sem zero à esquerda (0-23)
- `hh` - Hora 12h com 2 dígitos (01-12)
- `h` - Hora 12h sem zero à esquerda (1-12)
- `mm` - Minutos com 2 dígitos (00-59)
- `m` - Minutos sem zero à esquerda (0-59)
- `ss` - Segundos com 2 dígitos (00-59)
- `s` - Segundos sem zero à esquerda (0-59)

```javascript
// Formato padrão
console.log(laima.format()); // "2023-05-12 14:25:11"

// Formatos personalizados
console.log(laima.format('DD/MM/YYYY')); // "12/05/2023"
console.log(laima.format('YYYY-MM-DD HH:mm:ss')); // "2023-05-12 14:25:11"
console.log(laima.format('HH:mm:ss')); // "14:25:11"
```

#### `formatDateForDB(date: Date): string`
Formata uma data para o padrão de banco de dados (YYYY-MM-DD).

```javascript
const date = new Date('2023-05-12');
const formatted = laima.formatDateForDB(date);
console.log(formatted); // "2023-05-12"
```

#### `parseDateFromDB(dateString: string): Date`
Converte uma string de data do banco (dd-mm-yyyy) para objeto Date.

```javascript
const dateStr = "12-05-2023";
const date = laima.parseDateFromDB(dateStr);
console.log(date); // Date object for May 12, 2023
```

#### `formatToLocalString(date: Date): string`
Formata a data usando configurações locais.

```javascript
const date = new Date('2023-05-12 14:30:00');
const formatted = laima.formatToLocalString(date);
console.log(formatted); // "12/5/2023, 2:30:00 PM" (varia conforme locale)
```

### 🔍 Comparação de Datas

#### `getMaxDate(date1: Date, date2: Date): Date`
Retorna a data mais recente.

```javascript
const date1 = new Date('2023-01-01');
const date2 = new Date('2023-12-31');
const maxDate = laima.getMaxDate(date1, date2);
console.log(maxDate); // 2023-12-31
```

#### `getMinDate(date1: Date, date2: Date): Date`
Retorna a data mais antiga.

```javascript
const date1 = new Date('2023-01-01');
const date2 = new Date('2023-12-31');
const minDate = laima.getMinDate(date1, date2);
console.log(minDate); // 2023-01-01
```

### 📅 Utilitários de Dia

#### `getStartOfDay(date: Date): Date`
Retorna o início do dia (00:00:00.000).

```javascript
const date = new Date('2023-05-12 15:30:45');
const startOfDay = laima.getStartOfDay(date);
console.log(startOfDay); // 2023-05-12T00:00:00.000Z
```

#### `getEndOfDay(date: Date): Date`
Retorna o final do dia (23:59:59.999).

```javascript
const date = new Date('2023-05-12 15:30:45');
const endOfDay = laima.getEndOfDay(date);
console.log(endOfDay); // 2023-05-12T23:59:59.999Z
```

### 🗓️ Utilitários de Mês e Ano

#### `isLeapYear(year: number): boolean`
Verifica se um ano é bissexto.

```javascript
console.log(laima.isLeapYear(2024)); // true
console.log(laima.isLeapYear(2023)); // false
```

#### `getDaysInMonth(year: number, month: number): number`
Retorna o número de dias em um mês específico.

```javascript
console.log(laima.getDaysInMonth(2023, 2)); // 28 (fevereiro 2023)
console.log(laima.getDaysInMonth(2024, 2)); // 29 (fevereiro 2024 - bissexto)
```

#### `getDaysRemainingInMonth(date: Date): number`
Retorna quantos dias restam no mês atual.

```javascript
const date = new Date('2023-05-15');
const remaining = laima.getDaysRemainingInMonth(date);
console.log(remaining); // 16 (31 - 15)
```

## 💡 Exemplos Práticos

### Calculadora de Idade

```javascript
const laima = new Laima();
const birthDate = new Date('1990-05-15');
const today = new Date();
const ageInDays = laima.getDaysDifference(birthDate, today);
const ageInYears = Math.floor(ageInDays / 365);
console.log(`Você tem ${ageInYears} anos (${ageInDays} dias)`);
```

### Validador de Prazo

```javascript
const laima = new Laima();
const deadline = new Date('2023-12-31');
const today = new Date();
const daysUntilDeadline = laima.getDaysDifference(today, deadline);

if (daysUntilDeadline > 0) {
    console.log(`Restam ${daysUntilDeadline} dias até o prazo`);
} else {
    console.log('Prazo vencido!');
}
```

### Relatório Mensal

```javascript
const laima = new Laima();
const startOfMonth = new Date(2023, 4, 1); // Maio 2023
const endOfMonth = laima.addMonths(startOfMonth, 1);
endOfMonth.setDate(0); // Último dia do mês anterior

console.log(`Período: ${laima.formatDateForDB(startOfMonth)} a ${laima.formatDateForDB(endOfMonth)}`);
```

## 🎯 Por que escolher Laima?

### Comparação com outras bibliotecas

| Recurso | Laima | Moment.js | Day.js |
|---------|--------|-----------|--------|
| Tamanho | ~5KB | ~67KB | ~3KB |
| TypeScript nativo | ✅ | ❌ | ✅ |
| Tree shaking | ✅ | ❌ | ✅ |
| API intuitiva | ✅ | ✅ | ✅ |
| Zero dependências | ✅ | ❌ | ✅ |

### Vantagens da Laima

- **Leveza**: Apenas ~5KB minificado
- **Moderna**: Construída com TypeScript moderno
- **Simples**: API clara e consistente
- **Completa**: Todas as funcionalidades essenciais incluídas
- **Confiável**: Amplamente testada e documentada

## 🌟 A História do Nome

O nome "Laima" foi inspirado na deusa báltica do destino e do tempo. Assim como Laima tecia os fios do destino que determinavam o futuro das pessoas, esta biblioteca permite que desenvolvedores manipulem e controlem o tempo em suas aplicações, influenciando o resultado de processos e funcionalidades.

O nome também evoca renovação e renascimento, refletindo o objetivo da biblioteca de oferecer uma alternativa fresca e moderna às bibliotecas de data existentes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Crie um Pull Request

### Diretrizes de Desenvolvimento

- Mantenha a cobertura de testes acima de 90%
- Siga as convenções de código TypeScript
- Documente novas funcionalidades
- Teste em múltiplos ambientes

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Apoio ao Projeto

Se você acha o Laima útil, considere apoiar o desenvolvimento:

**PIX**: `rodrigo@hangell.org`

**Crypto/NFT**: `0xEd4d1be72F807Faa358C966a8eF63367c200130F`

## 👨‍💻 Autor

<div align="center">

![Rodrigo Rangel](https://avatars.githubusercontent.com/u/53544561?v=4)

**Rodrigo Rangel**

[![Website](https://img.shields.io/badge/website-000000?style=for-the-badge&logo=About.me&logoColor=white)](https://hangell.org)
[![Google Play](https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white)](https://play.google.com/store/apps/dev?id=5606456325281613718)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UC8_zG7RFM2aMhI-p-6zmixw)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/hangell.org)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rodrigo-rangel-a80810170)

</div>

---

<div align="center">

**Feito com ❤️ para a comunidade de desenvolvedores**

⭐ Se este projeto te ajudou, considere dar uma estrela no [GitHub](https://github.com/Hangell/laima.git)!

</div>
