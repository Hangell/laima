# Laima
Welcome to Laima, an npm package for working with dates in an easy and efficient way!

Laima is an npm package that allows you to work with dates in a simple and intuitive way. This package includes functions for manipulating, formatting, comparing, and displaying dates in different formats. With Laima, you can perform date operations in JavaScript without worrying about the nuances of JavaScript.

Some of the key features of Laima include:

* Date manipulation: Laima includes functions for adding, subtracting, and comparing dates.
* Date formatting: Laima allows you to format dates in different formats, such as DD/MM/YYYY or MM/DD/YYYY.
* Date display: Laima allows you to display dates in different formats, such as "5 minutes ago" or "1 hour ago".
* Customizable settings: Laima allows you to configure custom options to meet your specific needs.

## Installation
To install Laima, run the following command:
```bash
npm install laima
# or
yarn add laima
```

## Usage

### Importing Laima
To import Laima, use the following command:
```js
#js
const laima = require('laima').default;

const myLaima = new laima();// 2021-05-10T14:25:11.095Z
console.log('getEpochTime'); // 1620650111095
console.log(myLaima.getEpochTime());
```
```ts
#ts
import * as laima from 'laima';
```
### Getting Epoch Time

To get the current epoch time, use the getEpochTime() method:
```js
const epochTime = laima.getEpochTime(); // Returns current epoch time in milliseconds
```


### Converting Epoch to Date and Vice Versa

To convert an epoch value to a Date object, use the epochToDate(epochTime) method:
```js
const epochTime = 1644283293153;
const date = laima.epochToDate(epochTime); // Returns a Date object for the given epoch time

```

To convert a Date object to an epoch value, use the dateToEpoch(date) method
```js
const date = new Date();
const epochTime = laima.dateToEpoch(date); // Returns the epoch time in milliseconds for the given date
```

### Calculating Time Difference

To calculate the time difference between two dates, use the getTimeDifference(date1, date2) method:
```js
const date1 = new Date(2022, 4, 1); // May 1, 2022
const date2 = new Date(2022, 4, 3); // May 3, 2022
const timeDifference = laima.getTimeDifference(date1, date2); // Returns the time difference in milliseconds
```

### Formatting Dates for Databases

To format a Date object as a string in the format "YYYY-MM-DD", use the formatDateForDB(date) method:
```js
const date = new Date(2022, 4, 1); // May 1, 2022
const formattedDate = laima.formatDateForDB(date); // Returns "2022-05-01"
```

To convert a date string in the format "YYYY-MM-DD" to a Date object, use the parseDateFromDB(dateString) method:

```js
const dateString = '2022-05-01';
const date = laima.parseDateFromDB(dateString); // Returns a Date object for the given date string
```

### Adding and Subtracting Days from Dates
To add or subtract a specified number of days from a Date object, use the addDays(date, days) or subDays(date, days) methods:
```js
const date = new Date(2022, 4, 1); // May 1, 2022
const datePlusFiveDays = laima.addDays(date, 5); // Returns a new Date object for May 6, 2022
const dateMinusThreeDays = laima.subDays(date, 3); // Returns a new Date object for April 28, 2022
```

Example
```js
console.log(laima.addDays(date, 365)); // Exemplo de retorno: "2024-05-11 14:25:11"
console.log(laima.subDays(date, 365)); // e+Exemplo de retorno: "2022-05-11 14:25:11"
```
### Date Max and date min


The function getMaxDate takes two Date objects as arguments and returns the most recent of the two dates.
```js
const date1 = new Date(2022, 0, 1); // 1 de Janeiro de 2022
const date2 = new Date(2023, 0, 1); // 1 de Janeiro de 2023

console.log(laima.getMaxDate(date1, date2));
// Saída: 2023-01-01T00:00:00.000Z
```
The function getMinDate takes two Date objects as arguments and returns the earliest of the two dates.
```js
const date1 = new Date(2022, 0, 1); // 1 de Janeiro de 2022
const date2 = new Date(2023, 0, 1); // 1 de Janeiro de 2023

console.log(laima.getMinDate(date1, date2));
// Saída: 2022-01-01T00:00:00.000Z

```

