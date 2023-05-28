/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Aditya Khedekar <aditya3034@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const { getMilestoneData, updateMilestone } = require("../lib");

exports.deleteMilestone = function (request, response) {
    const deleted = true;
    const milestoneID = request.body.data.MilestoneId;
    const orgDomain = request.body.data.OrganizationDomain;
    let status = 200;
    
    const promise = getMilestoneData(orgDomain, milestoneID).then((mDoc) => {
        if (mDoc) {
            const updateJson = {
                Deleted: deleted,
            };
            updateMilestone(updateJson, orgDomain, milestoneID);
            result = { data: "Milestone deleted Successfully" };
            console.log("Milestone deleted Successfully");
        } else {
            status = 500;
            result = { data: "Milestone: Milestone doesn't exist" };
            console.log("Milestone: Milestone doesn't exist");
        }
    }).catch((error) => {
        status = 500;
        console.log("Error: ", error);
    });

    return Promise.all(promise).then(() => {
        return response.status(status).send(result);
    })
        .catch((error) => {
            result = { data: error };
            console.error("Error deleting Milestone", error);
            return response.status(status).send(result);
        });
}