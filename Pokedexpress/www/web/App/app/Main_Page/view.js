(function(){
    "use strict";
    this.App.module("MainController.HomePage", function(HomePage, App, Backbone, Marionette, $, _){

        HomePage.MainLayout = Backbone.Marionette.LayoutView.extend({
            template: "main_layout",
            tagName: "div",
            serializeData:function(){
                var sqlQueryResult = this.options.sqlQueryResult;

                return {
                    sqlQueryResult: sqlQueryResult
                }
            },
            triggers:{
                "click #queryButton": "submit:Btn:Clicked"
            }
        });
        
        

    })
}).call(this);