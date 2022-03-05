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
const { getMyOrgCollectionDoc, setMyOrgCollection, updateMyOrgCollection } = require("../lib");

exports.updateTeamInOrganizations = function(uid, orgDomain, orgAppKey, teamId) {
    getMyOrgCollectionDoc(uid, orgDomain).then((orgDoc) => {
        if (orgDoc == undefined) {
            const teamIdArray = [teamId];
            setMyOrgCollection(uid, orgDomain, orgAppKey, teamIdArray, teamId);
            result = { data: "MyOrganizations Created Successfully" };
        } else {
            const teams= orgDoc.Teams;
            teams.push(teamId);
            let defaultTeam;
            let updateJson = {
                Teams: teams,
            };
            if (teams.length == 1) {
                defaultTeam = teamId;
                updateJson = {
                    Teams: teams,
                    DefaultTeam: defaultTeam,
                };
            }
            updateMyOrgCollection(updateJson, uid, orgDomain);
            result = { data: "MyOrganizations Updated Successfully" };
            console.log("MyOrganizations Updated Successfully");
        }
    }).catch((error) => {
        console.log("Error: ", error);
    });
};