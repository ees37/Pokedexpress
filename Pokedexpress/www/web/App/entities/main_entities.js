(function(){
    "use strict";
    this.App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){

        Entities.QueryModel = Backbone.Model.extend({
            url: App.options.IPAddr,
            id: 'mainQuery'
        });

        Entities.QueryCollection = Backbone.Model.extend({
            model: Entities.QueryModel,
            id: 'mainQueryCollection'
        });

        var API = {
            getEntity: function(){
                var entity = new Entities.QueryModel({
                    id: 1,
                    firstName: "Alice",
                    lastName: "Arten",
                    phoneNumber: "555-0184"
                });

                // entity.fetch();

                return entity;
            },

            getEntities: function(){
                var entities = new Entities.QueryCollection();

                entities.fetch();

                return entities;
            },

            getMainQuery: function(sqlQuery, callBack){
                return $.ajax({
                    url: App.options.IPAddr,
                    type: 'GET',
                    data: { sqlQuery: sqlQuery} ,
                    contentType: 'application/json; charset=utf-8',
                    success: function (response) {
                        console.log(response);
                        callBack(response);
                    },
                    error: function () {
                        alert("ERROR: Failed to get Main Query.");
                    }
                });
            }
        };

        App.reqres.setHandler('get:Main:Entity', function(callBack){
            return callBack(API.getEntity());
        });

        App.reqres.setHandler('get:Main:Entities', function(callBack){
            return API.getEntities();
        });

        App.reqres.setHandler('get:Main:Query', function(sqlQuery, callBack){
            return API.getMainQuery(sqlQuery, callBack);
        });


        // var API = {
        //     getContactEntities: function(){
        //         var contacts = new Entities.ContactCollection();
        //         var defer = $.Deferred();
        //         contacts.fetch({
        //             success: function(data){
        //                 defer.resolve(data);
        //             }
        //         });
        //         var promise = defer.promise();
        //         $.when(promise).done(function(fetchedContacts){
        //             if(fetchedContacts.length === 0){
        //                 // if we don't have any contacts yet, create some for convenience
        //                 var models = initializeContacts();
        //                 contacts.reset(models);
        //             }
        //         });
        //         return promise;
        //     },
        //
        //     getEntity: function(id){
        //         var contact = new Entities.Contact({id: id});
        //         var defer = $.Deferred();
        //         setTimeout(function(){
        //             contact.fetch({
        //                 success: function(data){
        //                     defer.resolve(data);
        //                 },
        //                 error: function(data){
        //                     defer.resolve(undefined);
        //                 }
        //             });
        //         }, 2000);
        //         return defer.promise();
        //     }
        // };
    // });

    })
}).call(this);