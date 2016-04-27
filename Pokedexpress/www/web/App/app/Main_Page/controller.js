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
                    //Re-Enables the query button
                    $("#queryButton").removeClass("disabled");

                    if(sqlQuery.length < 0 || sqlQuery === ""){
                        alert("Invalid SQL query string.");
                    }
                    else{
                        App.request("get:Main:Query", sqlQuery, function(sqlQueryResult){
                            if(sqlQueryResult === "failed"){
                                alert("ERROR: Failed to query the database. Please check your connection.");
                            }
                            else{
                                var tableName = (sqlQuery.indexOf('pokedexpress.') !== -1 ? (sqlQuery.split('pokedexpress.'))[1].split(" ")[0] : "");
                                textView = _this.getTextView({
                                    sqlQueryResult: sqlQueryResult,
                                    tableName: tableName
                                });

                                homePage.textRegion.show(textView);
                            }
                        });
                    }
                });
            },

            getLayoutView: function(){
                return new HomePage.MainLayout();
            },

            getTextView: function(data){
                return new HomePage.TextView({
                    collection: data.sqlQueryResult,
                    tableName: data.tableName
                });
            }
        };

    });
}).call(this);
