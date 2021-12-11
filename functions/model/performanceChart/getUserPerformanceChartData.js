/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const { getUserPerformanceChart } = require("./lib");
const { updatedUserPerformanceChartData } = require("./updatedUserPerformanceChartData");

exports.getUserPerformanceChartData = function(request, response) {
  const data = request.body.data;
  const orgDomain = data.OrganizationDomain;
  const sprintRange = data.SprintNumberRange;
  const assignee = data.Assignee;
  const uid=data.Uid;
  let result;
  let status = 200;
  
  const userPerformanceChartPromise = getUserPerformanceChart(orgDomain, uid).then((doc) => {
    updatedUserPerformanceChartData(doc.LastUpdated, orgDomain, assignee, uid, sprintRange);
    const responseData = [];
    for (const i in doc) {
      if (i!="LastUpdated") {
        responseData.push([i, doc[i]]);
      }
    }
    if (doc == undefined) {
      result = {data: {status: "ERROR", data: undefined}};
    } else {
      result = { data: { status: "OK", data: responseData } };
    }
    return response.status(status).send(result);
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
    return response.status(status).send(result);
  });
  return Promise.resolve(userPerformanceChartPromise).then(() => {
    console.log("Fetched User Performance Chart Data Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Fetching User Performance Chart Data", error);
    return response.status(status).send(result);
  });
};
