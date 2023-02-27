/* eslint-disable max-len */
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

const {getGitDetailsById, updateGitDetails, updateTeamDetails} = require("../lib");

exports.updateGitDetails = function(request, response) {
  const bearerToken = request.body.data.Token;
  // const projLink = request.body.data.ProjectLink;
  // const docId = request.body.data.DocId;
  const teamName = request.body.data.TeamName;
  const orgDomain = request.body.data.OrganizationDomain;
  console.log(bearerToken, teamName, orgDomain);
  let result;
  let status = 200;

  const promise = getGitDetailsById(orgDomain, teamName).
      then((gitData) => {
        console.log(gitData);
        if (gitData == undefined) {
          result = {data: {status: "Git Data does not exist"}};
        } else {
          const inputJson = {
            GitToken: bearerToken,
          };
          updateGitDetails(inputJson, orgDomain, teamName, "GitInfo");
          updateTeamDetails(inputJson, orgDomain, teamName);
        }
      }).catch((error) => {
        status=500;
        console.log("Error:", error);
      });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Git Details updated successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error editing Git Details");
  });
};
