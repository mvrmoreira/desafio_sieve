var Pagination = {

    itemsPerPage: 1,
    start: 0,
    count: 0,

    setCount: function(count){
        this.count = count;
        this.setVisibility();
    },
    setVisibility: function(){
        var visibility;
        if (this.start >= this.count - 1)
        {
            visibility = "none";
        }
        else
        {
            visibility = "";
        }
        document.getElementById("pagination").style.display = visibility;
    },
    getStart: function(){
        return this.start;
    },
    getLimit: function(){
        return this.itemsPerPage;
    },
    loadNextPage: function(){
        this.start += this.itemsPerPage;
        Application.loadEmails();
    },
    reset: function(){
        this.start = 0;
        this.setCount(0);
    }

};