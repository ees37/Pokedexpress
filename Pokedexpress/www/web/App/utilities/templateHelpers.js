(function(){
    "use strict";
    (function(Handlebars){
        Handlebars.registerHelper('getFieldValues', function(model, tableName) {
            var values = "",
                results = "";

            if(model !== undefined) {
                values = _.values(model);

                results += '<td><img src=/images/' + tableName + '/' + values[0] + '.png></td>';
                
                values.forEach(function(value){
                      results += '<td>' + value + '</td>';
                });
            }

            return results;
        });
    }(Handlebars));
}).call(this);
