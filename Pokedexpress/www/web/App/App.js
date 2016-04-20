(function(){
    "use strict";
    this.App = (function(Backbone, Marionette){
        var App = new Backbone.Marionette.Application();

        App.addRegions({
           mainRegion: "#mainRegion"
        });

        App.navigate = function(route,  options){
            options || (options = {});
            Backbone.history.navigate(route, options);
        };

        App.getCurrentRoute = function () {
            return Backbone.history.fragment;
        };

        //Start history when our application is ready
        App.on('start', function() {
            if(Backbone.history){
                Backbone.history.start();
            }

            if(App.getCurrentRoute() === ""){
                App.navigate('//home');
            }

        });

        return App;
    })(Backbone, Marionette);
    
}).call(this);
