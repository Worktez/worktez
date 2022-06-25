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
const { getSprint, updateSprint, setSprint } = require("../../sprints/lib");
const { getTask, updateTask } = require("../lib");
const { taskMailer } = require("../../mailer/lib");
const { getUser } = require("../../users/lib");


exports.editTask = function(request, response) {
    const appKey = request.body.data.AppKey;
    const title = request.body.data.Title;
    const description = request.body.data.Description;
    const priority = request.body.data.Priority;
    const difficulty = request.body.data.Difficulty;
    const assignee = request.body.data.Assignee;
    const estimatedTime = request.body.data.EstimatedTime;
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
    let milestoneId = request.body.data.MilestoneId;
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

        if (editedSprintNumber != previousId) {
            comment += "Moved to sprint " + editedSprintName + ". ";

            const p1 = getTask(taskId, orgDomain).then((taskDoc) => {
                const project = taskDoc.Project;

                const prevSprintPromise = getSprint(orgDomain, project, previousSprintName).then((prevSprint) => {
                    if (prevSprint != undefined) {
                        let totalUnCompletedTask = prevSprint.TotalUnCompletedTask;
                        let totalNumberOfTask = prevSprint.TotalNumberOfTask;

                        totalUnCompletedTask -= 1;
                        totalNumberOfTask -= 1;

                        let updatePrevSprintJson;
                        if (parseInt(prevSprint.SprintNumber) > 0) {
                            if (prevSprint.Status == "Not Started" || prevSprint.Status == "Ready to Start") {
                                const startStoryPointNumber = parseInt(prevSprint.StartStoryPoint) - oldStoryPointNumber;
                                updatePrevSprintJson = {
                                    TotalNumberOfTask: totalNumberOfTask,
                                    TotalUnCompletedTask: totalUnCompletedTask,
                                    StartStoryPoint: startStoryPointNumber,
                                };
                            } else if (prevSprint.Status == "Under Progress") {
                                const midStoryPointNumber = parseInt(prevSprint.MidStoryPoint) - oldStoryPointNumber;
                                updatePrevSprintJson = {
                                    TotalNumberOfTask: totalNumberOfTask,
                                    TotalUnCompletedTask: totalUnCompletedTask,
                                    MidStoryPoint: midStoryPointNumber,
                                };
                            } else {
                                updatePrevSprintJson = {
                                    TotalNumberOfTask: totalNumberOfTask,
                                    TotalUnCompletedTask: totalUnCompletedTask,
                                };
                            }
                        } else {
                            updatePrevSprintJson = {
                                TotalNumberOfTask: totalNumberOfTask,
                                TotalUnCompletedTask: totalUnCompletedTask,
                            };
                        }

                        updateSprint(updatePrevSprintJson, orgDomain, project, previousSprintName);
                    }
                });
                return Promise.resolve(prevSprintPromise);
            }).catch((error) => {
                status = 500;
                console.log("Error:", error);
            });
            promises.push(p1);

            const p2 = getTask(taskId, orgDomain).then((taskDoc) => {
                const project = taskDoc.Project;
                const teamId = taskDoc.TeamId;

                const newSprintPromise = getSprint(orgDomain, project, editedSprintName).then((newSprint) => {
                    if (newSprint != undefined) {
                        let totalUnCompletedTask = newSprint.TotalUnCompletedTask;
                        let totalNumberOfTask = newSprint.TotalNumberOfTask;

                        totalUnCompletedTask += 1;
                        totalNumberOfTask += 1;

                        let updateNewSprintJson;
                        if (parseInt(newSprint.SprintNumber) > 0) {
                            if (newSprint.Status == "Not Started" || newSprint.Status == "Ready to Start") {
                                const startStoryPointNumber = storyPointNumber + parseInt(newSprint.StartStoryPoint);
                                updateNewSprintJson = {
                                    TotalNumberOfTask: totalNumberOfTask,
                                    TotalUnCompletedTask: totalUnCompletedTask,
                                    StartStoryPoint: startStoryPointNumber,
                                };
                            } else if (newSprint.Status == "Under Progress") {
                                const midStoryPointNumber = storyPointNumber + parseInt(newSprint.MidStoryPoint);
                                updateNewSprintJson = {
                                    TotalNumberOfTask: totalNumberOfTask,
                                    TotalUnCompletedTask: totalUnCompletedTask,
                                    MidStoryPoint: midStoryPointNumber,
                                };
                            } else {
                                updateNewSprintJson = {
                                    TotalNumberOfTask: totalNumberOfTask,
                                    TotalUnCompletedTask: totalUnCompletedTask,
                                };
                            }
                        } else {
                            updateNewSprintJson = {
                                TotalNumberOfTask: totalNumberOfTask,
                                TotalUnCompletedTask: totalUnCompletedTask,
                            };
                        }
                        updateSprint(updateNewSprintJson, orgDomain, project, editedSprintName);
                    } else {
                        setSprint(orgDomain, project, editedSprintName, orgId, teamId, editedSprintNumber, "Not Started", 1, 1, storyPointNumber);
                    }
                });
                return Promise.resolve(newSprintPromise);
            }).catch((error) => {
                status = 500;
                console.log("Error:", error);
            });
            promises.push(p2);
        }

        if (oldStoryPointNumber != storyPointNumber && previousId == editedSprintNumber) {
            const updateSprintPromise = getTask(taskId, orgDomain).then((taskDoc) => {
                const teamName = taskDoc.Project;
                let updateNewSprintJson;
                const storyPointSameSprintPromise = getSprint(orgDomain, teamName, previousSprintName).then((sprintDoc) => {
                    if (sprintDoc.Status == "Not Started" || sprintDoc.Status == "Ready to Start") {
                        const startStoryPointNumber = parseInt(sprintDoc.StartStoryPoint) - oldStoryPointNumber + storyPointNumber;
                        updateNewSprintJson = {
                            StartStoryPoint: startStoryPointNumber,
                        };
                    } else if (sprintDoc.Status == "Under Progress") {
                        const midStoryPointNumber = parseInt(sprintDoc.MidStoryPoint) - oldStoryPointNumber + storyPointNumber;
                        updateNewSprintJson = {
                            MidStoryPoint: midStoryPointNumber,
                        };
                    }
                    updateSprint(updateNewSprintJson, orgDomain, teamName, previousSprintName);
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
            MilestoneId: milestoneId,
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
