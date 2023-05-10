'use strict';

class laima {
    constructor() {
        this.name = 'laima';
    }

    /**
     * Retorna horario do Epoch
     * @returns {number} Epoch time
     */
    getEpochTime() {
        return new Date().getTime();
    }

    /**
     * Calcula a diferença de tempo em milissegundos entre duas datas.
     * 
     * @param {Date} date1 - A primeira data.
     * @param {Date} date2 - A segunda data.
     * @returns {number} A diferença de tempo em milissegundos entre as duas datas.
     */
    getTimeDifference(date1, date2) {
        return Math.abs(date1 - date2);
    }


    /**
     * Formata uma data no padrão de banco de dados (YYYY-MM-DD).
     * 
     * @param {Date} date - A data a ser formatada.
     * @returns {string} A data formatada no padrão de banco de dados (YYYY-MM-DD).
     */
    formatDateForDB(date) {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`;
        }
        let day = date.getDate();
        if (day < 10) {
            day = `0${day}`;
        }
        return `${year}-${month}-${day}`;
    }

    /**
     * Converte uma data no formato de banco de dados (YYYY-MM-DD) para um objeto Date.
     * 
     * @param {string} dateString - A data em formato de string (YYYY-MM-DD) a ser convertida.
     * @returns {Date} Um objeto Date correspondente à data fornecida em formato de string.
     */
    parseDateFromDB(dateString) {
        const parts = dateString.split("-");
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }


    /**
     * Adiciona um número específico de dias a uma data.
     * 
     * @param {Date} date - A data base à qual os dias serão adicionados ou subtraídos.
     * @param {number} days - O número de dias a serem adicionados (positivo) ou subtraídos (negativo) à data base.
     * @returns {Date} Um novo objeto Date com os dias adicionados ou subtraídos.
     */
    addDays(date, days) {
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
    subDays(date, days) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - days);
        return newDate;
    }

    /**
     * Formata uma data no formato especificado, utilizando marcadores para substituir os componentes da data.
     * Os marcadores aceitos são:
     *   - 'YYYY': Representa o ano com quatro dígitos (exemplo: 2023).
     *   - 'MM': Representa o mês com dois dígitos (01-12).
     *   - 'DD': Representa o dia do mês com dois dígitos (01-31).
     *   - 'HH': Representa a hora no formato de 24 horas com dois dígitos (00-23).
     *   - 'mm': Representa os minutos com dois dígitos (00-59).
     *   - 'ss': Representa os segundos com dois dígitos (00-59).
     *
     * @param {Date} date - A data a ser formatada.
     * @param {string} formatString - A string de formato contendo os marcadores a serem substituídos pelos componentes da data.
     * @returns {string} A data formatada de acordo com a string de formato fornecida.
     */
    format(date, formatString) {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }
        if (hours < 10) {
            hours = `0${hours}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return formatString
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    }

}

module.exports = new laima();
