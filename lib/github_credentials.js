const octokit = require("@octokit/rest")();
const Configstore = require("configstore");
const _ = require("lodash");

const pkg = require("../package.json");
const conf = new Configstore(pkg.name);

const inquirer = require("inquirer");

module.exports = {
  getInstance: () => {
    return octokit;
  },

  gitHubAuth: (token) => {
    octokit.authenticate({
      type: "oauth",
      token: token,
    });
  },

  getStoredGitHubToken: () => {
    return conf.get("github_credentials");
  },

  setGitHubCredentials: async () => {
    const credentials = await inquirer.askGitHubCredentials();
    octokit.authenticate(
      _.extend(
        ({
          type: "basic",
        },
        credentials)
      )
    );
  },

  registerNewToken: async () => {
    try {
      const response = await octokit.oauthAuthorization.createAuthorization({
        scopes: ["user", "public_repo", "repo", "repo:status"],
        note: "Gitty: an awesome tool for dev workflow automation",
      });
      const token = response.data.token;
      conf.set("github credentials.token", token);
      return token;
    } catch (e) {
      throw new Error(
        "Missing Token",
        "Bad news, GitHub token was not recieved"
      );
    }
  },
};
