/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
PORT = 9923;

// Database
var db = require('./database/db-connector');

// Handlebars
var exphbs = require('express-handlebars');
const { query } = require('express');
app.engine('.hbs', exphbs.engine({
    extname: ".hbs"
}));
app.set('view engine', '.hbs');

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        let query1 = "SELECT * FROM customer;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('index', {data: rows});
        })
    });
    app.get('/customer.html', function(req, res)
    {
        let query1 = "SELECT * FROM customer;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('./index/customer', {data: rows});
        })
    });

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});