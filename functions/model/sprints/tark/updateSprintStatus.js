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

const { currentDate, currentTime } = require("../../application/lib");
const { getOrgUseAppKey } = require("../../organization/lib");
const { getTeamUseTeamId } = require("../../teams/lib");
const { updateSprint, getSprint, setSprintActivity } = require("../lib");
const { updateSprintEvaluationGraphData } = require("../../performanceChart/tark/updateSprintEvaluationGraph");


exports.updateSprintStatus = function(request, response) {
    const sprintStatus = request.body.data.SprintStatus;
    const currentSprintName = request.body.data.CurrentSprintName;
    const appKey = request.body.data.AppKey;
    const teamId = request.body.data.TeamId;
    const uid = request.body.data.Uid;
    const date = request.body.data.Date;
    let orgDomain;
    let result;
    let status = 200;

    const updateSprintPromise = getOrgUseAppKey(appKey).then((orgDoc) => {
        orgDomain = orgDoc.OrganizationDomain;

        const updateTeamSprintStatus = getTeamUseTeamId(orgDomain, teamId).then((teamDoc) => {
            const teamName = teamDoc.TeamName;
            let message = "Nothing Modified";
            let updateSprintStatusInputJson;
            const getSprintPromise = getSprint(orgDomain, teamName, currentSprintName).then((sprintDoc) => {
                if (sprintStatus == "Under Progress") {
                    const startStoryPointNumber = sprintDoc.StartStoryPoint;
                    updateSprintStatusInputJson = {
                        Status: sprintStatus,
                        MidStoryPoint: startStoryPointNumber,
                    };
                    message = "Updated Sprint Status As Under Progress";
                } else if (sprintStatus == "Completed") {
                    updateSprintStatusInputJson = {
                        Status: sprintStatus,
                        EndStoryPoint: sprintDoc.CompletedStoryPoint,
                        EndDate: date,
                    };
                    message = "Updated Sprint Status As Completed";
                }

                let sprintActivityCounter = sprintDoc.SprintActivityCounter;
                if (sprintActivityCounter) {
                    sprintActivityCounter = sprintActivityCounter + 1;
                    updateSprintStatusInputJson["SprintActivityCounter"] = sprintActivityCounter;
                } else {
                    sprintActivityCounter = 1;
                    updateSprintStatusInputJson["SprintActivityCounter"] = sprintActivityCounter;
                }
                setSprintActivity(orgDomain, teamName, currentSprintName, sprintActivityCounter, message, currentDate, currentTime, uid);
                updateSprint(updateSprintStatusInputJson, orgDomain, teamName, currentSprintName).then(()=>{
                    updateSprintEvaluationGraphData(orgDomain, teamId, currentSprintName);
                });
            });
            return Promise.resolve(getSprintPromise);
        }).catch((error) => {
            status = 500;
            console.log("Error:", error);
        });
        console.log("Sprint updated successfully");
        result = { data: "OK" };
        return Promise.resolve(updateTeamSprintStatus);
    });
    return Promise.resolve(updateSprintPromise).then(() => {
        result = { data: "Sprint Updated Successfully" };
        console.log("Sprint Updated Successfully");
        return response.status(status).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error Updating Sprint", error);
        return response.status(status).send(result);
    });
};