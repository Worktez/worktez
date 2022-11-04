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


const { updateUser, getUserUseEmail } = require("../lib");

exports.updateDateOfJoining = function(memberEmail, date) {
  const promise = getUserUseEmail(memberEmail).then((doc) => {
    const uid = doc.data().uid;
    const previousDateOfJoining = doc.data().DateOfJoining;

    if (!previousDateOfJoining) {
      const updateUserInputJson = {
        DateOfJoining: date,
      };
      updateUser(updateUserInputJson, uid);
    }
  });
  return Promise.resolve(promise).then(() => {
    console.log("Updated Date of Joining successfully !");
    return 0;
  }).catch((error) => {
    console.log("Error occured in updating date of Joining", error);
  });
};