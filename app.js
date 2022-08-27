const inquirer = require('inquirer');
const { getDepartments, addDepartment } = require('./operations/department');
const { updateEmployeeRole, getEmployees, addEmployee } = require('./operations/employee');
const { getRoles, addRole } = require('./operations/role');



function main(){
    return inquirer.prompt([{

        message: "What you would like to do?",
        type: 'list',
        name: 'operation',
        choices: [
            'view all departments',
            'add department',
            'view all roles',
            'add role',
            'view all employees',
            'add employee',
            'update employee role', // once user selected this, should see alist of employee name to choose from, select the new role
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
            const department = await addDepartment(ans.department_name);

            break;

        case "view all departments":
        
            const departments = await getDepartments();
            console.table(departments);
    
            break;
           
        case "view all roles":
            const roles = await getRoles();
            console.table(roles);
      
            // fields needed: role details + department_name(comes from depart table -- need to join)
            break;
        case "exit":
            process.exit(0);
            break;
            case "add role": {
                // using inquirer ask title, salary, & department
                // get all departments
                const departments = await getDepartments();
                const departmentChoices = departments.map(el => ({name: el.name, value: el.id}))
                await inquirer.prompt([{
                    message: "What is the role title?",
                    type: 'input',
                    name: "title",
                }, {
                    message: "What is the role salary?",
                    type: 'input',
                    name: "salary",
                }, {
                    message: "What department for this role?",
                    type: 'list',
                    name: 'department_id',
                    choices: departmentChoices

                }]).then(async answers => {
                    const role = await addRole(answers);
                })

                
                break;
            }
                
            case "add employee": {
                // using inquirer ask first name, last name, role and employee
                // get all departments
                const roles = await getRoles();
                const roleChoices = roles.map(el => ({value: el.id}))
                const employees = await getEmployees();
                const managerChoices = employees.map(el => ({name: el.firstname, name: el.lastname,value: el.id}))
                await inquirer.prompt([{
                    message: "What is the first name?",
                    type: 'input',
                    name: "first_name",
                }, {
                    message: "What is the last name?",
                    type: 'input',
                    name: "last_name",
                }, {
                    message: "What role id for this employee?",
                    type: 'list',
                    name: 'role_id',
                    choices: roleChoices

                },{
                    message: "What manager id for this employee?",
                    type: 'list',
                    name: 'manager_id',
                    choices: managerChoices

                }
            ]).then(async answers => {
                    const employee = await addEmployee(answers);
                })

                
                break;
            }

            // write the sql query in workbench  

            //  -- review join statement

           



        case "update employee role":
            await updateEmployeeRole();

            break;
        case "view all employees":
            const employees= await getEmployees();
            console.table(employees);
            break;
     }

    await main();
    })
}
main();

// create a CLI to manage employees


// view all departmarments,

//view all roles
//  view all employees, 

// add a department, add a role, add an employee, and update an employee role