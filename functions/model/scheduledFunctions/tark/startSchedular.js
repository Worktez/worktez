/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const { updatedUserPerformanceChartData } = require("../../performanceChart/tark/updatedUserPerformanceChartData");
const { updatePerformanceChartData } = require("../../performanceChart/tark/updatePerformanceChartData");
const { updateSprintEvaluationGraphData } = require("../../performanceChart/tark/updateSprintEvaluationGraph");
const { getTeamUseTeamId } = require("../../teams/lib");
const { getAllSchedular } = require("../lib");
<<<<<<< HEAD
const { updateSprintStatus } = require(".././../sprints/tark/updateSprintStatus");

var today = new Date();
var currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
=======
const { updateAutoSprintStatus } = require("../../sprints/tark/updateAutoSprintStatus");
>>>>>>> 6838a2b9e36cf3f3e643a735c439f7bc895a2bb0

exports.startSchedular = function() {
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
<<<<<<< HEAD
          } else if(type == "SprintAutoCompletion") {
            console.log(schDoc.data().EndDate)
            console.log(currentDate)
            if (schDoc.data().EndDate <= currentDate)
            {
              console.log("yess")
              // schDoc.data().SprintStatus = "Completed";
              // console.log(schDoc.data().SprintStatus)
              updateSprintStatus("Completed", schDoc.data().SprintName, schDoc.data().OrgAppKey, schDoc.data().TeamId);
            }
=======
          } else if (type == "AutoSprintCompletion") {
            updateAutoSprintStatus(schDoc.data().OrgAppKey, schDoc.data().TeamId);
>>>>>>> 6838a2b9e36cf3f3e643a735c439f7bc895a2bb0
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
