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

/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getLabelInScope } = require("../lib");

exports.getLabelByScope = function(request, response) {
    const orgDomain = request.body.data.OrganizationDomain;
    const teamName = request.body.data.TeamName;
    const scope = request.body.data.Scope;

    let status = 200;
    let result;

    getLabelInScope(orgDomain, teamName, scope).then((labels) => {
        if (labels) {
            result = { data: {status: "OK", resultData: labels} };
            return response.status(status).send(result);
        }
    }).catch((error) => {
        status = 500;
        result = { data: error };
        console.error("Error Getting Teams", error);
        return response.status(status).send(result);
    });
};
