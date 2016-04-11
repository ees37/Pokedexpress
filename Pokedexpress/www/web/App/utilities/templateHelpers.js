(function(){
    "use strict";
    (function(Handlebars){
        Handlebars.registerHelper('something', function(text, url) {
            text = Handlebars.Utils.escapeExpression(text);
            url  = Handlebars.Utils.escapeExpression(url);

            var result = '<a href="' + url + '">' + text + '</a>';

            return new Handlebars.SafeString(result);
        });
    }(Handlebars));
}).call(this);