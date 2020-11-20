const gitty = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");

const github = require("./lib/github_credentials");
const repo = require("./lib/create_a_repo");

gitty
  .command("init")
  .description("Draw app banner")
  .action(() => {
    clear();
    console.log(
      chalk.magenta(figlet.textSync("gitty", { horizontalLayout: "full" }))
    );
  });

gitty
  .command("octocheck")
  .description("Check user GitHub credentials")
  .action(async () => {
    let token = github.getStoredGitHubToken();
    if (!token) {
      await github.setGitHubCredentials();
      token = await github.registerNewToken();
    }
    console.log(token);
  });

gitty
  .command("create_repo")
  .description("Create a new repository on GitHub")
  .action(async () => {
    const getGitHubToken = async () => {
      let token = github.getStoredGitHubToken();
      if (token) {
        return token;
      }
      await github.setGitHubCredentials();

      token = await github.registerNewToken();
      return token;
    };
    try {
      const token = await getGitHubToken();
      github.gitHubAuth(token);

      const url = await repo.createRemoteRepository();
      await repo.createGitIgnore();

      const complete = await repo.setupRepository();
      if (complete) {
        console.log(chalk.green("All Done!"));
      }
    } catch (e) {
      if (e) {
        switch (e.status) {
          case 401:
            console.log(
              chalk.red(
                "Couldn't log you in. Please provide correct credentials or token."
              )
            );
            break;
          case 422:
            console.log(
              chalk.red(
                "There already exists a remote repository with the same name."
              )
            );
            break;
          default:
            console.log(e);
            break;
        }
      }
    }
  });

gitty.parse(process.argv);

if (!gitty.args.length) {
  gitty.help();
}
