declare class laima {
    /**
     * Retorna horario do Epoch
     * @returns {number} Epoch time
     */
    getEpochTime(): number;
    /**
     * Converte um valor de epoch em um objeto Date.
     *
     * @param {number} epochTime - O valor de epoch a ser convertido.
     * @returns {Date} Um objeto Date correspondente ao valor de epoch fornecido.
     */
    epochToDate(epochTime: number): Date;
    /**
     * Converte um objeto Date em um valor de epoch.
     *
     * @param {Date} date - O objeto Date a ser convertido.
     * @returns {number} O valor de epoch correspondente ao objeto Date fornecido.
     */
    dateToEpoch(date: Date): number;
    /**
     * Calcula a diferença de tempo em milissegundos entre duas datas.
     *
     * @param {Date} date1 - A primeira data.
     * @param {Date} date2 - A segunda data.
     * @returns {number} A diferença de tempo em milissegundos entre as duas datas.
     */
    getTimeDifference(date1: Date, date2: Date): number;
    /**
     * Formata uma data no padrão de banco de dados (YYYY-MM-DD).
     *
     * @param {Date} date - A data a ser formatada.
     * @returns {string} A data formatada no padrão de banco de dados (YYYY-MM-DD).
     */
    formatDateForDB(date: Date): string;
    /**
     * Converte uma data no formato de banco de dados (YYYY-MM-DD) para um objeto Date.
     *
     * @param {string} dateString - A data em formato de string (YYYY-MM-DD) a ser convertida.
     * @returns {Date} Um objeto Date correspondente à data fornecida em formato de string.
     */
    parseDateFromDB(dateString: string): Date;
    /**
     * Adiciona um número específico de dias a uma data.
     *
     * @param {Date} date - A data base à qual os dias serão adicionados ou subtraídos.
     * @param {number} days - O número de dias a serem adicionados (positivo) ou subtraídos (negativo) à data base.
     * @returns {Date} Um novo objeto Date com os dias adicionados ou subtraídos.
     */
    addDays(date: Date, days: number): Date;
    /**
     * Subtrai um número específico de dias a uma data.
     *
     * @param {Date} date - A data base à qual os dias serão adicionados ou subtraídos.
     * @param {number} days - O número de dias a serem adicionados (positivo) ou subtraídos (negativo) à data base.
     * @returns {Date} Um novo objeto Date com os dias adicionados ou subtraídos.
     */
    subDays(date: Date, days: number): Date;
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
    format(date: Date, formatString: string): string;
}
declare const _default: laima;
export default _default;
