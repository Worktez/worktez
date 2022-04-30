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

/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { updateUserExperience } = require("../lib");
const { profileMailer } = require("../../mailer/lib");

exports.updateExperience = function(request, response) {
    const experienceDoc = request.body.data.ExperienceId;
    const uid = request.body.data.Uid;
    const organizationName = request.body.data.OrganizationName;
    const position = request.body.data.Position;
    const start = request.body.data.Start;
    const end = request.body.data.End;
    const displayName = request.body.data.DisplayName;
    const email = request.body.data.Email;

    let result;

    const inputJson = {
        Start: start,
        End: end,
        OrganizationName: organizationName,
        Position: position,
    };
    updateUserExperience(uid, experienceDoc, inputJson).then(() => {
        profileMailer("Update_Experience_Profile", uid, email, displayName);
        result = { data: "User Experience updated successfully" };
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};