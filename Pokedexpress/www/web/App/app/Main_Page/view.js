(function(){
    "use strict";
    this.App.module("MainController.HomePage", function(HomePage, App, Backbone, Marionette, $, _){

        HomePage.MainLayout = Backbone.Marionette.LayoutView.extend({
            template: "main_layout",
            tagName: "div",
            regions:{
                textRegion: "#textAreaRegion"
            }
        });

        HomePage.TextView = Backbone.Marionette.ItemView.extend({
            template: "text_area_layout",
            tagName: "div",
            serializeData:function(){
                var sqlQueryResult = this.options.sqlQueryResult;

                return {
                    sqlQueryResult: sqlQueryResult
                }
            },
            events:{
                "click #queryButton": "submitBtn"
            },
            submitBtn: function(event){
                var sqlQuery = $("#QueryTextBox").val();
                this.trigger("Submit:Btn:Clicked", sqlQuery);
            }
        })
        
        

    })
}).call(this);