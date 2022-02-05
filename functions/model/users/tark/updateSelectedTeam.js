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

const { updateUser } = require("../lib");

exports.updateSelectedTeam = function(request, response) {
    const uid = request.body.data.Uid;
    const selectedTeam = request.body.data.SelectedTeam;
    let result;

    updateUserInputJson = {
        SelectedTeamId: selectedTeam,
    };
    updateUser(updateUserInputJson, uid).then(() => {
        result = { data: "User's Selected Team is updated successfully" };
        console.log("Selected Team Updated Successfully");
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};