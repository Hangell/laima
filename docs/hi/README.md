# 🕰️ Laima

[🇺🇸 English](../../README.md) · [🇧🇷 Português](../pt/README.md) · [🇷🇺 Русский](../ru/README.md) · **🇮🇳 हिन्दी** · [🇨🇳 中文](../zh/README.md) · [🇪🇸 Español](../es/README.md)

तारीखों को बदलने, उनकी तुलना करने, उनमें बदलाव करने और उन्हें फ़ॉर्मैट करने के लिए TypeScript/JavaScript लाइब्रेरी। इसकी कोई रनटाइम निर्भरता नहीं है। वैकल्पिक CLI भी इसी npm पैकेज में उपलब्ध है।

## इंस्टॉलेशन और उपयोग

```sh
npm install laima
```

```ts
import Laima from 'laima';

const laima = new Laima();
const date = laima.parseISODate('2024-02-29');
console.log(laima.formatDate(date, 'DD/MM/YYYY')); // 29/02/2024
console.log(laima.addDays(date, 1)); // नया Date; मूल date नहीं बदलती
```

```js
const Laima = require('laima').default;
const laima = new Laima();
console.log(laima.format());
```

[अंग्रेज़ी में पूरी API जानकारी](../en/API.md) · [पुर्तगाली में API जानकारी](../pt/API.md)

## तारीख और समय के उपयोगी फ़ंक्शन

