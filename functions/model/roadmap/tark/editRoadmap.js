/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const {getRoadmapData, updateRoadmap} = require("../lib");

/* eslint-disable max-len */
exports.editRoadmap = function(request, response) {
  const milestoneName = request.body.data.MilestoneName;
  const roadmapId = request.body.data.RoadmapId;
  const description = request.body.data.Description;
  const taskName = request.body.data.TaskName;
  const startDate = request.body.data.StartDate;
  const endDate = request.body.data.EndDate;
  const teamId = request.body.data.TeamId;
  const orgDomain = request.body.data.OrgDomain;

  let result;
  let status = 200;

  const promise = getRoadmapData(orgDomain, teamId, milestoneName, roadmapId).then((roadmapData)=> {
    if (roadmapData == undefined) {
      result = {data: {status: "Roadmap does not exist"}};
    } else {
      const inputJson = {
        MilestoneName: milestoneName,
        Description: description,
        TaskName: taskName,
        StartDate: startDate,
        EndDate: endDate,
      };
      updateRoadmap(inputJson, teamId, orgDomain, roadmapId, milestoneName);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Roadmap edited Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error editing roadmap");
    return response.status(status).send(result);
  });
};
