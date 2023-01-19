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

const {getReleaseData} = require("../lib");

exports.getRelease = function(request, response) {
  let result;
  let status = 200;
  const orgDomain = request.body.data.OrgDomain;
  const releaseId = request.body.data.ReleaseId;

  const promise = getReleaseData(orgDomain, releaseId).then(
      (releaseData) => {
        result = {data: {status: "OK", data: releaseData}};
      }).catch((error) => {
    result = {data: error};
    status = 500;
    console.error("Error", error);
  });
  return Promise.resolve(promise).then(() => {
    console.log("Fetched Release data of ", releaseId, "Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error", error);
    return response.status(status).send(result);
  });
};
