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

/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
const { getMyTeamCollection } = require("../lib");

exports.getMyTeamsList = function(request, response) {
    const uid = request.body.data.Uid;
    const orgAppKey = request.body.data.OrgAppKey;
    let status = 200;
    let result;

    getMyTeamCollection(uid, orgAppKey).then((doc) => {
        if (doc == undefined) {
            result = { data: {status: "Not Found", data: "No Teams Listed"} };
        } else {
            result = { data: {status: "Ok", data: doc} };
        }
        return response.status(status).send(result);
    }).catch((error) => {
        status = 500;
        console.error("Error: ", error);
        result = { data: {status: "Error", data: "No Teams Listed"}};
        return response.status(status).send(result);
    });
};