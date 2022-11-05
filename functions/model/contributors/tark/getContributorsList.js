/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

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

const { getContributors } = require("../lib");

exports.getContributorsList = function(request, response) {
  let status = 200;
  let result;

  getContributors().then((doc) => {
    result = { data: doc };
    console.log("Sent contributors successfully");
    return response.status(status).send(result);
  }).catch((error)=>{
    status = 500;
    const result = { data: error };
    console.error("Error getting contributors", error);
    return response.status(status).send(result);
  });
};