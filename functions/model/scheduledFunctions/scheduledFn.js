/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
// const { getUserPerformanceChart } = require("./lib");
// const { updatedUserPerformanceChartData } = require("./updatedUserPerformanceChartData");

const { functions, cors } = require("../application/lib");
const { startSchedular } = require("./tark/startSchedular");

 exports.scheduledFn = functions.https.onRequest((req, res) => {
   cors(req, res, () => {
     console.log("inside new controller")
// exports.scheduledFn = functions.pubsub.schedule("1 21 * * *").onRun((context) => {
  startSchedular();
});
});