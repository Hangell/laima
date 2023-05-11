export default class laima {

    /**
     * Retorna horario do Epoch
     * @returns {number} Epoch time
     */
    getEpochTime() {
        return new Date().getTime();
    }

    /**
     * Converte um valor de epoch em um objeto Date.
     *
     * @param {number} epochTime - O valor de epoch a ser convertido.
     * @returns {Date} Um objeto Date correspondente ao valor de epoch fornecido.
     */
    epochToDate(epochTime: number): Date {
        return new Date(epochTime);
    }

    /**
     * Converte um objeto Date em um valor de epoch.
     *
     * @param {Date} date - O objeto Date a ser convertido.
     * @returns {number} O valor de epoch correspondente ao objeto Date fornecido.
     */
    dateToEpoch(date: Date): number {
        return date.getTime();
    }

    /**
     * Calcula a diferença de tempo em dias entre dois valores de epoch.
     *
     * @param {number} epoch1 - O primeiro valor de epoch.
     * @param {number} epoch2 - O segundo valor de epoch.
     * @returns {number} A diferença de tempo em dias entre os dois valores de epoch.
     */
    getDaysDifferenceBetweenEpochs(epoch1: number, epoch2: number): number {
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const daysDifference = Math.abs(epoch1 - epoch2) / millisecondsPerDay;
        return Math.round(daysDifference);
    }

    /**
     * Calcula a diferença de tempo em dias entre duas datas.
     *
     * @param {Date} date1 - A primeira data.
     * @param {Date} date2 - A segunda data.
     * @returns {number} A diferença de tempo em dias entre as duas datas.
     */
    getDaysDifference(date1: Date, date2: Date): number {
        const epoch1 = date1.getTime();
        const epoch2 = date2.getTime();
        return this.getDaysDifferenceBetweenEpochs(epoch1, epoch2);
    }

    /**
     * Calcula a diferença de tempo em milissegundos entre duas datas.
     * 
     * @param {Date} date1 - A primeira data.
     * @param {Date} date2 - A segunda data.
     * @returns {number} A diferença de tempo em milissegundos entre as duas datas.
     */
    getTimeDifference(date1: Date, date2: Date): number {
        return Math.abs(date1.getTime() - date2.getTime());
    }


    /**
     * Formata uma data no padrão de banco de dados (YYYY-MM-DD).
     * 
     * @param {Date} date - A data a ser formatada.
     * @returns {string} A data formatada no padrão de banco de dados (YYYY-MM-DD).
     */
    formatDateForDB(date: Date): string {
        const year = date.getFullYear();
        const monthNumber = date.getMonth() + 1;
        const dayNumber = date.getDate();
    
        const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber.toString();
        const day = dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();
    
        return `${year}-${month}-${day}`;
    }

    /**
     * Converte uma data no formato dd-mm-YYYY para um objeto Date.
     *
     * @param {string} dateString - A data em formato de string (dd-mm-YYYY) a ser convertida.
     * @returns {Date} Um objeto Date correspondente à data fornecida em formato de string.
     */
    parseDateFromDB(dateString: string): Date {
        console.log('ATUALIZADA');
        const [day, month, year] = dateString.split("-");
        return new Date(Number(year), Number(month) - 1, Number(day));
    }


    /**
     * Adiciona um número específico de dias a uma data.
     * 
     * @param {Date} date - A data base à qual os dias serão adicionados ou subtraídos.
     * @param {number} days - O número de dias a serem adicionados (positivo) ou subtraídos (negativo) à data base.
     * @returns {Date} Um novo objeto Date com os dias adicionados ou subtraídos.
     */
    addDays(date: Date, days: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }


    /**
     * Subtrai um número específico de dias a uma data.
     * 
     * @param {Date} date - A data base à qual os dias serão adicionados ou subtraídos.
     * @param {number} days - O número de dias a serem adicionados (positivo) ou subtraídos (negativo) à data base.
     * @returns {Date} Um novo objeto Date com os dias adicionados ou subtraídos.
     */
    subDays(date: Date, days: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - days);
        return newDate;
    }


    /**
     * Retorna a maior (mais recente) de duas datas.
     *
     * @param {Date} date1 - A primeira data.
     * @param {Date} date2 - A segunda data.
     * @returns {Date} A maior (mais recente) das duas datas fornecidas.
     */
    getMaxDate(date1: Date, date2: Date): Date {
        return date1 > date2 ? date1 : date2;
    }

    /**
     * Retorna a menor (mais antiga) de duas datas.
     *
     * @param {Date} date1 - A primeira data.
     * @param {Date} date2 - A segunda data.
     * @returns {Date} A menor (mais antiga) das duas datas fornecidas.
     */
    getMinDate(date1: Date, date2: Date): Date {
        return date1 < date2 ? date1 : date2;
    }

    /**

     Função que retorna a data e hora atuais em um formato específico.
     @param formatString Formato desejado da data e hora. Caso não seja fornecido, o formato padrão é 'YYYY-MM-DD HH:mm:ss'.
     Possíveis valores para formatação:
     YYYY - ano completo
     MM - mês com dois dígitos (ex: 02)
     M - mês sem zeros à esquerda (ex: 2)
     DD - dia com dois dígitos (ex: 07)
     D - dia sem zeros à esquerda (ex: 7)
     HH - hora com dois dígitos no formato 24h (ex: 19)
     H - hora sem zeros à esquerda no formato 24h (ex: 9)
     hh - hora com dois dígitos no formato 12h (ex: 07)
     h - hora sem zeros à esquerda no formato 12h (ex: 7)
     mm - minutos com dois dígitos (ex: 03)
     m - minutos sem zeros à esquerda (ex: 3)
     ss - segundos com dois dígitos (ex: 09)
     s - segundos sem zeros à esquerda (ex: 9)
     a - 'am' ou 'pm' (apenas quando combinado com 'h' ou 'hh')
     @returns Data e hora atuais no formato especificado.
     */
    format(formatString) {
        const date = new Date();
        const year = date.getFullYear();
        const monthNumber = date.getMonth() + 1;
        const dayNumber = date.getDate();
        const hoursNumber = date.getHours();
        const minutesNumber = date.getMinutes();
        const secondsNumber = date.getSeconds();

        const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber.toString();
        const day = dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();
        const hours = hoursNumber < 10 ? `0${hoursNumber}` : hoursNumber.toString();
        const minutes = minutesNumber < 10 ? `0${minutesNumber}` : minutesNumber.toString();
        const seconds = secondsNumber < 10 ? `0${secondsNumber}` : secondsNumber.toString();

        const replacements = {
            'YYYY': year.toString(),
            'YY': year.toString().substr(-2),
            'MM': month,
            'M': monthNumber.toString(),
            'DD': day,
            'D': dayNumber.toString(),
            'HH': hours,
            'H': hoursNumber.toString(),
            'hh': (hoursNumber % 12 || 12).toString().padStart(2, '0'),
            'h': (hoursNumber % 12 || 12).toString(),
            'mm': minutes,
            'm': minutesNumber.toString(),
            'ss': seconds,
            's': secondsNumber.toString(),
        };

        let formattedDate = formatString || 'YYYY-MM-DD HH:mm:ss';

        for (const replacement in replacements) {
            formattedDate = formattedDate.replace(replacement, replacements[replacement]);
        }

        return formattedDate;
    }
}