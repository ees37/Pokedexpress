var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mysql = require('mysql');
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

connection.connect(function(err){
    if (err) throw err;
    console.log('Connected!')
});

app.listen(8008);

app.use('/home', function(request, response, next){
   console.log('Inside app.use');
    next();
});

/* GET home page. */
app.get('/home', function(request, response)
{
    console.log('Inside GET');
    connection.query(request.query["sqlQuery"].toString(), function(error, results, fields)
    {
        if(error)
        {
            response.status(500).send(error);
            console.log(error.toString())
        }
        console.log(results);
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


module.exports = app;


