// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAP-cLcP8gB3bsUHSK9oexPq0BDykBPzzE",
  authDomain: "worktrolly.firebaseapp.com",
  databaseURL: "https://worktrolly.firebaseio.com",
  projectId: "worktrolly",
  storageBucket: "worktrolly.appspot.com",
  messagingSenderId: "358996208239",
  appId: "1:358996208239:web:73a1939b7267070d2dfb9a",
  measurementId: "G-FEQ8PFLLCV"
  },
  useEmulators: false,
  gitApiUrl: "https://api.github.com/repos/Worktez/worktez",
  githubApiUrl: "https://api.github.com"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.