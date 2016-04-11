(function(){
    "use strict";
    this.App.module("MainController.HomePage", function(HomePage, App, Backbone, Marionette, $, _){

        HomePage.MainLayout = Backbone.Marionette.ItemView.extend({
            template: "main_layout",
            tagName: "div",
            events:{
                "click #queryButton": "submitBtnClick"
            },

            submitBtnClick: function(event){
                debugger;
            }
        });

    })
}).call(this);