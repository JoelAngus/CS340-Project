// App.js

//Code adapted and expanded on from the CS340 nodeJS starter code 
//    The following link was first accessed on 2/27/2024:
//
//      https://github.com/osu-cs340-ecampus/nodejs-starter-app
//
// For app.js, the original code was modified to be functional for the tables in our database, this meant including functionality
// for more than one page, different sized tables with different inputs, and removing code which was not relevant to our project.


/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9924;                 // Set a port number at the top so it's easy to change in the future

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
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.lname === undefined)
    {
        query1 = "SELECT * FROM customer;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM customer WHERE customer_last_name LIKE "${req.query.lname}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM customer;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let people = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let planets = rows;

            console.log(planets, rows)

            // BEGINNING OF NEW CODE

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let planetmap = {}
            planets.map(planet => {
                let id = parseInt(planet.id, 10);

                planetmap[id] = planet["customer_first_name"];
            })

            // Overwrite the homeworld ID with the name of the planet in the people object
            people = people.map(person => {
                return Object.assign(person, {homeworld: planetmap[person.homeworld]})
            })

            // END OF NEW CODE
            return res.render('index', {data: people, customer: planets});
        })
    })
});

app.get('/employee', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.lname === undefined)
    {
        query1 = "SELECT * FROM employee;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM employee WHERE employee_last_name LIKE "${req.query.lname}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM employee;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let people = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let planets = rows;

            console.log(planets, rows)

            // BEGINNING OF NEW CODE

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let planetmap = {}
            planets.map(planet => {
                let id = parseInt(planet.id, 10);

                planetmap[id] = planet["employee_first_name"];
            })

            // Overwrite the homeworld ID with the name of the planet in the people object
            people = people.map(person => {
                return Object.assign(person, {homeworld: planetmap[person.homeworld]})
            })

            // END OF NEW CODE
            return res.render('employee', {data: people, customer: planets});
        })
    })
});

app.get('/products', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.lname === undefined)
    {
        query1 = "SELECT * FROM products;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM products WHERE product_lname LIKE "${req.query.lname}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM products;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let people = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let planets = rows;

            console.log(planets, rows)

            // BEGINNING OF NEW CODE

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let planetmap = {}
            planets.map(planet => {
                let id = parseInt(planet.id, 10);

                planetmap[id] = planet["employee_first_name"];
            })

            // Overwrite the homeworld ID with the name of the planet in the people object
            people = people.map(person => {
                return Object.assign(person, {homeworld: planetmap[person.homeworld]})
            })

            // END OF NEW CODE
            return res.render('products', {data: people, customer: planets});
        })
    })
});

//fix all below until printed done
app.get('/inventory', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.lname === undefined)
    {
        query1 = "SELECT * FROM inventory;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM inventory WHERE location LIKE "${req.query.location}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM inventory;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let people = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let planets = rows;

            // BEGINNING OF NEW CODE

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let planetmap = {}
            planets.map(planet => {
                let id = parseInt(planet.id, 10);

                planetmap[id] = planet["product_inventory_id"];
            })

            // Overwrite the homeworld ID with the name of the planet in the people object
            people = people.map(person => {
                return Object.assign(person, {homeworld: planetmap[person.homeworld]})
            })

            // END OF NEW CODE
            return res.render('inventory', {data: planets, customer: planets});
        })
    })
});

app.get('/order_header', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.lname === undefined)
    {
        query1 = "SELECT * FROM order_header;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM order_header WHERE employee_last_name LIKE "${req.query.lname}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM order_header;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let people = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let planets = rows;


            // BEGINNING OF NEW CODE

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let planetmap = {}
            planets.map(planet => {
                let id = parseInt(planet.id, 10);

                planetmap[id] = planet["employee_first_name"];
            })

            // Overwrite the homeworld ID with the name of the planet in the people object
            people = people.map(person => {
                return Object.assign(person, {homeworld: planetmap[person.homeworld]})
            })
            // END OF NEW CODE
            return res.render('order_header', {data: people, customer: people});
        })
    })
});

app.get('/order_item', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.lname === undefined)
    {
        query1 = "SELECT * FROM order_item;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM employee WHERE order_item_id LIKE "${req.query.order_item_id}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM order_item;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let people = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let planets = rows;

            console.log(planets, rows)

            // BEGINNING OF NEW CODE

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let planetmap = {}
            planets.map(planet => {
                let id = parseInt(planet.id, 10);

                planetmap[id] = planet["employee_first_name"];
            })

            // Overwrite the homeworld ID with the name of the planet in the people object
            people = people.map(person => {
                return Object.assign(person, {homeworld: planetmap[person.homeworld]})
            })

            // END OF NEW CODE
            return res.render('order_item', {data: people, customer: people});
        })
    })
});

