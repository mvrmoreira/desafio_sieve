var Helper = {

    /*
     * retorna a data no formato dd/mm/yyyy
     */
    formatDate: function(date)
    {
        return this.formatNumber(date.getDate(), 2) + '/' + this.formatNumber(date.getMonth() + 1, 2) + '/' + date.getFullYear();
    },

    /*
     * retorna a hora no formato hh:mm
     */
    formatTime: function(date)
    {
        return this.formatNumber(date.getHours(), 2) + ':' + this.formatNumber(date.getMinutes(), 2);
    },

    /*
     * funcao para preencher string com zeros a esquerda
     */
    formatNumber: function(number, length)
    {
        number = number.toString();
        if (number.length >= length) return number;

        while (number.length < length)
        {
            number = '0' + number;
        }

        return number;
    }

};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}