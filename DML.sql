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



--Inserts into employee

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



--Inserts into products
INSERT INTO products(
    product_name,
    product_is_clearance,
    product_type,
    product_retail_price
)


VALUES
(
    :product_name,
    :product_is_clearance,
    :product_type,
    :product_retail_price


),
(
    :product_name,
    :product_is_clearance,
    :product_type,
    :product_retail_price
),
(
    :product_name,
    :product_is_clearance,
    :product_type,
    :product_retail_price
);


--Inserts into inventory
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



--Inserts into order_header
INSERT INTO order_header(
    customer_id,
    employee_id,
    order_date,
    is_return,
    is_online_order
)


VALUES
(
    :customer_id,
    :employee_id,
    :order_date,
    :is_return,
    :is_online_order
),
(
    :customer_id,
    :employee_id,
    :order_date,
    :is_return,
    :is_online_order
),
(
    :customer_id,
    :employee_id,
    :order_date,
    :is_return,
    :is_online_order
);



--Inserts into order_item
INSERT INTO order_item(
   product_id,
   order_header_id,
   quantity
)
VALUES
(
   :product_id,
   :order_header_id,
   :quantity
),
(
   :product_id,
   :order_header_id,
   :quantity
),
(
   :product_id,
   :order_header_id,
   :quantity
),
(
   :product_id,
   :order_header_id,
   :quantity
),
(
   :product_id,
   :order_header_id,
   :quantity
);



--Inserts into order_allocartion
INSERT INTO order_allocation(
   order_item_id,
   product_inventory_id,
   allocated_quantity)
VALUES
(
   :order_item_id,
   :product_inventory_id,
   :allocated_quantity
),
(
   :order_item_id,
   :product_inventory_id,
   :allocated_quantity
),
(
   :order_item_id,
   :product_inventory_id,
   :allocated_quantity
),
(
   :order_item_id,
   :product_inventory_id,
   :allocated_quantity
),
(
   :order_item_id,
   :product_inventory_id,
   :allocated_quantity
),
(
   :order_item_id,
   :product_inventory_id,
   :allocated_quantity
);


--Below are the required inner join statements
SELECT order_item.order_header_id, (order_header.order_date)
FROM order_item 
   INNER JOIN order_header ON order_header.order_header_id = order_item.order_header_id
   WHERE order_header.order_header_id = order_item.order_header_id;


SELECT order_item.product_id, (products.product_name)
FROM order_item 
   INNER JOIN products ON products.product_id = order_item.product_id
   WHERE products.product_id = order_item.product_id;


SELECT order_allocation.order_item_id, (order_item.quantity)
FROM order_allocation 
   INNER JOIN order_item ON order_item.order_item_id = order_allocation.order_item_id
   WHERE order_item.order_item_id = order_allocation.order_item_id;



SELECT order_allocation.product_inventory_id, (inventory.onhand_quantity)
FROM order_allocation 
   INNER JOIN inventory ON inventory.product_inventory_id = order_allocation.product_inventory_id
   WHERE inventory.product_inventory_id = order_allocation.product_inventory_id;

-- Update customer
UPDATE customer
SET
    customer_email = 'new_email_for_alex@example.com',
    customer_phone_num = 'new_phone_number_for_alex'
WHERE
    customer_id = Alex_Mont_customer_id;

-- Update employee
UPDATE employee
SET
    employee_email = 'new_email_for_alex@example.com',
    employee_phone_num = 'new_phone_number_for_alex'
WHERE
    employee_id = Alex_Mont_employee_id;
    
-- Delete customers
DELETE FROM customer WHERE customer_id IN (Alex_Mont_customer_id, Dylan_Bre_customer_id);

-- Delete employees
DELETE FROM employee WHERE employee_id IN (Alex_Mont_employee_id, Dylan_Bre_employee_id);

-- Delete products
DELETE FROM products WHERE product_id IN (Alex_Mont_product_id1, Alex_Mont_product_id2, Dylan_Bre_product_id1, Dylan_Bre_product_id2);

-- Delete inventory
DELETE FROM inventory WHERE product_inventory_id IN (Alex_Mont_inventory_id1, Alex_Mont_inventory_id2, Dylan_Bre_inventory_id1, Dylan_Bre_inventory_id2);

-- Delete orders
DELETE FROM order_header WHERE order_header_id IN (Alex_Mont_order_header_id1, Alex_Mont_order_header_id2, Dylan_Bre_order_header_id1, Dylan_Bre_order_header_id2);

-- Delete order items and allocations
DELETE FROM order_item WHERE order_item_id IN (Alex_Mont_order_item_id1, Alex_Mont_order_item_id2, Dylan_Bre_order_item_id1, Dylan_Bre_order_item_id2);
DELETE FROM order_allocation WHERE order_item_id IN (Alex_Mont_order_item_id1, Alex_Mont_order_item_id2, Dylan_Bre_order_item_id1, Dylan_Bre_order_item_id2);
