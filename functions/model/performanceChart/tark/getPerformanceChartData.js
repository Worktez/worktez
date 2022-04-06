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
const { getUserPerformanceChartData } = require("./getUserPerformanceChartData");
const { getUserUseEmail} = require("../../users/lib");

exports.getPerformanceChartData = function(request, response) {
  const data = request.body.data;
  const orgDomain = data.OrganizationDomain;
  const teamId = data.TeamId;
  const assignee = data.Assignee;
  const sprintRange = data.SprintNumberRange;
  let teamName;
  let result;
  let status = 200;

  if (assignee=="Team") {
    const performanceChartDataPromise = getTeamUseTeamId(orgDomain, teamId).then((team) => {
      teamName = team.TeamName;
      const p1 = getOrganizationsChartDetails(orgDomain, teamName, "PerformanceChart").then((doc) => {
        const responseData = [];
        if (doc == undefined) {
          getOrg(orgDomain).then((data) => {
            const orgAppKey = data.AppKey;
            setSchedularUnit("PerformanceChart", orgAppKey, "Team", teamId, orgDomain);
            startSchedular();
          });
          result = {data: {status: "ERROR", data: "undefined"}};
        } else {
          for (const i in doc) {
            responseData.push([i, doc[i]]);
          }
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
  } else {
    getUserUseEmail(assignee).then((data)=>{
      if (data!=undefined) {
        const uid=data.uid;
        request.body.data.Uid = uid;
        getUserPerformanceChartData(request, response);
      }
    });  
  }
};
