(function(){
    "use strict";
    this.App.module("MainController.HomePage", function(HomePage, App, Backbone, Marionette, $, _){

        HomePage.Controller = {
            showView: function (options) {
                var _this = this;

                App.request("get:Main:Entity", function(data){
                    debugger;
                    var homePage = _this.getLayoutView(data);
                    App.mainRegion.show(homePage);

                    App.listenTo("submit:Btn:Click", function(sqlQuery){

                    });
                });
            },

            getLayoutView: function(data){
                return new HomePage.MainLayout({
                    data: data
                });
            }
        };

    });
}).call(this);