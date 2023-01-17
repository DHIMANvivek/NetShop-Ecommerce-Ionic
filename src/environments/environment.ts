// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBfL7s4LkHVHz5mKwDKP8nvoc9ojJxfqf8",
    authDomain: "phone-auth-900e5.firebaseapp.com",
    databaseURL: "phone-auth-900e5.firebaseio.com",
    projectId: "phone-auth-900e5",
    storageBucket: "phone-auth-900e5.appspot.com",
    messagingSenderId: "508033791387",
    appId: "1:508033791387:web:18793bc722e2cf18bfdd3e"
  },
  CountryJson: [
    { name: 'India', dial_code: '+91', code: 'IN' },
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
