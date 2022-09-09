const inquirer = require('inquirer');
const { connect } = require("../db/connection")

async function addEmployee(data){
    const db = await connect();
    await db.query('INSERT INTO `employees` (`first_name`, `last_name`, `role_id`,`manager_id` ) VALUES (?, ?, ?, ?)', [data.first_name, data.last_name, data.role_id, data.manager_id]);
    console.log("employee added")
    
    }
async function updateEmployeeRole(){
// check which employee going to update
    const db = await connect();
    
  
    const employees = await getEmployees();

    await inquirer.prompt([{

        message: "Which employee do you want to update?",
        type: 'list',
        name: 'emplyoeeid',
        choices: employees.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}))
 
        
    }
    ])
    .then(async (answer) => {
        // which role they want to change
       
        const [roles] = await db.query('SELECT * FROM roles');

        await inquirer.prompt([{

            message: "Which role do you want to update to?",
            type: 'list',
            name: 'roleid',
            choices: roles.map(({id, title}) => ({name: title, value: id}))
     
            
        }
        ]).then(async (roleAnswer) => {
            await db.query("UPDATE employees SET role_id = ? WHERE id = ?", [roleAnswer.roleid, answer.emplyoeeid])
        })
    })
        
    }



async function getEmployees(){
    const db = await connect();
    //  use join statement to grab role and manager name
    const [employees] = await db.query('SELECT employees.id, first_name, last_name, roles.title, roles.salary, departments.name as department_name FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON departments.id=roles.department_id;');

    return employees;
}

module.exports = {

    updateEmployeeRole,
    getEmployees,
    addEmployee,

}