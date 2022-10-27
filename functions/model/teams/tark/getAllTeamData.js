/* eslint-disable linebreak-style */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * Author : Sanjay Krishna <sanjaykrishna1203@gmail.com>
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

/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getAllTeams } = require("../lib");

exports.getAllTeamData = function(request, response) {
    const orgDomain = request.body.data.OrganizationDomain;
    let status = 200;
    let result;
    const teamData = [];
    console.log("Orgdomain", orgDomain);

    getAllTeams(orgDomain).then((team) => {
        team.forEach((element) => {
            teamData.push(element.data());
        });
        const res = {};
        let i;
        for (i=0; i< teamData.length; i++) {
            console.log(teamData[i]);
            const teamName = teamData[i].TeamName;
            res[teamName] = teamData[i];
        }
        console.log(res);
        const jsonString= JSON.stringify(res);
        console.log(jsonString);
            result = { data: {status: "OK", resultData: res} };
            return response.status(status).send(result);
    }).catch((error) => {
        status = 500;
        result = { data: error };
        console.error("Error Getting Teams", error);
        return response.status(status).send(result);
    });
};
