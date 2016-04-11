(function(){
    "use strict";
    this.App.module("MainController", function(MainController, App, Backbone, Marionette, $, _){

        var appRouterHandler = {
           "": "getHomePage",
           "home": "getHomePage"
        };
        
        var API = {
            getHomePage: function(options){
                console.log("Returning controller for home page");
                return MainController.HomePage.Controller.showView();
            }
        };

        MainController.Router = Backbone.Marionette.AppRouter.extend({
            appRoutes: appRouterHandler,
            controller: API
        });

        App.addInitializer(function(options){
            console.log('initializing MainController routing...');
            return new MainController.Router();
        });

    })
}).call(this);