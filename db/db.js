const connection = require('./connection');
const inquirer = require('inquirer');

function viewDepartments(callback) {
    connection.query('SELECT * FROM department', (err, departments) => {
        if (err) throw err;
        console.table(departments);
        callback();
    });
}

function viewRoles(callback) {
    connection.query('SELECT * FROM role', (err, roles) => {
        if (err) throw err;
        console.table(roles);
        callback();
    });
}

function viewEmployees(callback) {
    connection.query('SELECT * FROM employee', (err, employees) => {
        if (err) throw err;
        console.table(employees);
        callback();
    });
}

function addDepartment(callback) {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Enter the name of the new department:",
        }
    ]).then((answer) => {
        connection.query('INSERT INTO department SET ?', { name: answer.department }, function (err, res) {
            if (err) throw err;
            console.log("Department added!");
            callback();
        });
    });
}

// implement addRole, addEmployee, and updateEmployeeRole with similar callback pattern

function close() {
    connection.end();
}

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    // addRole,
    // addEmployee,
    // updateEmployeeRole,
    close
};
