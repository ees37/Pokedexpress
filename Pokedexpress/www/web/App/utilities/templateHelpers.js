(function(){
    "use strict";
    (function(Handlebars){
        Handlebars.registerHelper('getFieldValues', function(model, tableName) {
            var values = "",
                results = "",
                audio = "",
                image = "";

            if(model !== undefined) {
                values = _.values(model);

                if(tableName === "items"){
                    image = '<img src=/images/' + tableName + '/' + values[1] + '.png>';
                }
                else{
                    image = '<img src=/images/' + tableName + '/' + values[0] + '.png>';
                }

                if(tableName === "pokemon"){
                    audio = '<audio id="pokemon_audio_' + values[0] + '" preload="auto"><source src="audio/cries/' + values[0] + '.ogg" type="audio/ogg"></audio>';
                }

                results += '<td id="pokemon_ ' + values[0] + '"><span id="pokemon_img">'+ image + audio +'</span></td>';
                
                values.forEach(function(value){
                      results += '<td>' + value + '</td>';
                });
            }

            return results;
        });
    }(Handlebars));
}).call(this);
