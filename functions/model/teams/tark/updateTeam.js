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

const { updateTeamDetails, getTeam } = require("../lib");

exports.updateTeam = function(request, response) {
    const teamDescription = request.body.data.TeamDescription;
    const teamManagerEmail = request.body.data.TeamManagerEmail;
    const type = request.body.data.TypeLabels;
    const statusLabels = request.body.data.StatusLabels;
    const priorityLabels = request.body.data.PriorityLabels;
    const difficultyLabels = request.body.data.DifficultyLabels;

    const orgDomain = request.body.data.OrganizationDomain;
    const teamName = request.body.data.TeamName;

    let status = 200;
    let result = { data: "Error in updating team" };

    const promise1 = getTeam(orgDomain, teamName).then((team) => {
        if (team) {
            const updateJson = {
                TeamDescription: teamDescription,
                TeamManagerEmail: teamManagerEmail,
                Type: type,
                StatusLabels: statusLabels,
                PriorityLabels: priorityLabels,
                DifficultyLabels: difficultyLabels,
            };
            updateTeamDetails(updateJson, orgDomain, teamName);
            result = { data: "Team Updated Successfully" };
            console.log("Team Updated Successfully");
        } else {
            status = 500;
            result = { data: "Error: Team doesn't exist" };
            console.log("Error: Team doesn't exist");
        }
    }).catch((error) => {
        status = 500;
        console.log("Error: ", error);
    });

    const Promises = [promise1];
    return Promise.all(Promises).then(() => {
            return response.status(status).send(result);
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error updating Team", error);
            return response.status(status).send(result);
        });
};