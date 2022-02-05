/***********************************************************
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
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { updateUser, getUserUseEmail } = require("../lib");

exports.updateDateOfJoining = function(memberEmail, date) {
    const promise = getUserUseEmail(memberEmail).then((doc) => {
        uid = doc.data().uid;
        previousDateOfJoining = doc.data().DateOfJoining;

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