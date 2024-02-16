
--Daniel Nikolov and Joel Angus (Group 117)
SET FOREIGN_KEY_CHECKS=0;

INSERT INTO customer(
    customer_first_name,
    customer_last_name,
    customer_email,
    customer_phone_num,
    customer_date_joined
)

VALUES
(
    :customer_first_name,
    :customer_last_name,
    :customer_email,
    :customer_phone_num,
    :customer_date_joined
),
(
    :customer_first_name,
    :customer_last_name,
    :customer_email,
    :customer_phone_num,
    :customer_date_joined
),
(
      :customer_first_name,
    :customer_last_name,
    :customer_email,
    :customer_phone_num,
    :customer_date_joined
);




INSERT INTO employee(
    employee_first_name,
    employee_last_name,
    employee_email,
    employee_phone_num,
    employee_date_joined
)

VALUES
(
    :employee_first_name,
    :employee_last_name,
    :mployee_email,
    :employee_phone_num,
    :employee_date_joined
),
(
    :employee_first_name,
    :employee_last_name,
    :mployee_email,
    :employee_phone_num,
    :employee_date_joined
),
(
    :employee_first_name,
    :employee_last_name,
    :mployee_email,
    :employee_phone_num,
    :employee_date_joined
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
    product_inventory_id,
    product_id,
    location,
    onhand_quanity
)


VALUES
(
    :product_inventory_id,
    :product_id,
    :location,
    :onhand_quanity
),
(
   :product_inventory_id,
    :product_id,
    :location,
    :onhand_quanity
),
(
    :product_inventory_id,
    :product_id,
    :location,
    :onhand_quanity
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
   Product_inventory_id,
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




