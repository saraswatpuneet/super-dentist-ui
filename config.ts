const fs = require('fs');
const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
   production: true,
   baseUrl: '${process.env.BASE_URL}',
   firebase: {
        apiKey: '${process.env.FIREBASE_API_KEY}',
        authDomain: 'superdentist.firebaseapp.com'
    },
    cloudFunctionUrl: 'https://us-central1-superdentist.cloudfunctions.net',
    cloudFunctionQRReferralUrl: 'https://us-central1-superdentist.cloudfunctions.ne/sd-qr-referral-dev',
};
`;

fs.writeFile(targetPath, envConfigFile, (err, data) => {
  if (err) {
    return console.log(err);
  }
});
