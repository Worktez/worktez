/* eslint-disable linebreak-style */
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
const { sendMail } = require("../../email/lib");

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
    let result;
    let status = 200;

    console.log(title);
    console.log(taskStatus);

    const date = request.body.data.Date;
    const time = request.body.data.Time;
    const uid = request.body.data.Uid;
    let comment = "Edited task details: ";
    const subjectMessage = "your task is edited sucesfully";
    const htmlMessage = "<div style=\"background-color:#E9ECEF;margin:auto;width:80%;padding-top: 30px;height:100%;\"><table style=\"background-color:#ffffff;height:80%;width:80%;margin:auto;\"><tr><td><img src=\"https://worktez.com/assets/logo.png\" style=\"height:50%;width:50%;display:block;margin:auto;\" alt=\"worktez logo\"></td></tr><tr><td><h2 style=\"text-align:center;\">Welcome to Worktez</h2></td></tr><tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi " + assignee + "<br>" + uid.Assignee + " edited your task recently." + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/TaskDetails/" + taskId + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View task</a><p style=\"color:#666;\">Please click the button to view task.</p></td></tr><tr><td></td></tr></table><div style=\"text-align:center;padding:20px;\"><p style=\"color:#666;\">Show us some love. Like & Follow us. Spread the word about Worktez.</p><a href=\"https://www.linkedin.com/company/worktez/\" target=\"_blank\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" class=\"bi bi-linkedin\" viewBox=\"0 0 16 16\" style=\"margin-left:10px;cursor:pointer;\"><path d=\"M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z\"/></svg></a><a href=\"https://github.com/Worktez/worktez\" target=\"_blank\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" class=\"bi bi-github\" viewBox=\"0 0 16 16\" style=\"margin-left:10px;cursor:pointer;\"><path d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z\"/></svg></a></div></div>";

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
        };
        updateTask(updateTaskJson, orgDomain, taskId);
        sendMail(assignee, subjectMessage, htmlMessage);

        comment = comment + changedData;
        console.log(comment);
        addActivity("EDITED", comment, taskId, date, time, orgDomain, uid);

        Promise.all(promises).then(() => {
                result = { data: "OK" };
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
