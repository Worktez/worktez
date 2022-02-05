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

const { getAllUserExperience } = require("../lib");

exports.getExperienceList = function(request, response) {
    console.log("coming to getting experience list");
    const uid = request.body.data.Uid;

    let status = 200;
    const resultData = [];
    let result;

    console.log("Reading Data of experience");

    getAllUserExperience(uid).then((snapshot) => {
        if (snapshot == undefined) {
            result = { data: { status: "Not Found", data: "No Experience Listed" } };
        } else {
            snapshot.forEach((element) => {
                data = element.data();
                data["ExperienceId"] = element.id;
                resultData.push(data);
            });
            result = { data: { status: "Ok", data: resultData } };
        }
        return response.status(status).send(result);
    }).catch((error) => {
        status = 500;
        console.log("Error: ", error);
        result = { data: { status: "Error", data: "No Experiences Listed" } };
        return response.status(status).send(result);
    });
};