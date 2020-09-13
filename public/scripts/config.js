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
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDdLCXjCyvEIyrIEp85BsywU07wpGfl45g",
    authDomain: "mnbv-68e96.firebaseapp.com",
    databaseURL: "https://mnbv-68e96.firebaseio.com",
    projectId: "mnbv-68e96",
    storageBucket: "mnbv-68e96.appspot.com",
    messagingSenderId: "987294587247",
    appId: "1:987294587247:web:ff6fe02774819b96a2b09a",
    measurementId: "G-8SRJRQ9JXN"
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
var selectedSprint = "S4";