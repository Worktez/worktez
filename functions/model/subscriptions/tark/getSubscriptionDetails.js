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

const {getSubscriptions} = require("../lib");

exports.getSubscriptionDetails = function(request, response) {
  const orgAppKey = request.body.data.OrgAppKey;
  let status = 200;
  let result;

  getSubscriptions(orgAppKey, "").then((sData) => {
    if (sData[0]) {
      result = {data: {status: "OK", resultData: sData[0]}};
      return response.status(status).send(result);
    }
  }).catch((error) => {
    status = 500;
    result = {data: error};
    console.error("Error getting subscription data", error);
    return response.status(status).send(result);
  });
};