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
const {getReleaseData, updateRelease} = require("../lib");

exports.deleteRelease = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const releaseId = request.body.data.ReleaseId;
  let result;
  let status = 200;
  console.log(orgDomain, releaseId);
  const promise = getReleaseData(orgDomain, releaseId).then((releaseData) => {
    if (releaseData == undefined) {
      result = {data: {status: "Release does not exist"}};
    } else {
      const updateReleaseToJson={
        Status: "DELETED",
      };
      updateRelease(updateReleaseToJson, orgDomain, releaseId);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Release Deleted Successfully");
    return response.status.send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error Deleting", error);
    return response.status(status).send(result);
  });
};
