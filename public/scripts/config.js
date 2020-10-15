var firebaseConfig = {
    apiKey: "AIzaSyAP-cLcP8gB3bsUHSK9oexPq0BDykBPzzE",
    authDomain: "worktrolly.firebaseapp.com",
    databaseURL: "https://worktrolly.firebaseio.com",
    projectId: "worktrolly",
    storageBucket: "worktrolly.appspot.com",
    messagingSenderId: "358996208239",
    appId: "1:358996208239:web:73a1939b7267070d2dfb9a",
    measurementId: "G-FEQ8PFLLCV"
};

// const firebaseConfig = {
//     apiKey: "AIzaSyArH3xQQaP4hXXRCuxRPSrNJ5CPE_lgXsY",
//     authDomain: "project-cf3a4.firebaseapp.com",
//     databaseURL: "https://project-cf3a4.firebaseio.com",
//     projectId: "project-cf3a4",
//     storageBucket: "project-cf3a4.appspot.com",
//     messagingSenderId: "244691770416",
//     appId: "1:244691770416:web:1376ad777dad4fff75a1f5",
//     measurementId: "G-Z8JNWCKCL0"
// };

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