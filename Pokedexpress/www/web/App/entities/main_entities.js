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
                return $.ajax({
                    url: "/home",
                    type: 'GET',
                    data: { sqlQuery: sqlQuery} ,
                    datatype: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (response) {
                        var collection = new Entities.QueryCollection(response);
                        return callBack(collection);
                    },
                    error: function () {
                        return callBack("failed");
                    }
                });
            }
        };

        App.reqres.setHandler('get:Main:Query', function(sqlQuery, callBack){
            return API.getQuery(sqlQuery, callBack);
        });

    })
}).call(this);