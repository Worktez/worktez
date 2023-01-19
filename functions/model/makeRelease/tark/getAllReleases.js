/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const {getAllReleaseData} = require("../lib");

exports.getAllReleases = function(request, response) {
  let result;
  let status = 200;
  const orgDomain = request.body.data.OrgDomain;
  const teamId = request.body.data.TeamId;

  const promise = getAllReleaseData(orgDomain, teamId).then(
      (releaseData) => {
        console.log(releaseData);
        result = {data: {status: "OK", data: releaseData}};
      }).catch((error) => {
    result = {data: error};
    status = 500;
    console.error("Error", error);
  });
  return Promise.resolve(promise).then(() => {
    console.log("Releases Fetched Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error getting releases", error);
    return response.status(status).send(result);
  });
};
