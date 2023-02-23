'use strict';

class laima {
    constructor() {
        this.name = 'laima';
    }

    getEpochTime() {
        return new Date().getTime();
    }

// Função para verificar a diferença entre duas datas em milissegundos
    getTimeDifference(date1, date2) {
        return Math.abs(date1 - date2);
    }

// Função para converter uma data para o formato de banco de dados (YYYY-MM-DD)
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

// Função para converter uma data de banco de dados (YYYY-MM-DD) para um objeto Date
    parseDateFromDB(dateString) {
        const parts = dateString.split("-");
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }
}

module.exports = new laima();