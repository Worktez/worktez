/* eslint-disable linebreak-style */
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

/* eslint-disable object-curly-spacing */

const { getOrg, updateOrg } = require("../../organization/lib");
const { updateTeamDetails, getTeam } = require("../lib");
const admin = require("firebase-admin");

exports.deleteTeam = function(request, response) {
  const teamStatus = -1;
  const teamId = request.body.data.TeamId;
  const orgDomain = request.body.data.OrganizationDomain;
  const teamName = request.body.data.TeamName;

  let status = 200;
  let result = {data: "Error in deleting team"};

  const promise1 = getTeam(orgDomain, teamName).then((team) => {
    if (team.TeamName) {
      const updateJson = {
        TeamStatus: teamStatus,
      };
      updateTeamDetails(updateJson, orgDomain, teamName);
      result = {data: "Team deleted Successfully"};
      console.log("Team deleted Successfully");
    } else {
      status = 500;
      result = {data: "Error: Team doesn't exist"};
      console.log("Error: Team doesn't exist");
    }
  }).catch((error) => {
    status = 500;
    console.log("Error: ", error);
  });

  const promise2 = getOrg(orgDomain).then((orgDoc) => {
    if (orgDoc != undefined) {
      const inputJson = {
        TeamsId: admin.firestore.FieldValue.arrayRemove(teamId),
        TeamsName: admin.firestore.FieldValue.arrayRemove(teamName),
      };
      updateOrg(orgDomain, inputJson);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error: ", error);
  });

  const Promises = [promise1, promise2];
  return Promise.all(Promises).then(() => {
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = {data: error};
        console.error("Error deleting Team", error);
        return response.status(status).send(result);
      });
};
