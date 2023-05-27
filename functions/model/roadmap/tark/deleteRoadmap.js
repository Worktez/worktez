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

exports.deleteRoadmap = function(request, response) {
  const milestoneName = request.body.data.MilestoneName;
  const roadmapId = request.body.data.RoadmapId;
  const orgDomain = request.body.data.OrgDomain;
  const teamId = request.body.data.TeamId;

  let result;
  let status = 200;

  const promise = getRoadmapData(orgDomain, teamId, milestoneName, roadmapId).then((roadmap) => {
    if (roadmap == undefined) {
      result = {data: {status: "Roadmap does not exist"}};
    } else {
      const updateRoadmapToJson = {
        Status: "DELETED",
      };
      updateRoadmap(updateRoadmapToJson, teamId, orgDomain, roadmapId, milestoneName);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Roadmap Deleted Successfully");
    return response.status.send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error Deleting", error);
    return response.status(status).send(result);
  });
};
