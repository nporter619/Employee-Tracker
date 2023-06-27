const connection = require('./connection');
const inquirer = require('inquirer');

// Promisify the mysql methods we need
const query = connection.query.bind(connection);
const end = connection.end.bind(connection);

async function viewDepartments() {
    const departments = await query('SELECT * FROM department');
    console.table(departments);
}

async function viewRoles() {
    const roles = await query('SELECT * FROM role');
    console.table(roles);
}

async function viewEmployees() {
    const employees = await query('SELECT * FROM employee');
    console.table(employees);
}

async function addDepartment() {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Enter the name of the new department:",
        }
    ]);
    await query('INSERT INTO department (name) VALUES (?)', answer.department);
    console.log("Department added!");
}

async function addRole() {
    // implement similar to addDepartment
}

async function addEmployee() {
    // implement similar to addDepartment
}

async function updateEmployeeRole() {
    // implement
}

function close() {
    end();
}

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    close
};
