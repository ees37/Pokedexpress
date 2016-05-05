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

                switch(tableName)
                {
                  // filter out tables that do not contain images
                  case "items":
                  case "pokemon":
                  case "regions":
                  {
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
                  }
                  break;
                  default:
                  break;
                }

                values.forEach(function(value){
                      results += '<td>' + value + '</td>';
                });
            }

            return results;
        });
    }(Handlebars));
}).call(this);
