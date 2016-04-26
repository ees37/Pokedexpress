(function(){
    "use strict";
    (function(Handlebars){
        Handlebars.registerHelper('getFieldValues', function(model, isPokemon) {
            var values = "",
                results = "";

            if(model !== undefined) {
                values = _.values(model);

                if(isPokemon){
                    values.forEach(function(value){
                        results += '<td>' + value + 'some image</td>';
                    });
                }else{
                    values.forEach(function(value){
                        results += '<td>' + value + '</td>';
                    });
                }
            }

            return results;
        });
    }(Handlebars));
}).call(this);