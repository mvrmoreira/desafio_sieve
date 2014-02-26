var View = {

    container: document.getElementById('tbodyEmails'),

    render: function(context){
        context.emails.forEach(function(email){
            View.addEmail(email);
        });
    },

    reset: function(){
        this.container.innerHTML = "";
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
    }

};