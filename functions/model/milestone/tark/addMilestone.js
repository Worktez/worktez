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
const { setMilestone } = require("../lib");
const { getAllMilestonesData } = require("../lib");

 /**
 * Description
 * @param {any} request
 * @param {any} response
 */
exports.addMilestone = function(request, response) {
    let result;
    let status = 200;
    const uid = request.body.data.Uid;
    const title = request.body.data.Title;
    const description = request.body.data.Description;
    const orgDomain = request.body.data.OrgDomain;
    const creationDate = request.body.data.CreationDate;
    const creationTime = request.body.data.CreationTime;
    const teamId = request.body.data.TeamId;
    const totalTasks = 0;
    const totalCompletedTask = 0;

    const promise = getAllMilestonesData(orgDomain).then((data) => {
       this.milestoneData = data;
        const milestoneId = "M" + (this.milestoneData.length + 1);

        setMilestone(uid, orgDomain, title, description, milestoneId, teamId, totalTasks, totalCompletedTask, creationDate, creationTime).catch(
            (error) => {
                result = { data: error };
                status = 500;
                console.error("Error", error);
            }
        );
    }).catch((error) => {
        result = { data: error };
        status = 500;
        console.error("Error", error);
    });
        Promise.resolve(promise).then(() => {
            console.log("Milestone added Successfully");
            result = { data: "Milestone added successfully" };
            return response.status(status).send(result);
        })
        .catch((error) => {
            console.error("Error Adding Milestone", error);
            return response.status(status).send(result);
        });
};
