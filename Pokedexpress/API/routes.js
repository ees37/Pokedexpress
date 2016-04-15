var exampleModule = require("Modules/exampleModule.js");

module.exports = {
    getRoutes: function(app){
        app.use('/', exampleModule);
        app.use('/users', exampleModule.login);
    }
};




