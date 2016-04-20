(function(){
    "use strict";
    (function(Handlebars){
        Handlebars.registerHelper('getFieldValues', function(model) {
            var values = "",
                results = "";

            if(model !== undefined) {
                values = _.values(model);

                values.forEach(function(value){
                    results += '<td>' + value + '</td>';
                });
            }

            return results;
        });
    }(Handlebars));
}).call(this);