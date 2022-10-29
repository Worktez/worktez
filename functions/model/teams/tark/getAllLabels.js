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

const { getAllLabels, getAllTeams } = require("../lib");

exports.getAllLabels = function(request, response) {
    const orgDomain = request.body.data.OrganizationDomain;
    let status = 200;
    let result;
    const res = {};

    const p = getAllTeams(orgDomain).then((docs) => {
        let p2;
        docs.forEach((element) => {
            const teamdata = element.data();
            const teamName = teamdata.TeamName;
            const teamId = teamdata.TeamId;
            res[teamId]={};
            p2 = getAllLabels(orgDomain, teamName).then((data)=>{
                data.forEach((d) => {
                    res[teamId][d.Scope] = {};
                });
                data.forEach((d) => {
                    res[teamId][d.Scope][d.DisplayName] = d;
                });
            });
        });
        return Promise.resolve(p2);
    }).catch((error) => {
        status = 500;
        console.log("Error: ", error);
    });
    return Promise.resolve(p).then(() => {
        console.log(res);
        result = { data: res };
        return response.status(status).send(result);
    })
    .catch((error) => {
        result = { data: error };
        console.error("Error Getting labels", error);
        return response.status(status).send(result);
    });
};
