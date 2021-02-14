const fs = require('fs');
const envName = `${process.argv[2]}`;

let targetPath = `./src/environments/environment.${envName}.ts`;
let env = require(targetPath).environment;

env.baseUrl = process.env.BASE_URL;
env.firebase.apiKey = process.env.FIREBASE_API_KEY;

const envConfigFile = `export const environment = ${JSON.stringify(env)};`;
fs.writeFile(targetPath, envConfigFile, (err, data) => {
  if (err) {
    return console.log(err);
  }
});
