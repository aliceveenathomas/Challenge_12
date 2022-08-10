const inquirer = require('inquirer');
const { connect } = require("../db/connection")

async function updateEmployeeRole(){
// check which employee going to update
    const db = await connect();
    const [employees] = await db.query('SELECT * FROM employees');

    inquirer.prompt([{

        message: "Which employee do you want to update?",
        type: 'list',
        name: 'emplyoeeid',
        choices: employees.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}))
 
        
    }
    ])
    .then(async (answer) => {
        // which role they want to change
       
        const [roles] = await db.query('SELECT * FROM roles');

        inquirer.prompt([{

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



function getEmployees(){

    //  use join statement to grab role and manager name
    const [employees] = await db.query('SELECT * FROM employees JOIN roles ON employees.role_id = role.id JOIN departments ON departments.id=roles.department_id;');

    return employees;
}

module.exports = {

    updateEmployeeRole,
    getEmployees,

}