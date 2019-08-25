var environment = {};

environment.staging = {
  port: 3000,
  envName: "staging",
};

environment.production = {
  port: 5000,
  envName: "production",
};

var currentEnvironment =
  typeof process.env.NOD_ENV == "string"
    ? process.env.NOD_ENV.toLowerCase()
    : "";

var environmentToExport =
  typeof environment[currentEnvironment] == "object"
    ? environment[currentEnvironment]
    : environment.staging;

module.exports = environmentToExport;
