(function(){
    "use strict";
    this.App.module("MainController.HomePage", function(HomePage, App, Backbone, Marionette, $, _){

        HomePage.Controller = {
            showView: function (options) {
                var _this = this;

                var homePage = _this.getLayoutView("");
                App.mainRegion.show(homePage);

                App.listenTo(homePage, "submit:Btn:Click", function(sqlQuery){
                    debugger;
                    App.request("get:Main:Query", sqlQuery, function(sqlQueryResult){
                        homePage = _this.getLayoutView({
                            sqlQueryResult: sqlQueryResult
                        });

                        App.mainRegion.show(homePage);
                    });
                });

                App.listenTo(homePage, "destroy", function(){
                    _this.HomePage.Controller.destroy();
                });
            },

            getLayoutView: function(data){
                return new HomePage.MainLayout({
                    sqlQueryResult: data.sqlQueryResult
                });
            }
        };

    });
}).call(this);