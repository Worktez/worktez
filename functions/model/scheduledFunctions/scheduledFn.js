/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
// const { getUserPerformanceChart } = require("./lib");
// const { updatedUserPerformanceChartData } = require("./updatedUserPerformanceChartData");

const { functions } = require("../application/lib");
const { updatedUserPerformanceChartData } = require("../performanceChart/tark/updatedUserPerformanceChartData");

exports.scheduledFn = functions.pubsub.schedule("1 21 * * *").onRun((context) => {
  console.log("This is scheduled funtion running everyday at scheduled time.!");
  console.log("Reading organizations data!");
  // updatedUserPerformanceChartData(lastUpdated, orgDomain, assignee, uid, sprintRange);
  return null;
});
