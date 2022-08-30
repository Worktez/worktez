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

/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { createSprintName } = require("../../application/lib");
const { addActivity } = require("../../activity/tark/addActivity");
const { getOrgUseAppKey } = require("../../organization/lib");
const { getSprint, updateSprint } = require("../../sprints/lib");
const { getTask, updateTask } = require("../lib");
const { taskMailer } = require("../../mailer/lib");
const { getUser } = require("../../users/lib");
const { updateSprintData } = require("../../sprints/tark/updateSprint");
const { getTeamUseTeamId } = require("../../teams/lib");


exports.editTask = function(request, response) {
    const appKey = request.body.data.AppKey;
    const title = request.body.data.Title;
    const description = request.body.data.Description;
    const priority = request.body.data.Priority;
    const difficulty = request.body.data.Difficulty;
    const assignee = request.body.data.Assignee;
    const estimatedTime = parseFloat(request.body.data.EstimatedTime);
    const taskStatus = request.body.data.Status;
    const storyPointNumber = parseInt(request.body.data.StoryPointNumber);
    const oldStoryPointNumber = parseInt(request.body.data.OldStoryPointNumber);
    const editedSprintNumber = request.body.data.SprintNumber;
    const previousId = request.body.data.PreviousId;
    const creationDate = request.body.data.CreationDate;
    const changedData = request.body.data.ChangedData;
    const previousSprintName = createSprintName(previousId);
    const taskId = request.body.data.Id;
    const editedSprintName = createSprintName(editedSprintNumber);
    const type = request.body.data.Type;
    const reporter = request.body.data.Reporter;
    // const milestoneId = request.body.data.MilestoneId;
    // console.log("Milestone Id from Edit task", milestoneId);
    let result;
    let status = 200;
    let assigneeName = "";

    const date = request.body.data.Date;
    const time = request.body.data.Time;
    const uid = request.body.data.Uid;
    let comment = "Edited task details: ";
    // const subjectMessage = "your task is edited sucesfully";


    const promises = [];

     const editTaskPromise = getOrgUseAppKey(appKey).then((orgDetail) => {
        const orgDomain = orgDetail.OrganizationDomain;
        const orgId = orgDetail.OrganizationId;
        let currentSprint;
        if (editedSprintNumber != previousId) {
            comment += "Moved to sprint " + editedSprintName + ". ";

            const p1 = getTask(taskId, orgDomain).then((taskDoc) => {
                const project = taskDoc.Project;
                const teamId = taskDoc.TeamId;
                getTeamUseTeamId(orgDomain, teamId).then((data)=>{
                    currentSprint = data.CurrentSprintId;
                    updateSprintData(teamId, project, orgDomain, previousSprintName, oldStoryPointNumber, storyPointNumber, editedSprintNumber, orgId, editedSprintName, currentSprint);
                });
                return null;
            }).catch((error) => {
                status = 500;
                console.log("Error:", error);
            });
            promises.push(p1);
        }

        if (oldStoryPointNumber != storyPointNumber && previousId == editedSprintNumber) {
            const updateSprintPromise = getTask(taskId, orgDomain).then((taskDoc) => {
                const teamName = taskDoc.Project;
                let updateNewSprintJson;
                const storyPointSameSprintPromise = getSprint(orgDomain, teamName, previousSprintName).then((sprintDoc) => {
                    getTeamUseTeamId(orgDomain, taskDoc.TeamId).then((data)=>{
                        currentSprint = data.CurrentSprintId;
                    if (sprintDoc.Status == "Not Started") {
                        const startStoryPointNumber = parseInt(sprintDoc.StartStoryPoint) - oldStoryPointNumber + storyPointNumber;
                        updateNewSprintJson = {
                            StartStoryPoint: startStoryPointNumber,
                        };
                    } else if (sprintDoc.SprintNumber == currentSprint) {
                        console.log(currentSprint, sprintDoc.SprintNumber);
                        const midStoryPointNumber = parseInt(sprintDoc.MidStoryPoint) - oldStoryPointNumber + storyPointNumber;
                        updateNewSprintJson = {
                            MidStoryPoint: midStoryPointNumber,
                        };
                    }
                    updateSprint(updateNewSprintJson, orgDomain, teamName, previousSprintName);
                });
                });
                return Promise.resolve(storyPointSameSprintPromise);
            });
            promises.push(updateSprintPromise);
        }

        const updateTaskJson = {
            Title: title,
            Description: description,
            CreationDate: creationDate,
            Priority: priority,
            Difficulty: difficulty,
            Assignee: assignee,
            EstimatedTime: estimatedTime,
            SprintNumber: editedSprintNumber,
            StoryPointNumber: storyPointNumber,
            Type: type,
            Status: taskStatus,
            Reporter: reporter,
            LastUpdatedDate: date,
        };

        const p3 = getUser(uid, "").then((data) => {
            assigneeName = data.displayName;
           return assigneeName;
        }).catch((error) => {
            console.error(error);
            return error;
        });

        promises.push(p3);

        updateTask(updateTaskJson, orgDomain, taskId);

        comment = comment + changedData;
        addActivity("EDITED", comment, taskId, date, time, orgDomain, uid);

        Promise.all(promises).then(() => {
                result = { data: "OK" };
                taskMailer("Edit_Task", taskId, orgDomain, assigneeName);
                 console.log("Edited Task Successfully");
                return response.status(status).send(result);
            })
            .catch((error) => {
                result = { data: error };
                console.error("Error Editing Task", error);
                return response.status(status).send(result);
            });
    });
    Promise.resolve(editTaskPromise);
};