टाइप किए गए API में कैलेंडर और बीते समय की गणना, महीनों और वर्षों के लिए अंतिम वैध दिन का समायोजन, अवधि की सीमाएँ, चिह्न सहित अंतर, दोनों सिरों को शामिल करने वाले अंतराल, ISO सप्ताह, तारीख की जानकारी, आयु, सोमवार से शुक्रवार के कार्यदिवस, Unix सेकंड, अवधि के घटक और IANA टाइमज़ोन में फ़ॉर्मैटिंग शामिल हैं। नए मेथड इनपुट की जाँच करते हैं और मूल तारीख को नहीं बदलते। [अंग्रेज़ी में विस्तारित API और टाइप](../en/API.md#extended-api) देखें।

```ts
const date = new Date('2024-01-31T12:00:00Z');
laima.add(date, 1, 'month', { utc: true }); // 2024-02-29T12:00:00.000Z
laima.getISOWeek(date, { utc: true });
laima.getDurationParts(-1500);
```

## टर्मिनल में वैकल्पिक उपयोग

Node.js और npm इंस्टॉल करें। CI, Linux, macOS और Windows पर Node.js 22 और 24 की जाँच करता है।

```sh
npx laima --help
npx laima format 2024-02-29T12:00:00Z "DD/MM/YYYY HH:mm" --utc
npx laima add-days 2024-02-28 1
npx laima diff 2024-01-01 2024-01-10
npx laima date 0
```

`laima` को सीधे चलाने के लिए:

```sh
npm install --global laima
laima --help
```

बिना समय वाली तारीखें स्थानीय मध्यरात्रि का उपयोग करती हैं। टाइमस्टैम्प में `Z` या ऑफ़सेट (`±HH:mm`) होना चाहिए। `--utc` देने पर ही फ़ॉर्मैटिंग UTC में होती है; अन्यथा स्थानीय समय का उपयोग होता है। `date` और `add-days` UTC में ISO टाइमस्टैम्प देते हैं। त्रुटियाँ stderr में जाती हैं और एग्ज़िट कोड 1 होता है; सफल परिणाम stdout में जाते हैं और कोड 0 होता है। [अंग्रेज़ी में CLI जानकारी](../en/API.md#cli) देखें।

## संगतता

मौजूदा इम्पोर्ट और मेथड उपलब्ध रहते हैं। दिनों का अंतर 24 घंटे की अवधियों का निरपेक्ष, पूर्णांक में गोल किया गया मान है; इससे यह पता नहीं चलता कि कोई समयसीमा बीत चुकी है या नहीं। कैलेंडर संबंधी गणनाएँ स्थानीय समय का उपयोग करती हैं और डेलाइट सेविंग समय के बदलाव से प्रभावित हो सकती हैं।

- `format(pattern?)` पुराने एल्गोरिदम को बनाए रखता है। दोहराए गए टोकन, वर्गाकार कोष्ठकों में स्थिर पाठ और UTC के लिए `formatDate(date, pattern?, options?)` का उपयोग करें।
- `parseDateFromDB` अब भी `DD-MM-YYYY` पढ़ता है और JavaScript के सामान्यीकरण को स्वीकार करता है, जबकि `formatDateForDB` का परिणाम `YYYY-MM-DD` होता है। दूसरे फ़ॉर्मैट को सख्ती से पढ़ने के लिए `parseISODate` का उपयोग करें।
- महीने की सीमा पार करने पर JavaScript का मूल व्यवहार बना रहता है: 31 जनवरी में एक महीना जोड़ने पर तारीख मार्च में जा सकती है। `addMonths` समय को मध्यरात्रि पर सेट करता है; `subMonths` दिन का समय बनाए रखता है।
- डिबग लॉग हटा दिए गए हैं। पुराने मेथड में अमान्य तारीखों का व्यवहार वही है; नए सख्त मेथड `RangeError` फेंकते हैं।

## प्रोजेक्ट की संरचना

```text
src/
  laima.ts           # सार्वजनिक API का फ़साड
  types.ts           # साझा टाइप
  core/              # ज़िम्मेदारी के अनुसार तारीख की गणनाएँ
  cli.ts             # एक्ज़िक्यूटेबल का प्रवेश बिंदु
  cli/               # कमांड, इनपुट पार्सिंग और मदद
tests/
  unit/              # मॉड्यूल और CLI का व्यवहार
  compatibility/     # पुराने अनुबंध और विशेष व्यवहार
  integration/       # npm पैकेज की स्थापना और उपयोग
config/              # Jest, commitlint और टेस्ट TypeScript
scripts/             # बिल्ड सफ़ाई और विकास हुक
docs/                # भाषा के अनुसार दस्तावेज़
dist/                # बिल्ड से बना आउटपुट
```

हर मॉड्यूल की ज़िम्मेदारी और बदलावों का सही स्थान जानने के लिए [अंग्रेज़ी में आर्किटेक्चर गाइड](../en/ARCHITECTURE.md) देखें।

## विकास और योगदान

Node.js 22 या 24 और npm का उपयोग करें:

```sh
npm ci
npm run check
```

`check`, lint, Prettier, टाइप जाँच, कवरेज टेस्ट और पैकेज को इस्तेमाल करने वाले प्रोजेक्ट में सत्यापन चलाता है। हुक, Conventional Commits, टाइमज़ोन टेस्ट, अनुवाद और रिलीज़ के लिए [CONTRIBUTING](../../CONTRIBUTING.md) देखें; यह गाइड अंग्रेज़ी और पुर्तगाली में है।

[CodeRabbit कॉन्फ़िगरेशन](../../.coderabbit.yaml) के लिए किसी मेंटेनर को GitHub रिपॉज़िटरी में ऐप इंस्टॉल करना और उसे अनुमति देना होगा। केवल कॉन्फ़िगरेशन फ़ाइल से सेवा सक्रिय नहीं होती; [आधिकारिक दस्तावेज़](https://docs.coderabbit.ai/reference/configuration) देखें।

## नाम, लेखक और लाइसेंस

Laima का नाम भाग्य और समय की बाल्टिक देवी से प्रेरित है। निर्माता: [Rodrigo Rangel](https://github.com/Hangell) · [hangell.org](https://hangell.org)। [MIT लाइसेंस](../../LICENSE)।

सहयोग: PIX `rodrigo@hangell.org` · Crypto/NFT `0xEd4d1be72F807Faa358C966a8eF63367c200130F`.
