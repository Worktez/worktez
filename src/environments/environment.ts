// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAoOFKFFMgVkE8iv0LAZlhNJnhIzmXemuM",
    authDomain: "worktez-first.firebaseapp.com",
    projectId: "worktez-first",
    storageBucket: "worktez-first.appspot.com",
    messagingSenderId: "961499976362",
    appId: "1:961499976362:web:9aad932dc6aa72ac7ff6d3",
    measurementId: "${config.measurementId}"
  },
  useEmulators: true,
  gitApiUrl: "https://api.github.com/repos/Worktez/worktez"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
