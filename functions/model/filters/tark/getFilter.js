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
const {getFilters} = require("../lib");

exports.getFilter = function(request, response) {
  const orgDomain = request.body.data.OrganizationDomain;
  const teamName = request.body.data.TeamName;
  let status = 200;
  let result;

  getFilters(orgDomain, teamName).then((filterData) => {
    if (filterData) {
      result = {data: {status: "OK", resultData: filterData}};
      return response.status(status).send(result);
    }
  }).catch((error) => {
    status = 500;
    result = {data: error};
    console.error("Error getting Team", error);
    return response.status(status).send(result);
  });
};
