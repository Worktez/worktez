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
const {setRoadmap, getAllRoadmapData} = require("../lib");

exports.addRoadmap = function(request, response) {
  const milestoneName = request.body.data.MilestoneName;
  const description = request.body.data.Description;
  const taskName = request.body.data.TaskName;
  const startDate = request.body.data.StartDate;
  const endDate = request.body.data.EndDate;
  const teamId = request.body.data.TeamId;
  const orgDomain = request.body.data.OrgDomain;

  let result;
  let status = 200;

  const promise = getAllRoadmapData(orgDomain, teamId).then((data) => {
    this.roadmapData = data;
    const roadmapId = "R" + (this.roadmapData.length + 1);

    setRoadmap(orgDomain, milestoneName, description, taskName, startDate, endDate, teamId, roadmapId).catch((error) => {
      result = {data: error};
      status = 500;
      console.error("Error", error);
    });
  }).catch((error) => {
    result = {data: error};
    status = 500;
    console.error("Error", error);
  });
  Promise.resolve(promise).then(() => {
    console.log("Event added Successfully");
    result = {data: "Event added Successfully"};
    return response.status(status).send(result);
  }) .catch((error) => {
    console.error("Error adding Event", error);
    return response.status(status).send(result);
  });
};
