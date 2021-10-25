/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { createSprintName } = require("../application/lib");
const { addActivity } = require("../activity/addActivity");
const { getOrgUseAppKey } = require("../organization/lib");
const { getOrgRawData, updateOrgRawData } = require("../organization/lib");
const { getSprint, updateSprint, setSprint } = require("../sprints/lib");
const { updateTeamDetails, getTeam } = require("../teams/lib");
const { setTask } = require("./lib");
const { sendMail } = require("../email/lib");

exports.createNewTask = function(request, response) {
    const appKey = request.body.data.AppKey;
    const title = request.body.data.Title;
    const des = request.body.data.Description;
    let priority = request.body.data.Priority;
    let difficulty = request.body.data.Difficulty;
    const creator = request.body.data.Creator;
    const assignee = request.body.data.Assignee;
    const reporter = request.body.data.Reporter;
    const estimatedTime = parseInt(request.body.data.EstimatedTime);
    let taskStatus = request.body.data.Status;
    const project = request.body.data.Project;
    const storyPointNumber = parseInt(request.body.data.StoryPointNumber);
    const sprintNumber = parseInt(request.body.data.SprintNumber);
    const creationDate = request.body.data.CreationDate;
    const time = request.body.data.Time;
    const uid = request.body.data.Uid;
    const fullSprintName = createSprintName(sprintNumber);
    const type = request.body.data.Type;
    const loggedWorkTotalTime = 0;
    const workDone = 0;
    let taskId;
    let totalNumberOfTask;
    let result;
    let totalUnCompletedTask;
    const completiondate = "Not yet Completed";
    let orgDomain;
    let orgId;
    let status = 200;
    const subjectMessage = creator + " created a task for you";
    const htmlMessage = "<div style=\"background-color:#E9ECEF;margin:auto;width:80%;padding-top: 30px;height:100%;\"><table style=\"background-color:#ffffff;height:80%;width:80%;margin:auto;\"><tr><td><img src=\"https://worktez.com/assets/logo.png\" style=\"height:50%;width:50%;display:block;margin:auto;\" alt=\"worktez logo\"></td></tr><tr><td><h2 style=\"text-align:center;\">Welcome to Worktez</h2></td></tr><tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi " + assignee + "<br>" + creator + " assigned you a task." + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktrolly.web.app/TaskDetails/" + project + sprintNumber + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View task</a><p style=\"color:#666;\">Please click the button to view task.</p></td></tr><tr><td></td></tr></table><div style=\"text-align:center;padding:20px;\"><p style=\"color:#666;\">Show us some love. Like & Follow us. Spread the word about Worktez.</p><a href=\"https://www.linkedin.com/company/worktez/\" target=\"_blank\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" class=\"bi bi-linkedin\" viewBox=\"0 0 16 16\" style=\"margin-left:10px;cursor:pointer;\"><path d=\"M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z\"/></svg></a><a href=\"https://github.com/Worktez/worktez\" target=\"_blank\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" class=\"bi bi-github\" viewBox=\"0 0 16 16\" style=\"margin-left:10px;cursor:pointer;\"><path d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z\"/></svg></a></div></div>";

    const promise1 = getOrgUseAppKey(appKey).then((orgDetail) => {
        orgDomain = orgDetail.OrganizationDomain;
        orgId = orgDetail.OrganizationId;

        const promise1 = getTeam(orgDomain, project).then((team) => {
            const totalTeamTasks = team.TotalTeamTasks + 1;
            taskId = team.TeamId + totalTeamTasks.toString();

            const updateTeamJson = {
                TotalTeamTasks: totalTeamTasks,
            };
            updateTeamDetails(updateTeamJson, orgDomain, project);
            sendMail(assignee, subjectMessage, htmlMessage);
            priority = addSortingValueToLabel(priority, "PriorityLabel");
            difficulty = addSortingValueToLabel(difficulty, "DifficultyLabel");
            taskStatus = addSortingValueToLabel(taskStatus, "StatusLabel");
            setTask(orgDomain, taskId, title, des, priority, difficulty, creator, assignee, reporter, estimatedTime, taskStatus, project, loggedWorkTotalTime, workDone, sprintNumber, storyPointNumber, creationDate, completiondate, orgId, team.TeamId, type, 0);

            addActivity("CREATED", "Created task " + taskId, taskId, creationDate, time, orgDomain, uid);
        }).catch((error) => {
            status = 500;
            console.log("Error:", error);
        });

        const promise2 = getSprint(orgDomain, project, fullSprintName).then((sprint) => {
            if (sprint != undefined) {
                totalUnCompletedTask = sprint.TotalUnCompletedTask;
                totalNumberOfTask = sprint.TotalNumberOfTask;

                totalUnCompletedTask = totalUnCompletedTask + 1;
                totalNumberOfTask = totalNumberOfTask + 1;

                let updateSprintJson;
                if (sprint.Status == "Not Started" || sprint.Status == "Ready to Start") {
                    const startStoryPointNumber = storyPointNumber + parseInt(sprint.StartStoryPoint);
                    updateSprintJson = {
                        TotalNumberOfTask: totalNumberOfTask,
                        TotalUnCompletedTask: totalUnCompletedTask,
                        StartStoryPoint: startStoryPointNumber,
                    };
                } else if (sprint.Status == "Under Progress") {
                    const midStoryPointNumber = storyPointNumber + parseInt(sprint.MidStoryPoint);
                    updateSprintJson = {
                        TotalNumberOfTask: totalNumberOfTask,
                        TotalUnCompletedTask: totalUnCompletedTask,
                        MidStoryPoint: midStoryPointNumber,
                    };
                } else {
                    updateSprintJson = {
                        TotalNumberOfTask: totalNumberOfTask,
                        TotalUnCompletedTask: totalUnCompletedTask,
                    };
                }
                updateSprint(updateSprintJson, orgDomain, project, fullSprintName);
            } else {
                totalNumberOfTask = 1;
                totalUnCompletedTask = 1;
                const startStoryPointNumber = storyPointNumber + parseInt(sprint.StartStoryPoint);

                const newSprintPromise = getTeam(orgDomain, project).then((team) => {
                    setSprint(orgDomain, project, fullSprintName, orgId, team.TeamId, sprintNumber, "Not Started", totalNumberOfTask, totalUnCompletedTask, startStoryPointNumber);
                }).catch((error) => {
                    status = 500;
                    console.log("Error:", error);
                });
                return Promise.resolve(newSprintPromise);
            }
        }).catch((error) => {
            status = 500;
            console.log("Error:", error);
        });

        const promise3 = getOrgRawData(orgDomain).then((rawData) => {
            totalNumberOfTask = rawData.TotalNumberOfTask;
            totalUnCompletedTask = rawData.TotalUnCompletedTask;
            totalUnCompletedTask += 1;
            totalNumberOfTask += 1;

            const updateRawDataInputJson = {
                TotalNumberOfTask: totalNumberOfTask,
                TotalUnCompletedTask: totalUnCompletedTask,
            };

            updateOrgRawData(updateRawDataInputJson, orgDomain);
        });

        const promises = [promise1, promise2, promise3];
        return Promise.all(promises).catch((error) => {
            status = 500;
            console.log("Error:", error);
        });
    });
    return Promise.resolve(promise1).then(() => {
            result = { data: "Task Created Successfully" };
            console.log("Task Created Successfully");
            return response.status(status).send(result);
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error Creating Task", error);
            return response.status(status).send(result);
        });
};

function addSortingValueToLabel(label, labelType) {
    if (labelType == "PriorityLabel" || labelType == "DifficultyLabel") {
        if (label == "High") {
            label = "2@@" + label; 
        } else if (label == "Medium") {
            label = "1@@" + label; ;
        } else if (label == "Low") {
            label = "0@@" + label; ;
        }
    } else {
        if (label == "Ready to start") {
            label = "1@@" + label; 
        } else if (label == "Ice Box") {
            label = "0@@" + label;
        } else if (label == "Under Progress") {
            label = "2@@" + label;
        } else if (label == "Blocked") {
            label = "3@@" + label;
        } else if (label == "Completed") {
            label = "4@@" + label;
        }
    }
    return label;
}