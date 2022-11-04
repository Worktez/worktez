/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Sanjay Krishna <sanjaykrishna1203@gmail.com>
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
const { getUser } = require("../lib");

exports.getUserByUsername = function(request, response) {
  const username = request.body.data.Username;
  let result;
  let status = 200;

  const p1 = getUser("", username).then((userDoc) => {
    if (userDoc == undefined) {
      result = {data: {status: "ERROR", userData: undefined}};
    } else {
      result = {data: {status: "OK", userData: userDoc}};
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });
  return Promise.resolve(p1).then(() => {
    console.log("Fetched User Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Fetching User", error);
    return response.status(status).send(result);
  });
};

