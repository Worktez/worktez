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

const { getOrg } = require("../../organization/lib");

exports.creatTeamNaneCheck = function(request, response) {
    let status = 200;
    let resultData = "";
    const teamId = request.body.data.TeamId;
    const teamName = request.body.data.TeamName;
    const orgDomain = request.body.data.OrganizationDomain;
    getOrg(orgDomain).then((orgDoc) => {
        for (let i = 0; i < orgDoc.TeamsName.length; i++) {
            if (orgDoc.TeamsName[i] == teamName) {
                resultData = "teamName Already taken";
                break;
            } else {
                    resultData = "teamName Available";
            }
          }
        const result = { data: resultData};
        return response.status(status).send(result);
    }).catch((err) => {
            status = 500;
            resultData = "teamName Already taken";
            console.error("Error : " + err);
            const result = { data: resultData };
            return response.status(status).send(result);
    });
};
