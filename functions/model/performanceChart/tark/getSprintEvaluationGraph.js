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

const { getOrg } = require("../../organization/lib");
const { setSchedularUnit } = require("../../scheduledFunctions/tark/setSchedular");
const { startSchedular } = require("../../scheduledFunctions/tark/startSchedular");
const { getTeamUseTeamId } = require("../../teams/lib");
const { getOrganizationsChartDetails } = require("../lib");

exports.getSprintEvaluationGraph = function(request, response) {
  const data = request.body.data;
  const orgDomain = data.OrganizationDomain;
  const teamId = data.TeamId;
  const sprintRange = data.SprintNumberRange;
  const sprintRange1 = sprintRange["SprintRange1"];
  const sprintRange2 = sprintRange["SprintRange2"];
  let result;
  let teamName;
  let status = 200;

  const sprintEvaluationGraphPromise = getTeamUseTeamId(orgDomain, teamId).then((team) => {
    teamName = team.TeamName;
    const p1 = getOrganizationsChartDetails(orgDomain, teamName, "SprintEvaluationGraph").then((doc) => {
      const responseData = [];
      if (doc == undefined) {
        getOrg(orgDomain).then((data) => {
          const orgAppKey = data.AppKey;
          setSchedularUnit("SprintEvaluationChart", orgAppKey, "Team", teamId, orgDomain);
          startSchedular();
        });
        result = {data: {status: "ERROR", data: "undefined"}};
      } else {
        for (const i in doc) {
          const j=i.slice(1);
          if (j>=sprintRange1 && j<=sprintRange2) {
            const start = doc[i][0];
            const mid = doc[i][1];
            const end = doc[i][2];
            responseData.push([i, start, mid, end]);
          }
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
    console.log("Fetched Sprint Evaluation Graph Data Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Fetching Sprint Evaluation Graph Data", error);
    return response.status(status).send(result);
  });
};
