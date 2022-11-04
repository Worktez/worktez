/* eslint-disable linebreak-style */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Twinkle Chatterjee
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
const { updateTeamDetails, getTeam } = require("../lib");
const { createLabelProperties } = require("./createLabelProperties");

exports.createDefaultLabels = function(request, response) {
    const orgDomain = request.body.data.OrganizationDomain;
    const teamName = request.body.data.TeamName;
    const scope = request.body.data.Scope;
    const type = request.body.data.Type;
    const statusLabels = request.body.data.StatusLabels;
    const priorityLabels = request.body.data.PriorityLabels;
    const difficultyLabels = request.body.data.DifficultyLabels;
    const milestoneStatusLabels = request.body.data.MilestoneStatusLabels;

    let status = 200;
    let result = { data: "Error in adding default labels" };

    const promise1 = createLabelProperties(orgDomain, teamName, type, statusLabels, priorityLabels, difficultyLabels, milestoneStatusLabels).then(() => {
        console.log("Labels created successfully!");
        status = 200;
        result = { data: "Labels created successfully!" };
    }).catch((error) => {
        status = 500;
        console.log("Error: ", error);
    });

    const promise2 = getTeam(orgDomain, teamName).then((team) => {
        if (team) {
            const updateJson = {
                Scope: scope,
                Type: type,
                Status: statusLabels,
                Priority: priorityLabels,
                Difficulty: difficultyLabels,
                MilestoneStatus: milestoneStatusLabels,
            };
            updateTeamDetails(updateJson, orgDomain, teamName);
            result = { data: "Labels Updated Successfully" };
        } else {
            status = 500;
            result = { data: "Error: Team doesn't exist" };
        }
    }).catch((error) => {
        status = 500;
        console.log("Error: ", error);
    });


    const Promises = [promise1, promise2];
    Promise.all(Promises).then(() => {
        return response.status(status).send(result);
    })
    .catch((error) => {
        result = { data: error };
        console.error("Error: ", error);
        return response.status(status).send(result);
    });
};