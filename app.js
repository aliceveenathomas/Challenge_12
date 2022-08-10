const inquirer = require('inquirer');
const { getDepartments, addDepartment } = require('./operations/department');
const { updateEmployeeRole, getEmployees } = require('./operations/employee');

function main(){
    return inquirer.prompt([{

        message: "What you would like to do?",
        type: 'list',
        name: 'operation',
        choices: [
            'view all departmarments',
            'add departmarment',
            'view all roles',
            'update employee roles', // once user selected this, should see alist of employee name to choose from, select the new role
            'exit',
        ]
    },
    {
        meassage: "What is the department name?",
        type: 'input',
        name: "department_name",
        when: (ans) => ans.operation === 'add department',
    }
    ]).then(async (ans) => {
     switch(ans.operation){
    
        case "add department":
            const department = await addDepartment();

            break;

        case "view all departments":
        
            const departments = await getDepartments();
            console.table(departments);
    
            break;
        case "view all roles":
            break;
        case "exit":
            process.exit(0);
         break;

        case "update employee roles":
            await updateEmployeeRole();

            break;
        case "view all employees":
            const employees= await getEmployees()
            console.table(employees)
            break;
     }

    // await main();
    })
}
main();

// create a CLI to manage employees


// view all departmarments,

//view all roles
//  view all employees, 

// add a department, add a role, add an employee, and update an employee role
