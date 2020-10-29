import { writeFile } from 'fs';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
   production: true,
   firebase: {
        apiKey: '${process.env.FIREBASE_API_KEY}',
        authDomain: 'superdentist.firebaseapp.com'
    },
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  console.log('Did this go?');
  if (err) {
    return console.log(err);
  }
});
