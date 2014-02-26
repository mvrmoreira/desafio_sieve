var Application = {

    url: 'api.php',

    parseJson: function (request) {
        var response = eval('(' + request.response + ')');
        return response;
    },

    fetch: function (parseResponse, params) {
        var request = new XMLHttpRequest();
        request.open("GET", this.url + "?" + params, false);
        request.send();

        if (request.readyState == 4 && request.status == 200) // onSuccess request
        {
            return parseResponse(request);
        }
    },

    getEmails: function (start, limit) {
        var response = this.fetch(this.parseJson, 'start='+start+'&limit='+limit);
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
    }

};