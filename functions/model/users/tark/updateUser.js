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

const { updateUser } = require("../lib");
const { sendMail } = require("../../email/lib");
const { profileMailer } = require("../../mailer/lib");

exports.updateUser = function(request, response) {
    const uid = request.body.data.Uid;
    const displayName = request.body.data.DisplayName;
    const aboutMe = request.body.data.AboutMe;
    const phoneNumber = request.body.data.PhoneNumber;
    const linkedInProfile = request.body.data.LinkedInProfile;
    const githubProfile = request.body.data.GithubProfile;
    const website = request.body.data.Website;
    const Username = request.body.data.Username;
    const email = request.body.data.Email;

    let result;

    updateUserInputJson = {
        displayName: displayName,
        AboutMe: aboutMe,
        phoneNumber: phoneNumber,
        LinkedInProfile: linkedInProfile,
        GithubProfile: githubProfile,
        Website: website,
        Username: Username,
    };
    updateUser(updateUserInputJson, uid).then(() => {
        profileMailer("Edit_Profile", uid, email, displayName);
        result = { data: "User Profile updated successfully" };
        console.log("Successful");
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};