app.get('/order_allocation', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.lname === undefined)
    {
        query1 = "SELECT * FROM order_allocation;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM order_allocation WHERE product_inventory_id LIKE "${req.query.product_inventory_id}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM order_allocation;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let people = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let planets = rows;


            // BEGINNING OF NEW CODE

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let planetmap = {}
            planets.map(planet => {
                let id = parseInt(planet.id, 10);

                planetmap[id] = planet["employee_first_name"];
            })

            // Overwrite the homeworld ID with the name of the planet in the people object
            people = people.map(person => {
                return Object.assign(person, {homeworld: planetmap[person.homeworld]})
            })

            console.log("START")
            console.log(people)
            console.log("Break")
            console.log(planets)
            // END OF NEW CODE
            return res.render('order_allocation', {data: people, customer: people});
        })
    })
});

app.post('/add-person-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let homeworld = parseInt(data['input-homeworld']);
    if (isNaN(homeworld))
    {
        homeworld = 'NULL'
    }

    let age = parseInt(data['input-age']);
    if (isNaN(age))
    {
        age = 'NULL'
    }

    // Create the query and run it on the database


    query1 = `INSERT INTO customer (customer_first_name, customer_last_name, customer_email, customer_phone_num, customer_date_joined) VALUES ('${data['input-fname']}', '${data['input-lname']}', '${data['input-homeworld']}', ${age}, 2024-02-29)`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM customer and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
});


app.post('/add-employee-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let homeworld = parseInt(data['input-homeworld']);
    if (isNaN(homeworld))
    {
        homeworld = 'NULL'
    }

    let age = parseInt(data['input-age']);
    if (isNaN(age))
    {
        age = 'NULL'
    }

    // Create the query and run it on the database


    query1 = `INSERT INTO employee (employee_first_name, employee_last_name, employee_email, employee_phone_num, employee_date_hired) VALUES ('${data['input-fname']}', '${data['input-lname']}', '${data['input-homeworld']}', ${age}, 2024-02-29)`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM customer and
        // presents it on the screen
        else
        {
            res.redirect('/employee');
        }
    })
});



app.post('/add-person-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let homeworld = parseInt(data.homeworld);
    if (isNaN(homeworld))
    {
        homeworld = 'NULL'
    }

    let age = parseInt(data.age);
    if (isNaN(age))
    {
        age = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO customer (fname, lname, homeworld, age) VALUES ('${data.fname}', '${data.lname}', ${homeworld}, ${age})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on customer
            query2 = `SELECT customer.id, customer.fname, customer.lname, customer.homeworld, customer.age, bsg_planets.name 
FROM customer 
LEFT JOIN bsg_planets ON customer.homeworld = bsg_planets.id;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-customer-ajax/', function(req,res,next){
  let data = req.body;
  let personID = parseInt(data.customer_id);
  let deletecustomer= `DELETE FROM customer WHERE customer_ID = ?`;

        // Run the 1st query
        db.pool.query(deletecustomer, [personID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

})});

app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    let personID = parseInt(data.employee_id);
    let deletecustomer= `DELETE FROM employee WHERE employee_ID = ?`;
  
          // Run the 1st query
          db.pool.query(deletecustomer, [personID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
  })});

app.put('/put-person-ajax', function(req,res,next){                                   
  let data = req.body;

let homeworld = parseInt(data.homeworld);
  let person = parseInt(data.fullname);

  console.log(person, homeworld)

  queryUpdateWorld = `UPDATE customer SET customer_email = ? WHERE customer.customer_id = ?`;
  selectWorld = `SELECT * FROM customer WHERE customer_id = ?`

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


app.post('/add-inventory-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let homeworld = parseInt(data['input-homeworld']);
    if (isNaN(homeworld))
    {
        homeworld = 'NULL'
    }

    let age = parseInt(data['input-age']);
    if (isNaN(age))
    {
        age = 'NULL'
    }

    // Create the query and run it on the database


    query1 = `INSERT INTO inventory (product_inventory_id, product_id, location, onhand_quantity) VALUES ('${data.product_inventory_id}', '${data.product_id}', ${data.location}, ${data.onhand_quantity})`;

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM customer and
        // presents it on the screen
        else
        {
            res.redirect('/inventory');
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});