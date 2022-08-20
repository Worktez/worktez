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

exports.getPerformanceChartData = function(request, response) {
  const data = request.body.data;
  const orgDomain = data.OrganizationDomain;
  const teamId = data.TeamId;
  const assignee = data.Assignee;
  const sprintRange = data.SprintNumberRange;
  const sprintRange1 = sprintRange["SprintRange1"];
  const sprintRange2 = sprintRange["SprintRange2"];

  let teamName;
  let result;
  let status = 200;
  let chartName = "";

  if (assignee=="Team") {
    chartName = "PerformanceChart";
  } else {
    chartName = assignee;
    // getUserUseEmail(assignee).then((data)=>{
    //   if (data!=undefined) {
    //     const uid=data.uid;
    //     request.body.data.Uid = uid;
    //     request.body.data.Assignee = assignee;
    //     getUserPerformanceChartData(request, response);
    //   }
    // });  
  }
  const performanceChartDataPromise = getTeamUseTeamId(orgDomain, teamId).then((team) => {
    teamName = team.TeamName;
    const p1 = getOrganizationsChartDetails(orgDomain, teamName, chartName).then((doc) => {
      const responseData = [];
      if (doc == undefined) {
        getOrg(orgDomain).then((data) => {
          const orgAppKey = data.AppKey;
          setSchedularUnit(chartName, orgAppKey, assignee, teamId, orgDomain);
          startSchedular();
        });
        result = {data: {status: "ERROR", data: "undefined"}};
      } else {
        for (const i in doc) {
          const j=i.slice(1);
          if (j>=sprintRange1 && j<=sprintRange2) { 
            responseData.push([i, doc[i]]);
          }
        }
        console.log(responseData);
        result = { data: { status: "OK", data: responseData } };
      }
    });
    return Promise.resolve(p1);
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });
  return Promise.resolve(performanceChartDataPromise).then(() => {
    console.log("Fetched Performance Chart Data Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Fetching Performance Chart Data", error);
    return response.status(status).send(result);
  });
};
