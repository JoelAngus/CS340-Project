//Code adapted and expanded on from the CS340 nodeJS starter code 
//    The following link was first accessed on 2/27/2024:
//
//      https://github.com/osu-cs340-ecampus/nodejs-starter-app
//
// For delete_customer.js, the original code was modified to be functional for the tables in our database, this meant changing names to 
// function with the rest of our code as long as including "reload" calls to better support multiple pages


function deleteCustomer(customer_id) {
    // Put our data we want to send in a javascript object
    console.log("Delete clucked");
    let data = {
        customer_id: customer_id
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-customer-ajax/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(customer_id);
            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
            console.log(xhttp.status);
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload();
}

function deleteEmployee(employee_id) {
  // Put our data we want to send in a javascript object
  console.log("Delete clucked");
  let data = {
      employee_id: employee_id
  };
  
  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-employee-ajax/", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 204) {

          // Add the new data to the table
          deleteRow(employee_id);
          location.reload();

      }
      else if (xhttp.readyState == 4 && xhttp.status != 204) {
          console.log("There was an error with the input.")
          console.log(xhttp.status);
      }
  }
  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
  location.reload();
}

function deleteRow(customer_id){

    let table = document.getElementById("customer-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customer_id) {
            table.deleteRow(i);
            deleteDropDownMenu(customer_id);
            break;
       }
    }
}


function deleteDropDownMenu(customer_id){
  let selectMenu = document.getElementById("mySelect");
  for (let i = 0; i < selectMenu.length; i++){
    if (Number(selectMenu.options[i].value) === Number(customer_id)){
      selectMenu[i].remove();
      break;
    } 

  }
}