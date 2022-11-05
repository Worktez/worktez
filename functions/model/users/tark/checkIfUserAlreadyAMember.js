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

const {getUserUseEmail, getMyOrgCollectionDoc} = require("../lib");

exports.checkIfUserAlreadyAMember = function(request, response) {
  const organizationDomain = request.body.data.OrganizationDomain;
  // const teamName = request.body.data.TeamName;
  const teamId =request.body.data.TeamId;
  const userEmail = request.body.data.UserEmail;
  let status = 200;
  let resultData = "false";
  getUserUseEmail(userEmail).then((data)=>{
    if (data != undefined) {
      getMyOrgCollectionDoc(data.uid, organizationDomain).then((OrgData)=>{
        if (OrgData != undefined) {
          if (OrgData.Teams.includes(teamId)) {
            resultData = "true";
          }
        } else {
          resultData = "false";
        }
        const result = {data: resultData};
        return response.status(status).send(result);
      });
    } else {
      resultData = "false";
      const result = {data: resultData};
      return response.status(status).send(result);
    }
  }).catch((err) => {
    status = 500;
    resultData = "false";
    console.error("Error : " + err);
    const result = {data: resultData};
    return response.status(status).send(result);
  });
};
