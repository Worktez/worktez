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

/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { updateTeamDetails } = require("../lib");
const { sendVerificationEmail } = require("../../users/tark/addUserEmail");

exports.addMember = function(request, response) {
    const orgDomain = request.body.data.OrganizationDomain;
    const teamName = request.body.data.TeamName;
    const teamMembers = request.body.data.TeamMembers;
    const add = request.body.data.Add;
    const teamManager = request.body.data.TeamManager;
    const teamDescription = request.body.data.TeamDescription;
    const teamId = request.body.data.TeamId;

    let result;
    let status = 200;

    let found= teamMembers.includes(add);
    if (found){
         
    alert("member already exists");
    }
    else {
        teamMembers.push(add);
        const updateJson = {
            TeamMembers: teamMembers,
        };
        updateTeamDetails(updateJson, orgDomain, teamName);
        sendVerificationEmail(teamName, teamManager, teamDescription, add, orgDomain, teamId);
        result = { data: "Member added Successfully" };
        console.log("Member added Successfully");
    } /*else {
        result = { data: "Member not found" };
        console.error("Error while adding member");
        status = 500;
    }
    */return response.status(status).send(result);
};