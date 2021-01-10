const fs = require('fs');
const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
   production: true,
   baseUrl: '${process.env.BASE_URL}',
   firebase: {
        apiKey: '${process.env.FIREBASE_API_KEY}',
        authDomain: 'superdentist.firebaseapp.com'
    },
};
`;

fs.writeFile(targetPath, envConfigFile, (err, data) => {
  if (err) {
    return console.log(err);
  }
});