### Date Formatting

Laima allows formatting dates in different formats using markers to replace the date components. The accepted markers are:

* 'YYYY': Represents the year with four digits (example: 2023).
* 'YY': Represents the year with two digits (example: 23).
* 'MM': Represents the month with two digits (01-12).
* 'M': Represents the month without leading zeros (1-12).
* 'DD': Represents the day of the month with two digits (01-31).
* 'D': Represents the day of the month without leading zeros (1-31).
* 'HH': Represents the hour in 24-hour format with two digits (00-23).
* 'H': Represents the hour in 24-hour format without leading zeros (0-23).
* 'hh': Represents the hour in 12-hour format with two digits (01-12).
* 'h': Represents the hour in 12-hour format without leading zeros (1-12).
* 'mm': Represents the minutes with two digits (00-59).
* 'm': Represents the minutes without leading zeros (0-59).
* 'ss': Represents the seconds with two digits (00-59).
* 's': Represents the seconds without leading zeros (0-59).
* 'A': Represents "AM" or "PM" in uppercase letters.

To format a date, use the format() function from Laima. For example:
```js
const date = new Date(2022, 0, 1, 14, 30, 0); // January 1, 2022, at 14:30
const formattedDate = laima.format(date, 'DD/MM/YYYY HH:mm:ss');
console.log(formattedDate); // "01/01/2022 14:30:00" 4
```

Example
```js
console.log(laima.now()); // Exemplo de retorno: "2023-05-12 14:25:11"
console.log(laima.now('YYYY/MM/DD')); // Exemplo de retorno: "2023/05/12"
console.log(laima.now('HH:mm:ss')); // Exemplo de retorno: "14:25:11"
console.log(laima.now('DD/MM/YYYY')); // Exemplo de retorno: "12/05/2023"
console.log(laima.now('YYYY-MM-DD HH:mm:ss')); // Exemplo de retorno: "2023-05-12 14:25:11"
console.log(laima.now('YY/MM/DD HH:mm:ss')); // Exemplo de retorno: "23/05/12 14:25:11"
console.log(laima.now('mm DD, YYYY')); // Exemplo de retorno: "May 12, 2023"
console.log(laima.now('MM/DD/YYYY HH:mm:ss')); // Exemplo de retorno: "05/12/2023 14:25:11"
```

##Curiosity about the name Laima 


The name "Laima" was chosen for the npm package as it embodies the concept of destiny and time, which are central themes in working with dates. Just as the Baltic goddess Laima was responsible for weaving the threads of fate that determined the destiny of individuals and communities, the Laima package allows developers to manipulate and analyze dates, ultimately influencing the outcome of various processes and applications. Furthermore, the name "Laima" also carries a sense of renewal and rebirth, which reflects the package's aim to offer a fresh and modern alternative to existing date libraries such as Moment.js.
## Licença

Laima is licensed under the MIT license. Please refer to the LICENSE file for more information.



## Doações
If you enjoyed using Laima, please consider making a donation to support the continuous development of the project. You can make a donation using one of the following options:
* Pix: rodrigo@hangell.org

* Cryptocurrencies or nft MetaMask: 0xEd4d1be72F807Faa358C966a8eF63367c200130F

![Created By](https://hangell.org/wp-content/uploads/2022/04/rodrigorangel.jpeg)



<div>
<a href="https://hangell.org" target="_blank"><img src="https://img.shields.io/badge/website-000000?style=for-the-badge&logo=About.me&logoColor=white" target="_blank"></a>
  <a href="https://play.google.com/store/apps/dev?id=5606456325281613718" target="_blank"><img src="https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white" target="_blank"></a>
  <a href="https://www.youtube.com/channel/UC8_zG7RFM2aMhI-p-6zmixw" target="_blank"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" target="_blank"></a>
  <a href="https://www.facebook.com/hangell.org" target="_blank"><img src="	https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/rodrigo-rangel-a80810170" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>

</div>