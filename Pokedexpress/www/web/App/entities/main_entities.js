(function(){
    "use strict";
    this.App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){

        Entities.QueryModel = Backbone.Model.extend({
            id: 'mainQueryModel'
        });

        Entities.QueryCollection = Backbone.Collection.extend({
            model: Entities.QueryModel,
            id: 'mainQueryCollection'
        });

        var API = {

            getQuery: function(sqlQuery, callBack){
                console.log("sqlQuery: " + sqlQuery);
                return $.ajax({
                    url: "/home",
                    type: 'GET',
                    data: { sqlQuery: sqlQuery} ,
                    datatype: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (response) {
                        console.log(response);
                        var collection = new Entities.QueryCollection(response);
                        callBack(collection);
                    },
                    error: function () {
                        alert("ERROR: Failed to get Main Query.");
                    }
                });
            }
        };

        App.reqres.setHandler('get:Main:Query', function(sqlQuery, callBack){
            return API.getQuery(sqlQuery, callBack);
        });

    })
}).call(this);