/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
// const { getUserPerformanceChart } = require("./lib");
// const { updatedUserPerformanceChartData } = require("./updatedUserPerformanceChartData");


const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { addSchedularOrg } = require("./tark/addSchedular");
const { startSchedular } = require("./tark/startSchedular");

// exports.scheduledFn = functions.https.onRequest((req, res) => {
//   cors(req, res, () => {
 exports.scheduledFn = functions.pubsub.schedule("1 21 * * *").onRun((context) => {
   startSchedular();
});
//  });
// });

fastify.post("/addScheduler", (req, res) => {
  addSchedularOrg(req, res);
});

exports.scheduledFnManually = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
  });
  });
});
