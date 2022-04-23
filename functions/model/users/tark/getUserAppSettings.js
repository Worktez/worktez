/* eslint-disable linebreak-style */
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

/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getUser } = require("../lib");

exports.getUserAppSettings = function(request, response) {
    const user = request.body.data;
    const uid = user.Uid;
    const username = user.Username;

    let userData;
    let status = 200;
    let result;

    const promise1 = getUser(uid, username).then((data) => {
        if (data == undefined) {
            console.log("User doesn't exist");
            result = { data: { status: "Ok", userData: undefined } };
        } else {
            userData = data;
            result = { data: { status: "Ok", userData: userData } };
        }
    }).catch((err) => {
        status = 500;
        console.error("Error : " + err);
    });

    Promises = [promise1];
    return Promise.all(Promises).then(() => {
            return response.status(status).send(result);
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error Getting User Data", error);
            return response.status(status).send(result);
        });
};