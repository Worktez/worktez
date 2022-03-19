import * as process from "process";

export const environment = {
  production: true,
  firebase: {
    authDomain: "worktrolly.firebaseapp.com",
    databaseURL: "https://worktrolly.firebaseio.com",
    projectId: "worktrolly",
    storageBucket: "worktrolly.appspot.com",
    apiKey: `${process.env.APIKEY}`,
    appId: `${process.env.APPID}`,
    measurementId: `${process.env.MEASUREMENTID}`,
    messagingSenderId: `${process.env.MESSAGINGSENDERID}`,
  },
  useEmulators: false,
  gitApiUrl: "https://api.github.com/repos/Worktez/worktez",
  githubApiUrl: "https://api.github.com"
};
