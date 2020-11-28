// var firebaseConfig = {
//     apiKey: "AIzaSyAP-cLcP8gB3bsUHSK9oexPq0BDykBPzzE",
//     authDomain: "worktrolly.firebaseapp.com",
//     databaseURL: "https://worktrolly.firebaseio.com",
//     projectId: "worktrolly",
//     storageBucket: "worktrolly.appspot.com",
//     messagingSenderId: "358996208239",
//     appId: "1:358996208239:web:73a1939b7267070d2dfb9a",
//     measurementId: "G-FEQ8PFLLCV"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCE4UKde_kTwHaDTuQS5YubsCIbNqSNKJQ",
    authDomain: "simplelogin-e5759.firebaseapp.com",
    databaseURL: "https://simplelogin-e5759.firebaseio.com",
    projectId: "simplelogin-e5759",
    storageBucket: "simplelogin-e5759.appspot.com",
    messagingSenderId: "462404006182",
    appId: "1:462404006182:web:d2f78f33e56d4daedf51e7"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var dataset = [];
var dashboardDataset = [];
var collectionName = "Main";
var newPage = "";
var currentPage = "dashboard";
var selectedCategory = "";
var selectedStatus = "";
var selectedSprint;
var currentSprint;