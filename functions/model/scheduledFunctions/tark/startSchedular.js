/***********************************************************
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
const { updateAutoSprintStatus } = require("../../sprints/tark/updateAutoSprintStatus");

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
          } else if (type == "AutoSprintCompletion") {
            updateAutoSprintStatus(schDoc.data().OrgAppKey, schDoc.data().TeamId);
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
