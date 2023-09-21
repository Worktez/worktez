/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * Author: Sanjay Krishna S R <sanjaykrishna1203@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const { autoSprint } = require("./autoSprint");

exports.manualStart = function(request, response) {
  // const appKey = request.body.data.AppKey;
  // const teamId = request.body.data.TeamId;
  let result;
  let status = 200;
  const promise = autoSprint();
  return Promise.resolve(promise).then(() => {
    result = { data: "Sprint Updated Successfully" };
    console.log("Sprint Updated Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    result = { data: error };
    status = 500;
    console.error("Error Updating Sprint", error);
    return response.status(status).send(result);
  });
};
