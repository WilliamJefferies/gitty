const inquirer = require("inquirer");
const minimist = require("minimist");
const files = require("./files");

module.exports = {
  askGitHubCredentials: () => {
    const questions = [
      {
        name: "username",
        type: "input",
        message: "Enter your GitHub username or e-mail address:",
        validate: (value) => {
          if (value.length) {
            return true;
          } else return "Please enter your Github username or e-mail address";
        },
      },
      {
        name: "password",
        type: "password",
        message: "Enter your GitHub password:",
        validate: (value) => {
          if (value.length) {
            return true;
          } else return "Enter your GitHub password:";
        },
      },
    ];
    return inquirer.prompt(questions);
  },
};
