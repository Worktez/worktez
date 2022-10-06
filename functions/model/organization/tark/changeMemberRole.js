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
 * Author : Abhishek Mishra <am1426620@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

 const {updateMember} = require("../lib");

exports.editRole = function(request, response) {
    const orgDomain = request.body.data.OrgDomain;
    const email = request.body.data.Email;
    const isAdmin = request.body.data.IsAdmin;
    const teamManager = request.body.data.TeamManager;

    let result;
    updateMemberInputJson = {
        IsAdmin: isAdmin,
        TeamManager: teamManager,
        };
    updateMember(updateMemberInputJson, orgDomain, email).then(() => {
        result = { data: "Organisation Member Role updated successfully" };
        console.log("Successful");
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};