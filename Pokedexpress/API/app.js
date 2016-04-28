//requires
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mysql = require('mysql');

//Fire up Express
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// connect to mysql
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pokedexpress'
});

// make sure the connection is good
connection.connect(function(err){
    if (err) throw err;
    console.log('Connected!')
});

//Port to listen on
app.listen(8008);

app.use('/home', function(request, response, next){
   console.log('Inside app.use');
    next();
});

/* HTTP GET for placing database information on the home page. */
app.get('/home', function(request, response)
{
    console.log('Inside GET');
    var query = request.query['sqlQuery'].toString().split(" ");  //Split the users input at blankspaces
    var query_string = 'SELECT * FROM '; //Every query needs to at least have this information to start

    for (i = 0; i < query.length; i++) //Now we need to build our query and guard against injections
    {
        if (i == 0)
        {
            query_string = query_string + query[i]; //Append the table name
        }
        else if (query[i])
        {
            if (i < 2)
            {
                //If a specific value is specified, we need to add the WHERE clause
                query_string = query_string + ' WHERE identifier = ' + mysql.escape(query[i]);
                //The escape function guards against injection attacks
            }
            else
            {
                //If two or more specific values are entered
                query_string = query_string + ' OR identifier = ' + mysql.escape(query[i]);
            }
        }

    }

    //Now we are ready to query the database
    connection.query(query_string, function(error, results, fields)
    {
        if(error)
        {
            response.status(500).send(error);
            console.log(error.toString())
        }
        response.send(results);
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;  //Just in case we want to use this elsewhere


