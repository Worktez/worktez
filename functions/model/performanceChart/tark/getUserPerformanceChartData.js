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
const { setSchedularUnit } = require("../../scheduledFunctions/tark/setSchedular");
const { startSchedular } = require("../../scheduledFunctions/tark/startSchedular");
const { getAllUsersInUids } = require("../../users/lib");
const { getUserPerformanceChart } = require("../lib");
const { updatedUserPerformanceChartData } = require("../tark/updatedUserPerformanceChartData");

exports.getUserPerformanceChartData = function(request, response) {
  const data = request.body.data;
  const orgDomain = data.OrganizationDomain;
  const sprintRange = data.SprintNumberRange;
  const assignee = data.Assignee;
  const uid=data.Uid;
  let result;
  let status = 200;
  
  getUserPerformanceChart(orgDomain, uid).then((doc) => {
    const responseData = [];
    if (doc == undefined) {
      getAllUsersInUids([uid]).then((data)=>{
        const orgAppKey = data[0].SelectedOrgAppKey;
        const teamId = data[0].SelectedTeamId;
        setSchedularUnit("UserPerformanceChart", orgAppKey, assignee, teamId, orgDomain);
        startSchedular();
      });
      result = {data: {status: "ERROR", data: "undefined"}};
    } else {
      for (const i in doc) {
        responseData.push([i, doc[i]]);
      }
      result = { data: { status: "OK", data: responseData } };
    }
    return response.status(status).send(result);
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
    return response.status(status).send(result);
  });
};
