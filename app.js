// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9923;                 // Set a port number at the top so it's easy to change in the future

// app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector')

// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));         // this is needed to allow for the form to use the ccs style sheet/javscript
    

// app.js


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
            res.render('index', {data: rows});
        })
    });

app.delete('/delete-person-ajax/', function(req,res,next){
  let data = req.body;
  let personID = parseInt(data.id);
  let deleteBsg_Cert_People = `DELETE FROM bsg_cert_people WHERE pid = ?`;
  let deletecustomer= `DELETE FROM customer WHERE id = ?`;


        // Run the 1st query
        db.pool.query(deleteBsg_Cert_People, [personID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deletecustomer, [personID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
})});

app.put('/put-person-ajax', function(req,res,next){                                   
  let data = req.body;

  let homeworld = parseInt(data.homeworld);
  let person = parseInt(data.fullname);

  queryUpdateWorld = `UPDATE customer SET homeworld = ? WHERE customer.id = ?`;
  selectWorld = `SELECT * FROM bsg_planets WHERE id = ?`

        // Run the 1st query
        db.pool.query(queryUpdateWorld, [homeworld, person], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else
            {
                // Run the second query
                db.pool.query(selectWorld, [homeworld], function(error, rows, fields) {
        
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
})});



/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});