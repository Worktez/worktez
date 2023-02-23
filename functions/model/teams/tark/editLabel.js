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

const {getLabelById, updateLabel, updateTeamDetails, getTeam} =require("../lib");

exports.editLabel = function(request, response) {
  const displayName = request.body.data.DisplayName;
  const iconName = request.body.data.IconName;
  const colorCode = request.body.data.ColorCode;
  const orgDomain = request.body.data.OrgDomain;
  const teamName = request.body.data.TeamName;
  const docId = request.body.data.Id;
  const scope = request.body.data.Scope;
  let prevDisplayName = "";
  let updateArray = [];

  let result;
  let status = 200;

  const promise = getLabelById(orgDomain, teamName, docId).then((labelData) => {
    if (labelData == undefined) {
      result = {data: {status: "Label does not exist"}};
    } else {
      const inputJson = {
        DisplayName: displayName,
        IconName: iconName,
        ColorCode: colorCode,
      };
      updateLabel(inputJson, orgDomain, teamName, docId);

      prevDisplayName = labelData.DisplayName;
      const promise2 = getTeam(orgDomain, teamName).then((team) => {
        if (team) {
          let updateJson = {};
          if (scope == "Priority") {
            updateArray = team.Priority;
            const index = updateArray.indexOf(prevDisplayName);
            updateArray[index]= displayName;
            updateJson = {
              Priority: updateArray,
            };
          } else if (scope == "Difficulty") {
            updateArray = team.Difficulty;
            const index = updateArray.indexOf(prevDisplayName);
            updateArray[index]= displayName;
            updateJson = {
              Difficulty: updateArray,
            };
          } else if (scope == "Status") {
            updateArray = team.Status;
            const index = updateArray.indexOf(prevDisplayName);
            updateArray[index]= displayName;
            updateJson = {
              Status: updateArray,
            };
          } else if (scope == "Type") {
            updateArray = team.Type;
            const index = updateArray.indexOf(prevDisplayName);
            updateArray[index]= displayName;
            updateJson = {
              Type: updateArray,
            };
          } else if (scope == "MilestoneStatus") {
            updateArray = team.MilestoneStatus;
            const index = updateArray.indexOf(prevDisplayName);
            updateArray[index]= displayName;
            updateJson = {
              MilestoneStatus: updateArray,
            };
          }
          updateTeamDetails(updateJson, orgDomain, teamName);

          result = { data: "Labels Updated Successfully" };
        } else {
          status = 500;
          result = { data: "Error: Team doesn't exist" };
        }
      }).catch((error) => {
        status = 500;
      });
      return Promise.resolve(promise2);
    }
  }).catch((error) => {
    status = 500;
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK", labelsArray: updateArray}};
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = {data: error};
        return response.status(status).send(result);
      });
};
