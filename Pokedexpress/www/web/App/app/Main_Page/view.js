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

        HomePage.TextItemView = Backbone.Marionette.ItemView.extend({
            template: "text_area_item",
            tagName: "tr",
            serializeData: function(){
                return {
                    model: this.model["attributes"]
                }
            }
        });

        HomePage.TextEmptyItemView = Backbone.Marionette.ItemView.extend({
            template: "text_area_empty_item"
        });

        HomePage.TextView = Backbone.Marionette.CompositeView.extend({
            template: "text_area_layout",
            tagName: "div",
            emptyView: HomePage.TextEmptyItemView,
            childView: HomePage.TextItemView,
            childViewContainer: "tbody",
            events:{
                "click #queryButton": "submitBtn"
            },
            submitBtn: function(event){
                //Disables the query button
                $("#queryButton").addClass("disabled");

                //Plays button click
                $("#buttonClickSound")[0].play();
                
                var sqlQuery = $("#QueryTextBox").val();
                App.trigger("Submit:Btn:Clicked", sqlQuery);
            },
            templateHelpers:function(){
                var _this = this;
                return ({
                   getHeaders: function(){
                       var data = _this.collection,
                           headers = "",
                           results = "";
                       if(data !== undefined && data.length > 0) {
                           headers = _.keys(data.models[0]["attributes"]);

                           headers.forEach(function(header){
                               results += "<th>" + header + "</th>";
                           });
                       }

                       return results;
                   }
                });
            }
        })
        
        

    })
}).call(this);