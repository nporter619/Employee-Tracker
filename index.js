const inquirer = require('inquirer');
const db = require('./db/db');

async function main() {
    let answer;
    do {
        answer = await inquirer.prompt([
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
        ]);

        if (answer.action === "View all departments") await db.viewDepartments();
        else if (answer.action === "View all roles") await db.viewRoles();
        else if (answer.action === "View all employees") await db.viewEmployees();
        else if (answer.action === "Add a department") await db.addDepartment();
        else if (answer.action === "Add a role") await db.addRole();
        else if (answer.action === "Add an employee") await db.addEmployee();
        else if (answer.action === "Update an employee role") await db.updateEmployeeRole();
        
    } while (answer.action !== "Exit");

    db.close();
}

main();
