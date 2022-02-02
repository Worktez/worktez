/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */

const { updatedUserPerformanceChartData } = require("../../performanceChart/tark/updatedUserPerformanceChartData");
const { updatePerformanceChartData } = require("../../performanceChart/tark/updatePerformanceChartData");
const { updateSprintEvaluationGraphData } = require("../../performanceChart/tark/updateSprintEvaluationGraph");
const { getTeamUseTeamId } = require("../../teams/lib");
const { getAllSchedular } = require("../lib");

exports.startSchedular = function() {
  console.log(sched);
  getAllSchedular().then((sched) => {
    if (sched) {
      sched.forEach((schDoc) => {
        const type = schDoc.data().Type;
        
        getTeamUseTeamId(schDoc.data().OrgDomain, schDoc.data().TeamId).then((team) => {
          const currentSprintID = team.CurrentSprintId;
          const sprintRange = {
            SprintRange1: currentSprintID - 4,
            SprintRange2: currentSprintID,
          };

          if (type == "SprintEvaluationChart") {
            updateSprintEvaluationGraphData(schDoc.data().OrgDomain, schDoc.data().TeamId, sprintRange);
          } else if (type == "UserPerformanceChart") {
            updatedUserPerformanceChartData(schDoc.data().OrgDomain, schDoc.data().Assignee, sprintRange);
          } else if (type == "PerformanceChart") {
            updatePerformanceChartData(schDoc.data().OrgDomain, schDoc.data().TeamId, schDoc.data().Assignee, sprintRange);
          }
        }).catch((error)=>{
          console.log("Error:", error);
        });
      });
    }
    return null;
  }).catch((error) => {
    console.log("Error:", error);
  });
  // updatedUserPerformanceChartData(lastUpdated, orgDomain, assignee, uid, sprintRange);
  return null;
};
