const { connect } = require("../db/connection")


async function addRole(data){
const db = await connect();
await db.query('INSERT INTO `roles` (`title`, `salary`, `department_id`) VALUES (?, ?, ?)', [data.title, data.salary, data.department_id]);
console.log("role added")

}

async function getRoles(){

const db = await connect();
const [roles] =  await db.query('SELECT * FROM roles JOIN departments ON roles.department_id = departments.id');
console.log(roles);
return roles;
}

module.exports = {

    addRole,
    getRoles,
}