/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Swapnil Bankar <swapnilbankar1010@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const { getApplicationData } = require("../../application/lib");

exports.orgDomainCheck = function(request, response) {
  let status = 200;
  let result;
  getApplicationData().then((data) => {
    if (data) {
      result = { data: {status: "OK", resultData: data} };
      return response.status(status).send(result);
    }
  }).catch((error) => {
    status = 500;
    result = { data: error };
    console.error("Error Getting Org Data", error);
    return response.status(status).send(result);
  });
};