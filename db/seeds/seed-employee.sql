use employee_cms_demo

INSERT INTO roles (id, title, salary, department_id)
VALUES (3, "manager", "10000", 1),
(4, "engineer", "10000", 2);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("test", "something", 1, NULL),
("engineer", "test", 2, 1);