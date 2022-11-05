/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

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

const { getOrg, updateOrgRawData, getOrgRawData } = require("../../organization/lib");
const { createMember } = require("../../organization/tark/createMember");
const { getTeam } = require("../../teams/lib");
const { getUserUseEmail, updateUser } = require("../lib");
const { updateTeamInOrganizations } = require("./updateTeamInOrganizations");

exports.verifyUser = function(request, response) {
  const organizationDomain = request.body.data.OrganizationDomain;
  const teamId = request.body.data.TeamId;
  const teamName = request.body.data.TeamName;
  const userEmail = request.body.data.UserEmail;
  let appKey = "";
  let organizationId = "";
  let userID = "";
  let status = 200;

  getTeam(organizationDomain, teamName).then((teamDoc) => {
    const teamMembers = teamDoc.TeamMembers;
    const orgDomain = teamDoc.orgDomain;
    if (teamMembers.indexOf(userEmail) != -1) {
      getOrg(organizationDomain).then((orgDoc) => {
        organizationId = orgDoc.OrganizationId;
        appKey = orgDoc.AppKey;
        const p11 = getUserUseEmail(userEmail).then((userDoc) => {
          userID = userDoc.uid;
          const updateUserInputJson = {
            OrganizationId: organizationId,
            SelectedTeamId: teamId,
            SelectedOrgAppKey: appKey,
          };
          const createMemberInput = {
            orgDomain: organizationDomain,
            email: userEmail,
            isAdmin: false,
            teamManager: false,
            teams: [teamId],
          };
          updateUser(updateUserInputJson, userID);
          updateTeamInOrganizations(userID, organizationDomain, appKey, teamId);
          createMember(createMemberInput);

          /* We are not using this method anymore*/
          // getApplicationData().then((data) => {
          //     const totalNumberOfMembers = data.TotalNumberOfMembers;

          //     const appDetailsUpdateJson = {
          //         TotalNumberOfMembers: totalNumberOfMembers + 1,
          //     };

          //     updateApplication(appDetailsUpdateJson);
          // });
          getOrgRawData(orgDomain).then((orgData) => {
            const totalNumberOfMembers = orgData.TotalNumberOfMembers;

            const appDetailsUpdateJson = {
              TotalNumberOfMembers: totalNumberOfMembers + 1,
            };

            updateOrgRawData(appDetailsUpdateJson);
          });
        }).catch((error) => {
          status = 500;
          console.log("Error:", error);
        });
        return Promise.resolve(p11);
      });
      const result = { data: "User Verified Successfully" };
      console.log("User Verified Successfully");
      return response.status(status).send(result);
    } else {
      const result = { data: "Can't verify user" };
      console.log("Can't verify user");
      return response.status(status).send(result);
    }
  }).catch((error) => {
    const result = { data: error };
    console.error("Error ", error);
    return response.status(status).send(result);
  });
};
