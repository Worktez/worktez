const {getTeam, updateTeamDetails, setGitDetails} = require("../lib");

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

exports.addGitDetails = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const teamName = request.body.data.TeamName;
  const addedOn = request.body.data.AddedOn;
  const owner = request.body.data.Owner;
  const bearerToken = request.body.data.BearerToken;
  const projectId = request.body.data.ProjectId;
  const projectLink = request.body.data.ProjectLink;
  const projectUrl = request.body.data.ProjectUrl;
  const projectLocation = request.body.data.ProjectLocation;

  let result;
  let status=200;

  const promise = getTeam(orgDomain, teamName).then((team) => {
    if (team) {
      const id = "GitInfo";
      const updateJson = {
        GitToken: bearerToken,
        ProjectLink: projectLink,
        ProjectLocation: projectLocation,
      };
      updateTeamDetails(updateJson, orgDomain, teamName);
      setGitDetails(orgDomain, teamName, addedOn, owner,
          bearerToken, projectId, projectLink, projectUrl, projectLocation, id);
      result = {data: "Git Details Updated SUccessfully"};
      console.log("Git Details Updated Successfully");
    } else {
      status=500;
      result = {data: "Error: Git Details not updated"};
      console.log("Error: Git Details not updated");
    }
  }).catch((error) => {
    status=500;
    console.log("Error: ", error);
  });

  const Promises = [promise];
  Promise.all(Promises).then(() => {
    return response.status(status).send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error updating git details", error);
    return response.status(status).send(result);
  });
};
