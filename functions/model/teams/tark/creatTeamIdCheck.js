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

const { getOrg } = require("../../organization/lib");

exports.creatTeamIdCheck = function(request, response) {
  let status = 200;
  let resultData = "";
  const teamId = request.body.data.TeamId;
  const orgDomain = request.body.data.OrganizationDomain;
  getOrg(orgDomain).then((orgDoc) => {
    for (let i = 0; i < orgDoc.TeamsId.length; i++) {
      if (orgDoc.TeamsId[i] == teamId) {
        resultData = "teamId Already taken";
        break;
      } else {
        resultData = "teamId Available";
      }
    }
    const result = { data: resultData};
    return response.status(status).send(result);
  }).catch((err) => {
    status = 500;
    resultData = "teamId Already taken";
    console.error("Error : " + err);
    const result = { data: resultData };
    return response.status(status).send(result);
  });
};