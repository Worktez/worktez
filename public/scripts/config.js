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
  apiKey: "AIzaSyAaMjQnm3NnUmHHW2Smt6wJyRV7a0FIeFo",
  authDomain: "wls1-b942d.firebaseapp.com",
  databaseURL: "https://wls1-b942d.firebaseio.com",
  projectId: "wls1-b942d",
  storageBucket: "wls1-b942d.appspot.com",
  messagingSenderId: "1056324548947",
  appId: "1:1056324548947:web:642a1d3c3fab60460c49a6",
  measurementId: "G-KWPDV4PSDG"
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