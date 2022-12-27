/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable object-curly-spacing */

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

const { createSprintName } = require("../../application/lib");
const { getTeamUseTeamId } = require("../../teams/lib");
const { getOrganizationsChartDetails } = require("../lib");
const { updateSprintBurndownChartData } = require("./updateSprintBurndownChart");

exports.getSprintBurndownChartData = function(request, response) {
  const data = request.body.data;
  const orgDomain = data.OrganizationDomain;
  const teamId = data.TeamId;
  const sprintNumber = parseInt(request.body.data.SprintNumber);
  const fullSprintName = createSprintName(sprintNumber);
  let result;
  let teamName;
  let status = 200;
  let dataFound = false;

  const sprintEvaluationGraphPromise = getTeamUseTeamId(orgDomain, teamId).then((team) => {
    teamName = team.TeamName;
    const p1 = getOrganizationsChartDetails(orgDomain, teamName, "SprintBurndownChart").then((doc) => {
      let responseData = [];
      if (doc == undefined) {
        updateSprintBurndownChartData(orgDomain, teamId, fullSprintName);
        result = {data: {status: "ERROR", data: "undefined"}};
      } else {
        for (const i in doc) {
          if (i===fullSprintName) {
            const chartData = doc[i];
            responseData = chartData;
            dataFound = true;
          }
        }
        if (dataFound == false) {
          console.log("got here");
          updateSprintBurndownChartData(orgDomain, teamId, fullSprintName);
        }
        result = { data: { status: "OK", data: responseData } };
      }
    });
    return Promise.resolve(p1);
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });
  return Promise.resolve(sprintEvaluationGraphPromise).then(() => {
    console.log("Fetched Sprint Burndown Chart Data Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Fetching Sprint Burndown Chart Data", error);
    return response.status(status).send(result);
  });
};
