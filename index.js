const inquirer = require('inquirer');
const db = require('./db/connection');

function startApp() {
    inquirer
        .prompt([
            {
                name: 'options',
                type: 'list',
                message: 'What would you like to do?',
                choices: [ /* all your choices here */ ]
            }
        ])
        .then((answer) => {
            switch (answer.options) {
                case 'View all departments':
                    // Call your function that retrieves and displays all departments
                    break;
                // Other cases for other options
                default:
                    console.log('Goodbye!');
                    db.end();
            }
        });
}

startApp();
