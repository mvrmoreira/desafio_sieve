var View = {

    container: document.getElementById('tbodyEmails'),

    render: function(context){
        context.emails.forEach(function(email){
            View.addEmail(email);
        });
        this.showCount(context.count);
    },

    reset: function(){
        this.container.innerHTML = "";
        document.getElementById("resultsCount").innerHTML = "";
    },

    formatDate: function(sendDate)
    {
        var sendDate = new Date(sendDate);
        var currentDate = new Date();

        // Se a data for hoje, só exibe a hora no formato hh:mm
        if (currentDate.toDateString() == sendDate.toDateString())
        {
            return Helper.formatTime(sendDate);
        }
        else // senão, exibe data no formato dd/mm/aaaa
        {
            return Helper.formatDate(sendDate);
        }
    },

    addEmail: function(email){
        var columns = new Array(this.formatDate(email.date), email.name, email.subject);
        this.addLineToTable(columns);
    },

    addLineToTable: function(columns){
        columns = columns.map(function(column){
            return '<td>' + column + '</td>';
        });
        var htmlColumns = columns.join("");
        var htmlLine = '<tr>' + htmlColumns + '</tr>';

        // append the html to tbody
        this.container.innerHTML = this.container.innerHTML + htmlLine;
    },

    setOrderTypeIndicator: function(orderField, orderType){
        //remove indicador anterior
        document.getElementById("orderTypeIndicator").remove();

        // determina qual indicador usar
        if (orderType == 'asc')
            var indicator = "&#8593;";
        else
            var indicator = "&#8595;";

        // adiciona indicador dentro da coluna correta
        var th = document.getElementById("th"+orderField.capitalize());
        th.innerHTML = th.innerHTML + "<span id='orderTypeIndicator'>" + indicator + "</span>";
    },

    displayLoading: function(){
        document.getElementById("loading").style.display = "";
    },
    hideLoading: function(){
        document.getElementById("loading").style.display = "none";
    },

    showCount: function(count){
        var message;

        if (count == 1)
        {
            message = "1 e-mail found.";
        }
        else
        {
            message = count + " e-mails found.";
        }

        document.getElementById("resultsCount").innerHTML = message;
    }

};