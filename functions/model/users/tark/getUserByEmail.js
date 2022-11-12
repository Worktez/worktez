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

const { getAllUsersInEmail } = require("../lib");

exports.getUserByEmail = function(request, response) {
  const emails = request.body.data.Email;
  let userData = [];
  let status = 200;
  let result;
  const Promises = [];

  while (emails.length > 0) {
    let temp;

    if (emails.length > 10) {
      temp = emails.slice(0, 10);
    } else {
      temp = emails.slice(0, emails.length);
    }

    const promise = getAllUsersInEmail(temp).then((data) => {
      if (data == undefined) {
        console.log("Users doesn't exist");
        result = { data: { status: "Ok", userData: undefined } };
      } else {
        userData = userData.concat(data);
      }
    }).catch((err) => {
      status = 500;
      console.error("Error : " + err);
    });

    Promises.push(promise);

    if (emails.length > 10) {
      emails.splice(0, 10);
    } else {
      emails.splice(0, emails.length);
    }
  }

  return Promise.all(Promises).then(() => {
    result = { data: { status: "Ok", userData: userData } };
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = { data: error };
        console.error("Error Getting User Data", error);
        return response.status(status).send(result);
      });
};