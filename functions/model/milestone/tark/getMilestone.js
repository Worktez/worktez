/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Sanjay Krishna <sanjaykrishna1203@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const { getMilestoneData } = require("../lib");

 /**
 * Description
 * @param {any} request
 * @param {any} response
 * @return {any}
 */
exports.getMilestone = function(request, response) {
    let result;
    let status = 200;
    const orgDomain = request.body.data.OrgDomain;
    const milestoneId = request.body.data.MilestoneId;

    const promise1 = getMilestoneData(orgDomain, milestoneId).then((MilestoneData) => {
        result = { data: { status: "OK", data: MilestoneData } };
    }).catch((error) => {
        result = { data: error };
        status = 500;
        console.error("Error", error);
    });
    return Promise.resolve(promise1).then(() => {
        console.log("Fetched Milestone data of ", milestoneId, "Successfully");
        return response.status(status).send(result);
    }).catch((error) => {
        console.error("Error Adding Reaction", error);
        return response.status(status).send(result);
    });
};