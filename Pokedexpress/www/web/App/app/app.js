(function(){
    "use strict";
    this.App.module("MainController", function(MainController, App, Backbone, Marionette, $, _){

        var appRouterHandler = {
           "": "getHomePage",
           "home": "getHomePage"
        };
        
        var API = {
            getHomePage: function(options){
                return MainController.HomePage.Controller.showView();
            }
        };

        MainController.Router = Backbone.Marionette.AppRouter.extend({
            appRoutes: appRouterHandler,
            controller: API
        });

        App.addInitializer(function(options){
            return new MainController.Router();
        });

    })
}).call(this);