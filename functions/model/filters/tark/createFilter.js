/* eslint-disable no-const-assign */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Simran Nigam <nigamsimran14@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const {getTeam, updateTeamDetails} = require("../../teams/lib");
const {setFilterProperties} = require("../lib");

exports.createFilter = function(request, response) {
  const filterName = request.body.data.FilterName;
  const description = request.body.data.Description;
  const difficulty = request.body.data.Difficulty;
  const priority = request.body.data.Priority;
  const taskStatus = request.body.data.Status;
  const sprintNumber = request.body.data.SprintNumber;
  const orgDomain = request.body.data.OrgDomain;
  const teamName = request.body.data.TeamName;
  const assignee = request.body.data.Assignee;

  let result;
  const status = 200;

  const promise = getTeam(orgDomain, teamName).then((team)=>{
    if (team) {
      let filterCounter = team.FilterCounter;
      if (filterCounter == undefined) {
        filterCounter = 0;
      }
      filterCounter++;
      const filterId = "F" + filterCounter;
      const inputJson = {
        FilterCounter: filterCounter,
      };
      updateTeamDetails(inputJson, orgDomain, teamName);

      const filterJson = {
        Difficulty: difficulty,
        Priority: priority,
        Status: taskStatus,
        SprintNumber: sprintNumber,
        Assignee: assignee,
      };
      setFilterProperties(orgDomain, teamName, filterId, filterName, description, filterJson);
    } else {
      console.log("Team does not exist");
      status=500;
    }
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Filter created Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    result = {data: error};
    status=500;
    console.error("Error editing Filter", error);
    return response.status(status).send(result);
  });
};
