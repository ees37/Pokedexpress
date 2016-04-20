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

                var response = [
                    {field: "field1", value: "value1", key1: "val1",key2: "val1",key3: "val1",key4: "val1",key5: "val1",key6: "val1"},
                    {field: "field2", value: "value2", key1: "val1"},
                    {field: "field3", value: "value3", key1: "val1"},
                    {field: "field4", value: "value4", key1: "val1"},
                    {field: "field4", value: "value4", key1: "val1"},
                    {field: "field4", value: "value4", key1: "val1"},
                    {field: "field4", value: "value4", key1: "val1"},
                    {field: "field4", value: "value4", key1: "val1"},
                    {field: "field4", value: "value4", key1: "val1"},
                    {field: "field4", value: "value4", key1: "val1"},
                    {field: "field4", value: "value4", key1: "val1"},
                    {field: "field4", value: "value4", key1: "val1"},
                    {field: "field4", value: "value4", key1: "val1"},
                    {field: "field4", value: "value4", key1: "val1"},
                    {field: "field4", value: "value4", key1: "val1"},
                    {field: "field4", value: "value4", key1: "val1"},
                    {field: "field4", value: "value4", key1: "val1"}
                ];

                var collection = new Entities.QueryCollection(response);

                callBack(collection);
                // return $.ajax({
                //     url: "/home",
                //     type: 'GET',
                //     data: { sqlQuery: sqlQuery} ,
                //     datatype: 'json',
                //     contentType: 'application/json; charset=utf-8',
                //     success: function (response) {
                //         console.log(response);
                //         var collection = new Entities.QueryCollection(response);
                //         callBack(collection);
                //     },
                //     error: function () {
                //         alert("ERROR: Failed to get Main Query.");
                //     }
                // });
            }
        };

        App.reqres.setHandler('get:Main:Query', function(sqlQuery, callBack){
            return API.getQuery(sqlQuery, callBack);
        });

    })
}).call(this);