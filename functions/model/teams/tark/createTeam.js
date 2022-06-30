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

const admin = require("firebase-admin");
const { setTeam, getTeam } = require("../lib");
const { getOrg, updateOrg } = require("../../organization/lib");
const { setSprint } = require("../../sprints/lib");
const { updateTeamInOrganizations} = require("../../users/tark/updateTeamInOrganizations");
const { sendVerificationEmail } = require("../../users/tark/addUserEmail");
const { createLabelProperties } = require("./createLabelProperties");
const { setSchedularUnit } = require("../../scheduledFunctions/tark/setSchedular");
const { getUser, updateUser } = require("../../users/lib")


exports.createTeam = function(request, response) {
    const teamId = request.body.data.TeamId;
    const teamDescription = request.body.data.TeamDescription;
    const teamAdmin = request.body.data.TeamAdmin;
    const teamManagerEmail = request.body.data.TeamManagerEmail;
    const teamMembers = request.body.data.TeamMembers;
    const type = request.body.data.TypeLabels;
    const statusLabels = request.body.data.StatusLabels;
    const priorityLabels = request.body.data.PriorityLabels;
    const difficultyLabels = request.body.data.DifficultyLabels;
    const uid = request.body.data.Uid;
    const orgAppKey = request.body.data.OrganizationAppKey;
    const orgDomain = request.body.data.OrganizationDomain;
    const teamName = request.body.data.TeamName;
    const scope = ["Priority", "Difficulty", "Status", "Type"];
    let orgId;
    const teamStatus = 1;

    let status = 200;
    let result = { data: "Error in Creating Team" };

    const promise1 = getOrg(orgDomain).then((orgDoc) => {
        if (orgDoc != undefined) {
            orgId = orgDoc.OrganizationId;

            const inputJson = {
                TeamsId: admin.firestore.FieldValue.arrayUnion(teamId),
                TeamsName: admin.firestore.FieldValue.arrayUnion(teamName),
            };
            updateOrg(orgDomain, inputJson);
        }

        const prom1 = getTeam(orgDomain, teamName).then((team) => {
            if (team == undefined) {
                setTeam(orgDomain, teamName, teamDescription, teamAdmin, teamManagerEmail, teamMembers, scope, type, statusLabels, priorityLabels, difficultyLabels, orgId, teamId, teamStatus).then((data)=>{
                    createLabelProperties(orgDomain, teamName, type, statusLabels, priorityLabels, difficultyLabels);
                    setSchedularUnit("PerformanceChart", orgAppKey, "Team", teamId, orgDomain);
                    setSchedularUnit("SprintEvaluationChart", orgAppKey, "Team", teamId, orgDomain);
                });
                teamMembers.forEach((element) => {
                    sendVerificationEmail(teamName, teamManagerEmail, teamDescription, element, orgDomain, teamId);
                });
                updateTeamInOrganizations(uid, orgDomain, orgAppKey, teamId);
            } else {
                status = 500;
                result = { data: "Error: Team Exists! Use update team" };
                console.log("Error: Team Exists! Use update team");
            }
        }).catch((error) => {
            status = 500;
            console.log("Error:", error);
        });
        return Promise.resolve(prom1);
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const promise2 = getOrg(orgDomain).then((orgDoc) => {
        orgId = orgDoc.OrganizationId;
        setSprint(orgDomain, teamName, "Deleted", orgId, teamId, -2, "-");
        setSprint(orgDomain, teamName, "Backlog", orgId, teamId, -1, "Completed");
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const promise3 = getUser(uid, "").then((userDoc) => {
        const userUpdateJson = {
            SelectedTeamId: teamId,
        };
        updateUser(userUpdateJson, uid);
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const Promises = [promise1, promise2, promise3];
    return Promise.all(Promises).then(() => {
            if (status != 500) {
                result = { data: "Team Created Successfully" };
                console.log("Team Created Successfully");
            }
            return response.status(status).send(result);
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error Creating Team", error);
            return response.status(status).send(result);
        });
};