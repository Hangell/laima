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

### Adding and Subtracting Months
The addMonths(date, months) function adds a specific number of months to a given date.
```js
const date = new Date(2022, 0, 1); // January 1, 2022
const newDate = laima.addMonths(date, 3); // Adds 3 months to the date
console.log(newDate);
// Output: 2022-04-01T00:00:00.000Z
```

The subMonths(date, months) function subtracts a specific number of months from a given date.
```js
const date = new Date(2022, 0, 1); // January 1, 2022
const newDate = laima.subMonths(date, 2); // Subtracts 2 months from the date
console.log(newDate);
// Output: 2021-10-01T00:00:00.000Z
```

### Formatting Date to Local String
The formatToLocalString(date) function formats a Date object to a string in the local format.

```js
const date = new Date(2022, 0, 1, 14, 30, 0); // January 1, 2022, at 14:30
const formattedDate = laima.formatToLocalString(date);
console.log(formattedDate);
// Output: "1/1/2022, 2:30:00 PM" (format may vary based on locale)
```

### Getting Start and End of Day
The getStartOfDay(date) function returns a new Date object representing the start of the day (midnight) for a given date.
```js
const date = new Date(2022, 0, 1, 14, 30, 0); // January 1, 2022, at 14:30
const startOfDay = laima.getStartOfDay(date);
console.log(startOfDay);
// Output: 2022-01-01T00:00:00.000Z
```

The getEndOfDay(date) function returns a new Date object representing the end of the day (23:59:59.999) for a given date.
```js
const date = new Date(2022, 0, 1, 14, 30, 0); // January 1, 2022, at 14:30
const endOfDay = laima.getEndOfDay(date);
console.log(endOfDay);
// Output: 2022-01-01T23:59:59.999Z
```

### Leap Year Check
The isLeapYear(year) function determines whether a year is a leap year or not.
```js
console.log(laima.isLeapYear(2020));
// Output: true

console.log(laima.isLeapYear(2021));
// Output: false
```

### Getting Number of Days in a Month
The getDaysInMonth(year, month) function returns the number of days in a specific month for a given year.
```js
console.log(laima.getDaysInMonth(2022, 2)); // March 2022
// Output: 31

console.log(laima.getDaysInMonth(2023, 1)); // February 2023
// Output: 28
```

### Getting Number of Days Remaining in a Month
The getDaysRemainingInMonth(date) function returns the number of days remaining until the end of the month for a given date.
```js
const date = new Date(2022, 0, 1); // January 1, 2022
const daysRemaining = laima.getDaysRemainingInMonth(date);
console.log(daysRemaining);
// Output: 30
```

These functions provide useful utilities for manipulating and working with dates in JavaScript. You can incorporate them into your projects to perform various date-related operations with ease.


## Curiosity about the name Laima
The name "Laima" was chosen for the npm package as it embodies the concept of destiny and time, which are central themes in working with dates. Just as the Baltic goddess Laima was responsible for weaving the threads of fate that determined the destiny of individuals and communities, the Laima package allows developers to manipulate and analyze dates, ultimately influencing the outcome of various processes and applications. Furthermore, the name "Laima" also carries a sense of renewal and rebirth, which reflects the package's aim to offer a fresh and modern alternative to existing date libraries such as Moment.js.

## Contributing
Contributions are welcome! If you have any improvements or new features you'd like to add to Laima, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or improvement.
3. Make the necessary changes and commit them.
4. Push your branch to your forked repository.
5. Submit a pull request to the main repository.

* Please ensure that your code follows the established coding conventions and includes appropriate tests for any new functionality.

## Licença
Laima is licensed under the MIT license. Please refer to the LICENSE file for more information.

## Doações
If you enjoyed using Laima, please consider making a donation to support the continuous development of the project. You can make a donation using one of the following options:
* Pix: rodrigo@hangell.org

* Cryptocurrencies or nft MetaMask: 0xEd4d1be72F807Faa358C966a8eF63367c200130F

![Created By](https://avatars.githubusercontent.com/u/53544561?v=4)



<div>
<a href="https://hangell.org" target="_blank"><img src="https://img.shields.io/badge/website-000000?style=for-the-badge&logo=About.me&logoColor=white" target="_blank"></a>
  <a href="https://play.google.com/store/apps/dev?id=5606456325281613718" target="_blank"><img src="https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white" target="_blank"></a>
  <a href="https://www.youtube.com/channel/UC8_zG7RFM2aMhI-p-6zmixw" target="_blank"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" target="_blank"></a>
  <a href="https://www.facebook.com/hangell.org" target="_blank"><img src="	https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/rodrigo-rangel-a80810170" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>

</div>
