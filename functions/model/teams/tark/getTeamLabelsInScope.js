/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * Author: Vivek Kumar <vvskindia@gmail.com>
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

const { getLabelInScopes } = require("../lib");

exports.getLabelsInScopes = function(request, response) {
  const orgDomain = request.body.data.OrganizationDomain;
  const teamName = request.body.data.TeamName;
  const scope = request.body.data.Scope;

  let status = 200;
  let result;

  getLabelInScopes(orgDomain, teamName, scope).then((labels) => {
    if (labels) {
      result = { data: {status: "OK", resultData: labels} };
      return response.status(status).send(result);
    }
  }).catch((error) => {
    status = 500;
    result = { data: error };
    console.error("Error Getting Teams", error);
    return response.status(status).send(result);
  });
};
