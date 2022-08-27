use employee_cms_demo;



INSERT INTO departments (name)
VALUES ("marketing"), ("engineering"), ("finance"), ("HR");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "manager", "10000", 1),
(2, "engineer", "10000", 2);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("sam", "john", 1, null),
("james", "tom", 2, 1);