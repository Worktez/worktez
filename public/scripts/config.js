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
    apiKey: "AIzaSyCZ8WafqA_eMqHOto3FsQekahaX-aJfdaU",
    authDomain: "sprinttest.firebaseapp.com",
    databaseURL: "https://sprinttest.firebaseio.com",
    projectId: "sprinttest",
    storageBucket: "sprinttest.appspot.com",
    messagingSenderId: "870867375123",
    appId: "1:870867375123:web:1334eab52fddb99d8e5be6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var dataset = [];
var dashboardDataset = [];

var collectionName = "Main";
var newPage = "";
var currentPage = "bodyContent";