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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

var dataset = [];
var newPage = "";
var currentPage = "bodyContent";
var initialTaskNumber = 0;