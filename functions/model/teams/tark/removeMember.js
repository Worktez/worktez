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
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { updateTeamDetails } = require("../lib");

exports.removeMember = function(request, response) {
    const orgDomain = request.body.data.OrganizationDomain;
    const teamName = request.body.data.TeamName;
    const teamMembers = request.body.data.TeamMembers;
    const remove = request.body.data.Remove;
    let result;
    let status = 200;

    const index = teamMembers.indexOf(remove);
    if (index != -1) {
        teamMembers.splice(index, 1);
        const updateJson = {
            TeamMembers: teamMembers,
        };
        updateTeamDetails(updateJson, orgDomain, teamName);
        result = { data: "Member removed Successfully" };
        console.log("Member removed Successfully");
    } else {
        result = { data: "Member not found" };
        console.error("Error while removing member");
        status = 500;
    }
    return response.status(status).send(result);
};
