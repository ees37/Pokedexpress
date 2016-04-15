var exampleModule = require("Modules/exampleModule.js"); // Pulls module from a local file

module.exports = {
    getRoutes: function(app){
        app.get('/', exampleModule.getSomething);
        app.get('/users', exampleModule.login);
    }
};




