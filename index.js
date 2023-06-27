const inquirer = require('inquirer');
const db = require('./db/db');

function main() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit"
            ]
        }
    ]).then(answer => {
        if (answer.action === "Exit") db.close();
        else if (answer.action === "View all departments") db.viewDepartments(main);
        else if (answer.action === "View all roles") db.viewRoles(main);
        else if (answer.action === "View all employees") db.viewEmployees(main);
        else if (answer.action === "Add a department") db.addDepartment(main);
        else if (answer.action === "Add a role") db.addRole(main);
     else if (answer.action === "Add an employee") db.addEmployee(main);
        else if (answer.action === "Update an employee role") db.updateEmployeeRole(main);
    });
}

main();
