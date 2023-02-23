/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

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

const {getTeam, updateTeamDetails} =require("../lib");

exports.reorderLabels = function(request, response) {
  const teamName = request.body.data.TeamName;
  const orgDomain = request.body.data.OrgDomain;
  const scope = request.body.data.Scope;
  const labelsArray = request.body.data.LabelsArray;
  const inputJson = {};

  let result;
  let status = 200;

  const promise = getTeam(orgDomain, teamName).then((team)=>{
    if (team) {
      if (scope == "Priority") {
        inputJson["Priority"] = labelsArray;
      } else if (scope == "Difficulty") {
        inputJson["Difficulty"] = labelsArray;
      } else if (scope == "Status") {
        inputJson["Status"] = labelsArray;
      } else if (scope == "Type") {
        inputJson["Type"] = labelsArray;
      } else if (scope == "MilestoneStatus") {
        inputJson["MilestoneStatus"] = labelsArray;
      }
      updateTeamDetails(inputJson, orgDomain, teamName);
    } else {
      console.log("Team does not exist");
      status=500;
    }
  });


  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Label Reordered Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    result = {data: error};
    status=500;
    console.error("Error Reordered Label", error);
    return response.status(status).send(result);
  });
};
