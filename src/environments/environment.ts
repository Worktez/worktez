// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA74585UJSAlOLjeMw5S1PGVB_LYCG7WWA",
authDomain: "worktez--first.firebaseapp.com",
projectId: "worktez--first",
storageBucket: "worktez--first.appspot.com",
messagingSenderId: "410141146214",
appId: "1:410141146214:web:bf0e8b99f175fc084341a7"
  },
  useEmulators: true,
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