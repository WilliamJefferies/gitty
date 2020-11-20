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

  askRepositoryDetails: () => {
    const argv = require("minimist")(process.argv.slice(2));
    const questions = [
      {
        type: "input",
        name: "name",
        message: "Please enter a name for your repository:",
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: (value) => {
          if (value.length) {
            return true;
          } else {
            return "Please enter a unique name for the repository";
          }
        },
      },
      {
        type: "input",
        name: "description",
        message:
          "Now you can choose to enter a description for your repository or press enter:",
        default: argv._[1] || null,
      },
      {
        type: "input",
        name: "visibility",
        message: "Would you like this repo to be set as public or private",
        choices: ["public", "private"],
        default: "public",
      },
    ];
    return inquirer.prompt(questions);
  },
};
