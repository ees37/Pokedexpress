(function(){
    "use strict";
    this.App.module("MainController.HomePage", function(HomePage, App, Backbone, Marionette, $, _){
        HomePage.Controller = {
            showView: function (options) {
                var _this = this;

                var homePage = _this.getLayoutView(),
                    textView = _this.getTextView("");
                App.mainRegion.show(homePage);
                homePage.textRegion.show(textView);

                App.on("Submit:Btn:Clicked", function(sqlQuery){
                    App.request("get:Main:Query", sqlQuery, function(sqlQueryResult){
                        //Renables the query button
                        $("#queryButton").removeClass("disabled");

                        if(sqlQueryResult === "failed"){
                            alert("ERROR: Failed to query the database. Please check your connection.");
                        }
                        else{
                            textView = _this.getTextView({
                                sqlQueryResult: sqlQueryResult
                            });

                            homePage.textRegion.show(textView);
                        }
                    });
                });
            },

            getLayoutView: function(){
                return new HomePage.MainLayout();
            },

            getTextView: function(data){
                return new HomePage.TextView({
                    collection: data.sqlQueryResult
                });
            }
        };

    });
}).call(this);