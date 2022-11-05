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
const { getSprint } = require("../lib");
const { createSprintName } = require("../../application/lib");

exports.getSprintDetails = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const sprintNumber = request.body.data.SprintNumber;
  const teamName = request.body.data.TeamName;
  const fullSprintName = createSprintName(sprintNumber);
  let result;
  const status = 200;

  const p1 = getSprint(orgDomain, teamName, fullSprintName).then((snapshot) => {
    result = snapshot;
  });

  return Promise.resolve(p1).then(() => {
    result = {data: {status: "Ok", sprintData: result}};
    return response.status(status).send(result);
  }).catch((error) => {
    console.error(error);
    result= {data: {status: "Error", sprintData: undefined}};
    return response.status(status).send(result);
  });
};

