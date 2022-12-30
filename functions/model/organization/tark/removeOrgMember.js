/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Aditya Khedekar <aditya3034@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

// const { updateApplication, getApplicationData} = require("../../application/lib");
const { updateMember, updateOrgRawData, getOrgRawData } = require("../../organization/lib");
const { getAllTeams, updateTeamDetails } = require("../../teams/lib");
const { getUserUseEmail, updateUser } = require("../../users/lib");
exports.removeOrgMember = function(request, response) {
  const orgDomain = request.body.data.OrganizationDomain;
  const orgMembers = request.body.data.OrgMembers;
  const remove = request.body.data.Remove;
  let result;
  let status = 200;
  let flag = false;
  const index = orgMembers.indexOf(remove);
  if (index != -1) {
    if (orgMembers.includes(remove)) {
      flag = true;
    }
    orgMembers.splice(index, 1);
    const updateJson = {
      Active: false,
    };
    const p1 = updateMember(updateJson, orgDomain, remove);
    if (!flag) {
      getOrgRawData(orgDomain).then((rawData) => {
        let totalNumberOfMembers = parseInt(rawData.TotalNumberOfMembers);
        totalNumberOfMembers = totalNumberOfMembers- 1;
        const updateRawDataInputJson = {
          TotalNumberOfMembers: totalNumberOfMembers,
        };
        updateOrgRawData(updateRawDataInputJson, orgDomain);
      });
      // getApplicationData(orgDomain).then((rawData)=>{
      //   let totalNoOfMembers = parseInt(rawData.TotalNumberOfMembers);
      //   totalNoOfMembers = totalNoOfMembers - 1;
      //   const updateAppDataInputJson = {
      //     TotalNumberOfMembers: totalNoOfMembers,
      //   };
      //   updateApplication(updateAppDataInputJson);
      // });
    }
    const p2 = getAllTeams(orgDomain).then((data)=>{
      data.forEach((element) => {
        const teamsData = element.data();
        const teamMembers = teamsData.TeamMembers;
        const teamName = teamsData.TeamName;
        const teamIndex = teamMembers.indexOf(remove);
        if (teamIndex != -1) {
          teamMembers.splice(teamIndex, 1);
          const updateTeamJson = {
            TeamMembers: teamMembers,
          };
          updateTeamDetails(updateTeamJson, orgDomain, teamName);
        }
      });
    });
    const p3 = getUserUseEmail(remove).then((user)=>{
      const uid = user.uid;
      const updateUserJson ={
        SelectedOrgAppKey: "",
        SelectedTeamId: "",
      };
      updateUser(updateUserJson, uid);
    });

    const promises = [p1, p2, p3];
    return Promise.resolve(promises).then(()=>{
      result = { data: "Member removed Successfully" };
      console.log("Member removed Successfully");
      return response.status(status).send(result);
    });
  } else {
    result = { data: "Member not found" };
    console.error("Error while removing member");
    status = 500;
  }
  return response.status(status).send(result);
};
