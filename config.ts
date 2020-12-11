import { writeFile } from 'fs';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
   production: true,
   baseurl: '${process.env.BASE_URL}',
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
