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
const { updateUser } = require("../lib");

exports.setMyOrganization = function(request, response) {
    const uid = request.body.data.Uid;
    const orgAppKey = request.body.data.OrgAppKey;
    const selectedTeam = request.body.data.SelectedTeam;

    updateUserInputJson = {
        SelectedOrgAppKey: orgAppKey,
        SelectedTeamId: selectedTeam,
    };
    updateUser(updateUserInputJson, uid).then(() => {
        result = { data: "User Profile updated successfully" };
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};