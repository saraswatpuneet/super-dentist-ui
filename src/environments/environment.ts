// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyCp-tO9Rk5iWTeg-bqtP2tvFaW9dXlsS6k',
    authDomain: 'superdentist.firebaseapp.com',
  },
  baseUrl: 'https://dev.superdentist.io/api/sd/v1',
  qrReferralUrl: 'https://dev.superdentist.io/api/sd/v1/qrReferral',
  cloudFunctionUrl: 'https://us-central1-superdentist.cloudfunctions.net',
  cloudFunctionQRReferralUrl: 'https://us-central1-superdentist.cloudfunctions.net/sd-qr-referral-dev',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
