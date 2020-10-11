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

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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