
--Daniel Nikolov and Joel Angus (Group 117)
SET FOREIGN_KEY_CHECKS=0;


CREATE OR REPLACE TABLE customer (
    customer_id INT NOT NULL AUTO_INCREMENT,
    customer_first_name VARCHAR(255) NOT NULL,
    customer_last_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone_num VARCHAR(255),
    customer_date_joined DATE NOT NULL,
    PRIMARY KEY (customer_id)
);




CREATE OR REPLACE TABLE employee (
    employee_id INT NOT NULL AUTO_INCREMENT,
    employee_first_name VARCHAR(255) NOT NULL,
    employee_last_name VARCHAR(255) NOT NULL,
    employee_date_hired DATE NOT NULL,
    employee_email VARCHAR(255),
    employee_phone_num VARCHAR(255),
    PRIMARY KEY (employee_id)
);




CREATE OR REPLACE TABLE products (
    product_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    product_is_clearance BOOLEAN NOT NULL,
    product_type VARCHAR(255) NOT NULL,
    product_retail_price FLOAT NOT NULL,
    PRIMARY KEY (product_id)
);




CREATE OR REPLACE TABLE order_header (
    order_header_id INT NOT NULL AUTO_INCREMENT,
    customer_id INT NOT NULL,
    employee_id INT NOT NULL,
    order_date DATE NOT NULL,
    is_return BOOLEAN NOT NULL,
    is_online_order BOOLEAN NOT NULL,
    PRIMARY KEY (order_header_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);




CREATE OR REPLACE TABLE order_item (
    order_item_id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    order_header_id INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (order_item_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (order_header_id) REFERENCES order_header(order_header_id)
);






CREATE OR REPLACE TABLE inventory (
    product_inventory_id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    location CHAR(50) NOT NULL,
    onhand_quantity INT NOT NULL,
    PRIMARY KEY (product_inventory_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);


CREATE OR REPLACE TABLE order_allocation (
    order_allocation_id INT NOT NULL AUTO_INCREMENT,
    order_item_id INT NOT NULL,
    product_inventory_id INT NOT NULL,
    allocated_quantity INT NOT NULL,
    PRIMARY KEY (order_allocation_id),
    FOREIGN KEY (order_item_id) REFERENCES order_item(order_item_id),
    FOREIGN KEY (product_inventory_id) REFERENCES inventory(product_inventory_id)
);




INSERT INTO customer(
    customer_first_name,
    customer_last_name,
    customer_email,
    customer_phone_num,
    customer_date_joined
)


VALUES
(
    "Ananya",
    "Jaiswal",
    "ajaiswal@hello.com",
    "503-123-9876",
    '2008-04-10'


),
(
    "Michael",
    "Fern",
    "michaelf@hello.com",
    "123-321-4564",
    '2015-07-19'
),
(
    "Abdul",
    "Rehman",
    "rehman@hello.com",
    "987-012-7684",
    '2018-02-27'
);








INSERT INTO employee (employee_first_name, employee_last_name, employee_date_hired, employee_email,  employee_phone_num)




VALUES
(
    "Alex",
    "Montgomery",
    '2008-04-10',
    "amont@hello.com",
    "123-456-7892"
),
(
    "Zach",
    "Allen",
    '2015-07-19',
    "zallen@hello.com",
    "123-012-7684"
),
(
    "Dylan",
    "Brehm",
    '2018-02-27',
    "dbrehm@hello.com",
    "450-012-7684"
);




INSERT INTO products(
    product_name,
    product_is_clearance,
    product_type,
    product_retail_price
)


VALUES
(
    "Black pants",
    TRUE,
    "pants",
    9.75


),
(
    "Green Shoes",
    FALSE,
    "shoes",
    10.75
),
(
    "Orange jacket",
    TRUE,
    "jacket",
    14.97
);


INSERT INTO inventory(
    product_id,
    location,
    onhand_quantity
)


VALUES
(
    (SELECT product_id FROM products WHERE product_name = "Black pants"),
    "Beaverton",
    9
),
(
    (SELECT product_id FROM products WHERE product_name = "Black pants"),
    "Portland",
    3
),
(
    (SELECT product_id FROM products WHERE product_name = "Green shoes"),
    "Beaverton",
    20
);




INSERT INTO order_header(
    customer_id,
    employee_id,
    order_date,
    is_return,
    is_online_order
)


VALUES
(
    (SELECT customer_id FROM customer WHERE customer_first_name = "Ananya" AND customer_last_name = "Jaiswal"),
    (SELECT employee_id FROM employee WHERE employee_first_name = "Alex" AND employee_last_name = "Montgomery" ),
    '2020-11-19',
    TRUE,
    FALSE
),
(
    (SELECT customer_id FROM customer WHERE customer_first_name = "Michael" AND customer_last_name = "Fern"),
    (SELECT employee_id FROM employee WHERE employee_first_name = "Zach" AND employee_last_name = "Allen" ),
    '2020-12-05',
    FALSE,
    FALSE
),
(
    (SELECT customer_id FROM customer WHERE customer_first_name = "Abdul" AND customer_last_name = "Rehman"),
    (SELECT employee_id FROM employee WHERE employee_first_name = "Dylan" AND employee_last_name = "Brehm" ),
    '2021-01-01',
    FALSE,
    TRUE
);




INSERT INTO order_item(
   product_id,
   order_header_id,
   quantity
)
VALUES
(
   (SELECT product_id FROM products WHERE product_name = "Black pants"),
   (SELECT order_header_id FROM order_header WHERE order_header_id = 1),
   10
),
(
   (SELECT product_id FROM products WHERE product_name = "Green shoes"),
   (SELECT order_header_id FROM order_header WHERE order_header_id = 1),
   2
),
(
   (SELECT product_id FROM products WHERE product_name = "Black pants"),
   (SELECT order_header_id FROM order_header WHERE order_header_id = 2),
   1
),
(
   (SELECT product_id FROM products WHERE product_name = "Green shoes"),
   (SELECT order_header_id FROM order_header WHERE order_header_id = 2),
   1
),
(
   (SELECT product_id FROM products WHERE product_name = "Black pants"),
   (SELECT order_header_id FROM order_header WHERE order_header_id = 3),
   1
);




INSERT INTO order_allocation(
   order_item_id,
   product_inventory_id,
   allocated_quantity)
VALUES
(
   (SELECT order_item_id FROM order_item WHERE order_item_id = 1),
   (SELECT product_inventory_id FROM inventory WHERE product_inventory_id = 1 AND onhand_quantity = 9),
   9
),
(
   (SELECT order_item_id FROM order_item WHERE order_item_id = 1),
   (SELECT product_inventory_id FROM inventory WHERE product_inventory_id = 2 AND onhand_quantity = 3),
   1
),
(
   (SELECT order_item_id FROM order_item WHERE order_item_id = 1),
   (SELECT product_inventory_id FROM inventory WHERE product_inventory_id = 3 AND onhand_quantity = 20),
   2
),
(
   (SELECT order_item_id FROM order_item WHERE order_item_id = 2),
   (SELECT product_inventory_id FROM inventory WHERE product_inventory_id = 2 AND onhand_quantity = 3),
   1
),
(
   (SELECT order_item_id FROM order_item WHERE order_item_id = 2),
   (SELECT product_inventory_id FROM inventory WHERE product_inventory_id = 3 AND onhand_quantity = 20),
   1
),
(
   (SELECT order_item_id FROM order_item WHERE order_item_id = 3),
   (SELECT product_inventory_id FROM inventory WHERE product_inventory_id = 2 AND onhand_quantity = 3),
   1
);




