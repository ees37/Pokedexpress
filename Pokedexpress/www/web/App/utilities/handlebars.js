(function(){
    "use strict";
    (function(Handlebars, Backbone){
        Backbone.Marionette.Renderer.render = function ( templateId, data ) {
            var template = Handlebars.templates[templateId](data);

            if(template){
                return template;
            }
            else{
                throw "Template " + templateId + " wasn't found."
            }
        };
    }(Handlebars, Backbone));
}).call(this);