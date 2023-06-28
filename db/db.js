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

function addRole(callback) {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the title of the new role:",
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the salary for the new role:",
        },
        {
            type: "input",
            name: "department_id",
            message: "Enter the department ID for the new role:",
        }
    ]).then((answer) => {
        connection.query('INSERT INTO role SET ?', answer, function (err, res) {
            if (err) throw err;
            console.log("Role added!");
            callback();
        });
    });
}

function addEmployee(callback) {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter the first name of the new employee:",
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter the last name of the new employee:",
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter the role ID for the new employee:",
        },
        {
            type: "input",
            name: "manager_id",
            message: "Enter the manager ID for the new employee (if any), press Enter if there's no manager:",
            default: null, // add this line
            validate: function(value) {
                if (value === "" || value === null || !isNaN(value)) {
                    return true;
                } else {
                    return "Please enter a valid number or press Enter if there's no manager.";
                }
            }
        }
    ]).then((answer) => {
        connection.query('INSERT INTO employee SET ?', answer, function (err, res) {
            if (err) throw err;
            console.log("Employee added!");
            callback();
        });
    });
}

function updateEmployeeRole(callback) {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Enter the ID of the employee you want to update:",
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter the new role ID for this employee:",
        }
    ]).then((answer) => {
        connection.query('UPDATE employee SET ? WHERE ?', [{ role_id: answer.role_id }, { id: answer.id }], function (err, res) {
            if (err) throw err;
            console.log("Employee role updated!");
            callback();
        });
    });
}

function close() {
    connection.end();
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
