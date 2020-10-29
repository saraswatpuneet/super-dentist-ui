import { writeFile } from 'fs';

const targetPath = './src/environments/environment.prod.ts';
console.log(process.env);
const envConfigFile = `export const environment = {
   production: true,
   firebase: {
        apiKey: '${process.env.FIREBASE_API_KEY}',
        authDomain: 'superdentist.firebaseapp.com'
    },
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
