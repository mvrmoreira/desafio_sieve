var Application = {

    url: 'api.php',
    orderField: 'date',
    orderType: 'asc',
    searchStatus: 0,

    getNewXMLHttpRequest: function()
    {
        var request;
        if (window.XMLHttpRequest)
        {
            request = new XMLHttpRequest();
        }
        else
        {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return request;
    },

    fetch: function (onSuccess, params) {
        View.displayLoading();
        var request = this.getNewXMLHttpRequest();

        request.onreadystatechange = function(){
            if (request.readyState == 4 && request.status == 200) // onSuccess request
            {
                // eval json string
                var response = eval('(' + request.response + ')');
                onSuccess(response);
                View.hideLoading();
            }
        }

        request.open("GET", this.url + "?" + params, true);
        request.send();
    },

    getEmails: function (onSuccess, orderField, orderType, start, limit, date, name, subject) {
        // TODO: refatorar
        this.fetch(onSuccess, 'start='+start+'&limit='+limit+'&orderField='+orderField+'&orderType='+orderType+'&date='+date+'&name='+name+'&subject='+subject);
    },

    loadEmails: function () {
        // TODO: refatorar
        this.getEmails(this.callView,
            this.orderField, this.orderType,
            Pagination.getStart(), Pagination.getLimit(),
            this.getSearchField('date'), this.getSearchField('name'), this.getSearchField('subject')
        );
    },

    callView: function(response){
        Pagination.setCount(response.count);
        View.render({emails: response.data});
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

    activateSearch: function(){
        this.searchStatus = 1;
        this.reset();
        this.loadEmails();
    },

    resetSearch: function(){
        this.searchStatus = 0;
        this.reset();
        this.loadEmails();
    },

    getSearchField: function(field){
        if (this.searchStatus == 1)
            return document.getElementById("input"+field.capitalize()).value;
        else
            return "";
    },

    reset: function(){
        View.reset();
        Pagination.reset();
    }

};