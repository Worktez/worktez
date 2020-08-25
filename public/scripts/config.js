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

var firebaseConfig = {
    apiKey: "AIzaSyBO_VmAX-_0hGPDTV4pyX6Vl1TWkJ7wwe8",
    authDomain: "functions-ed3d3.firebaseapp.com",
    databaseURL: "https://functions-ed3d3.firebaseio.com",
    projectId: "functions-ed3d3",
    storageBucket: "functions-ed3d3.appspot.com",
    messagingSenderId: "789185524716",
    appId: "1:789185524716:web:c90d51d9c252acc66386c9",
    measurementId: "G-GMYWERG86H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

var dataset = [];
var dashboardDataset = [];

var collectionName = "Main";