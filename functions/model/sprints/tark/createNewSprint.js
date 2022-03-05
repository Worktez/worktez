/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
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

const { createSprintName } = require("../../application/lib");
const { getSprint, setSprint, updateSprint } = require("../lib");
const { getOrgUseAppKey } = require("../../organization/lib");
const { getTeamUseTeamId, updateTeamDetails } = require("../../teams/lib");

exports.createNewSprint = function(request, response) {
    const appKey = request.body.data.AppKey;
    const sprintStatus = request.body.data.Status;
    const startDate = request.body.data.StartDate;
    const endDate = request.body.data.EndDate;
    const newSprintId = parseInt(request.body.data.NewSprintId);
    const newSprintIdString = createSprintName(newSprintId);
    const teamId = request.body.data.TeamId;
    let orgDomain;
    let orgId;
    let teamName;
    let inputJson;

    let status = 200;

    const promise = getOrgUseAppKey(appKey).then((orgDetail) => {
        orgDomain = orgDetail.OrganizationDomain;
        orgId = orgDetail.OrganizationId;

        const startSprint = getTeamUseTeamId(orgDomain, teamId).then((teamDetails) => {
            teamName = teamDetails.TeamName;

            const createSprint = getSprint(orgDomain, teamName, newSprintIdString).then((sprint) => {
                if (sprint == undefined) {
                    setSprint(orgDomain, teamName, newSprintIdString, orgId, teamId, newSprintId, sprintStatus, 0, 0, 0, 0, startDate, endDate);
                } else {
                    const inputJson = {
                        EndDate: endDate,
                        StartDate: startDate,
                        Status: sprintStatus,
                        OrganizationId: orgId,
                    };
                    let value;
                    if (sprintStatus == "Under Progress") {
                        const startStoryPointNumber = sprint.StartStoryPoint;
                        value = "MidStoryPoint";
                        inputJson[value] = startStoryPointNumber;
                    } else if (sprintStatus == "Completed") {
                        const startStoryPointNumber = sprint.StartStoryPoint;
                        value = "MidStoryPoint";
                        inputJson[value] = startStoryPointNumber;
                        value = "EndStoryPoint";
                        inputJson[value] = startStoryPointNumber;
                    }
                    updateSprint(inputJson, orgDomain, teamName, newSprintIdString);
                }
            }).catch((error) => {
                status = 500;
                console.log("Error:", error);
            });

            inputJson = {
                CurrentSprintId: newSprintId,
            };
            const updateTeamCurrentSprint = updateTeamDetails(inputJson, orgDomain, teamName);

            const promises = [createSprint, updateTeamCurrentSprint];
            return Promise.all(promises);
        });
        return Promise.resolve(startSprint);
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const Promises = [promise];
    let result;
    return Promise.all(Promises).then(() => {
            result = { data: "Sprint Created Successfully" };
            console.log("Sprint Created Successfully");
            return response.status(status).send(result);
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error Creating Sprint", error);
            return response.status(status).send(result);
        });
};