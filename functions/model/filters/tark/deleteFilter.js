/* eslint-disable max-len */
/* eslint-disable no-const-assign */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Simran Nigam <nigamsimran14@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const {getFilterById, updateFilter} = require("../lib");

exports.deleteFilter = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const teamName = request.body.teamName;
  const docId = request.body.data.Id;

  let result;
  const status = 200;

  const promise = getFilterById(orgDomain, teamName, docId).then((filterData) => {
    if (filterData == undefined) {
      result = {data: {status: "Filter does not exist"}};
    } else {
      const updateFilterToJson = {
        Status: "DELETED",
      };
      updateFilter(updateFilterToJson, orgDomain, teamName, docId);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Filter Deleted Successfully");
    return response.status.send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error Deleting", error);
    return response.status(status).send(result);
  });
};
