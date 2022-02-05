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
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getUser } = require("../lib");

exports.checkAvailableUsername = function(request, response) {
    const username = request.body.data.Username;

    let status = 200;
    let resultData = "";

    getUser("", username).then((data) => {
        if (data == undefined) {
            resultData = "User Not Available";
        } else {
            resultData = "User Already Available";
        }
        const result = { data: resultData };
        return response.status(status).send(result);
    }).catch((err) => {
        status = 500;
        resultData = "User Not Available";
        console.error("Error : " + err);
        const result = { data: resultData };
        return response.status(status).send(result);
    });
};