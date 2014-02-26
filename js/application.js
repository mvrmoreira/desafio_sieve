var Application = {

    url: 'api.php',
    orderField: 'date',
    orderType: 'asc',

    parseJson: function (request) {
        var response = eval('(' + request.response + ')');
        return response;
    },

    fetch: function (parseResponse, params) {
        View.displayLoading();
        var request = new XMLHttpRequest();
        request.open("GET", this.url + "?" + params, false);
        request.send();

        if (request.readyState == 4 && request.status == 200) // onSuccess request
        {
            View.hideLoading();
            return parseResponse(request);
        }
        else
        {
            View.hideLoading();
            alert("Oops!");
        }
    },

    getEmails: function (start, limit) {
        var response = this.fetch(this.parseJson, 'start='+start+'&limit='+limit+'&orderField='+this.orderField+'&orderType='+this.orderType);
        Pagination.setCount(response.count);
        return response.data;
    },

    loadEmails: function () {
        var context = {
            emails: this.getEmails(Pagination.getStart(), Pagination.getLimit())
        };

        View.render(context);
    },

    start: function () {
        this.loadEmails();
    },

    setOrderType: function(orderField){
        if (this.orderField != orderField) //quando clica pela primeira vez no campo
        {
            this.orderType = 'asc';
        }
        else
        {
            // nao foi a primeira vez, entao troca o tipo
            if (this.orderType == 'asc')
            {
                this.orderType = 'desc';
            }
            else
            {
                this.orderType = 'asc';
            }
        }
        View.setOrderTypeIndicator(orderField, this.orderType);
    },

    setOrderField: function(orderField){
        this.setOrderType(orderField);
        this.orderField = orderField;
        this.reset();
        this.loadEmails();
    },

    reset: function(){
        View.reset();
        Pagination.reset();
    }

};