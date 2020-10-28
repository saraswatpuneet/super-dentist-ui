
const env = require('env-var');

export const environment = {
  production: true,
  firebase: {
    apiKey: env.get('SUPER_DENTIST_KEY'),
    authDomain: 'superdentist.firebaseapp.com',
  }
};