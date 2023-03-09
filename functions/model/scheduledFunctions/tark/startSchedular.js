/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

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

const { getAllSchedular } = require("../lib");
const { getOrgUseAppKey } = require("../../organization/lib");
const { getTeamUseTeamId, setSchedularJob } = require("../../teams/lib");
const { updatePerformanceChartData } = require("../../performanceChart/tark/updatePerformanceChartData");
const { updateTotalTasks } = require("../../sprints/tark/updateTotalTasks");
// const { updateAutoSprintStatus } = require("../../performanceChart/tark/")

exports.startSchedular = function() {
  const p = getAllSchedular("", "").then((sched) => {
    if (sched) {
      sched.forEach((schDoc) => {
        // const orgId = schDoc.data().OrgId;
        const orgAppKey = schDoc.data().OrgAppKey;
        getOrgUseAppKey(orgAppKey).then((data) => {
          if (data!=undefined) {
            const teamIds = data.TeamsId;
            const orgDomain = data.OrganizationDomain;
            teamIds.forEach((teamId) => {
              getTeamUseTeamId(orgDomain, teamId).then((team) => {
                if (team.SchedularJob == undefined) {
                  const teamName = team.TeamName;
                  setSchedularJob(orgDomain, teamName);
                } else {
                // const sprintEvalChart = team.SchedularJob.SprintEvaluationChart;
                  const performanceChart = team.SchedularJob.PerformanceChart;
                  // const userPerformanceChart = team.SchedularJob.UserPerformanceChart;

                  const currentSprintID = team.CurrentSprintId;
                  const sprintRange = {
                    SprintRange1: currentSprintID - 4,
                    SprintRange2: currentSprintID,
                  };
                  // This can be called for all the sprints if needed
                  updateTotalTasks(orgDomain, team.TeamName, teamId, currentSprintID);
                  updateTotalTasks(orgDomain, team.TeamName, teamId, -1); // Backlog

                  // if (sprintEvalChart) {
                  // updateSprintEvaluationGraphData(orgDomain, teamId, sprintRange);
                  // } else if (type == "UserPerformanceChart") {
                  //   updatedUserPerformanceChartData(schDoc.data().OrgDomain, schDoc.data().Assignee, sprintRange, schDoc.data().TeamId, teamName);
                  // }


                  if (performanceChart) {
                    updatePerformanceChartData(orgDomain, teamId, "Team", sprintRange);
                  }
                // else if (userPerformanceChart) {
                // updateAutoSprintStatus(schDoc.data().OrgAppKey, schDoc.data().TeamId);
                // }
                }
              });
            });
          }
        });
      });
    }
    return null;
  }).catch((error) => {
    console.log("Error:", error);
  });
  return Promise.resolve(p);
};
