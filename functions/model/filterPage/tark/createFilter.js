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

/* eslint-disable no-const-assign */
const {getTeam, updateTeamDetails} = require("../../teams/lib");
const {setFilterProperties} = require("../../filterPage/lib");

/* eslint-disable no-unused-vars */
exports.createFilter = function(request, response) {
  const filterName = request.body.data.FilterName;
  const orgDomain = request.body.data.OrgDomain;
  const teamName = request.body.data.TeamName;
  const scope = request.body.data.Scope;
  const docId = request.body.data.DocId;

  let result;
  const status = 200;

  const promise = getTeam(orgDomain, teamName).then((team)=>{
    if (team) {
      let filterCounter=team.FilterName;
      filterCounter++;
      const id = "F" + filterCounter;
      const inputJson={
        FilterCounters: filterCounter,
      };
      updateTeamDetails(inputJson, orgDomain, teamName);

      setFilterProperties(orgDomain, teamName, docId, filterName, scope);
    } else {
      console.log("Team does not exist");
      status=500;
    }
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Filter edited Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    result = {data: error};
    status=500;
    console.error("Error editing Filter", error);
    return response.status(status).send(result);
  });
};
