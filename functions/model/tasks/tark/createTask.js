/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

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
const { addActivity } = require("../../activity/tark/addActivity");
const { getOrgUseAppKey } = require("../../organization/lib");
const { getOrgRawData, updateOrgRawData } = require("../../organization/lib");
const { getSprint, updateSprint, setSprint } = require("../../sprints/lib");
const { updateTeamDetails, getTeam } = require("../../teams/lib");
const { setTask} = require("../lib");
const { taskMailer } = require("../../mailer/lib");
const { getUserUseEmail } = require("../../users/lib");
const { sendNotification } = require("../../notifications/lib");
const { linkSubtask } = require("../../linker/tark/linkSubTask");
const { updateSprintEvaluationGraphData } = require("../../performanceChart/tark/updateSprintEvaluationGraph");

exports.createNewTask = function(request, response) {
  const appKey = request.body.data.AppKey;
  const title = request.body.data.Title;
  const des = request.body.data.Description;
  const priority = request.body.data.Priority;
  const difficulty = request.body.data.Difficulty;
  const creator = request.body.data.Creator;
  const assignee = request.body.data.Assignee;
  const reporter = request.body.data.Reporter;
  const estimatedTime = parseFloat(request.body.data.EstimatedTime);
  const taskStatus = request.body.data.Status;
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
  const parentTaskId = request.body.data.ParentTaskId;
  const parentTaskUrl = request.body.data.ParentTaskUrl;
  let taskId;
  let totalNumberOfTask;
  let result;
  let totalUnCompletedTask;
  const completiondate = "Not yet Completed";
  let orgDomain;
  let orgId;
  let teamId;
  const watchers = [];
  let milestoneId =request.body.data.MilestoneId;

  // let assigneeName = "";
  let assigneeUid = "";
  let senderName = "";
  let senderEmail = "";

  let status = 200;

  const promise1 = getOrgUseAppKey(appKey).then((orgDetail) => {
    orgDomain = orgDetail.OrganizationDomain;
    orgId = orgDetail.OrganizationId;

    // const p1 = getUserUseEmail(assignee).then((data) => {
    //     assigneeName = data.displayName;
    //     return assigneeName;
    // }).catch((error) => {
    //     console.error(error);
    //     return error;
    // });

    const p2 = getUserUseEmail(creator).then((data) => {
      if (data!=undefined) {
        senderName = data.displayName;
        senderEmail = data.email;
      } else {
        senderName = "ABC";
        senderEmail = creator;
      }
      return senderName;
    }).catch((error) => {
      console.error(error);
      return error;
    });

    const p3 = getUserUseEmail(assignee).then((data) => {
      assigneeUid = data.uid;
      return assigneeUid;
    }).catch((error) => {
      console.log(error);
      return error;
    });

    const promise1 = getTeam(orgDomain, project).then((team) => {
      const totalTeamTasks = team.TotalTeamTasks + 1;
      teamId = team.TeamId;
      taskId = team.TeamId + totalTeamTasks.toString();

      const updateTeamJson = {
        TotalTeamTasks: totalTeamTasks,
      };
      watchers.push(creator);
      if (!watchers.includes(assignee)) {
        watchers.push(assignee);
      }
      if (!watchers.includes(reporter)) {
        watchers.push(reporter);
      }
      if (!milestoneId) {
        milestoneId = "0";
      }
      updateTeamDetails(updateTeamJson, orgDomain, project);
      setTask(orgDomain, taskId, title, des, priority, difficulty, creator, assignee, reporter, estimatedTime, taskStatus, project, loggedWorkTotalTime, workDone, sprintNumber, storyPointNumber, creationDate, completiondate, orgId, team.TeamId, type, 0, 0, creationDate, watchers, milestoneId);
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
        const startStoryPointNumber = storyPointNumber;

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

    const promises = [p2, p3, promise1, promise2, promise3];
    return Promise.all(promises).then(()=>{
      const notificationMessage = senderName + " created a task for you " + taskId;

      const link = "https://worktez.com/TaskDetails/" + taskId;
      updateSprintEvaluationGraphData(orgDomain, teamId, fullSprintName);

      taskMailer("Create_Task", taskId, orgDomain, senderName);
      sendNotification(notificationMessage, senderEmail, assigneeUid, creationDate, time, orgDomain, link);

      addActivity("CREATED", "Created task " + taskId, taskId, creationDate, time, orgDomain, uid);

      if (parentTaskId != "default") {
        linkSubtask(parentTaskId, taskId, orgDomain, "PC", parentTaskUrl, link);
      }
    }).catch((error) => {
      status = 500;
      console.log("Error:", error);
    });
  });
  return Promise.resolve(promise1).then(() => {
    result = { data: "Task Created Successfully", childTaskId: taskId};
    console.log("Task Created Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = { data: error };
        console.error("Error Creating Task", error);
        return response.status(status).send(result);
      });
};