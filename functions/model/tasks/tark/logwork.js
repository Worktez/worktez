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
const { getSprint, updateSprint } = require("../../sprints/lib");
const { getTask, updateTask } = require("../lib");
const { taskMailer } = require("../../mailer/lib");

exports.logWork = function(request, response) {
  const assignee = request.body.data.Assignee;
  const appKey = request.body.data.AppKey;
  const logStatus = request.body.data.LogWorkStatus;
  const taskId = request.body.data.LogTaskId;
  const logHours = parseFloat(request.body.data.LogHours);
  const workDone = parseInt(request.body.data.LogWorkDone);
  const sprintNumber = parseInt(request.body.data.SprintNumber);
  const logWorkComment = request.body.data.LogWorkComment;
  const date = request.body.data.Date;
  const time = request.body.data.Time;
  const uid = request.body.data.Uid;
  const fullSprintName = createSprintName(sprintNumber);
  let logWorkTotalTime;
  let completiondate = "Not yet Completed";
  const today = new Date();
  const promises = [];
  let status = 200;
  let result;
  // const subjectMessage = "your work got logged successfully";
  // const htmlMessage ="<div style=\"background-color:#E9ECEF;margin:auto;width:80%;padding-top: 30px;height:100%;\">" +
  // "<table style=\"background-color:#ffffff;height:80%;width:80%;margin:auto;\"><tr><td><img src=\"https://worktez.com/assets/logo.png\" style=\"height:50%;width:50%;display:block;margin:auto;\" alt=\"worktez logo\"></td></tr>" +
  // "<tr><td><h2 style=\"text-align:center;\">Welcome to Worktez</h2></td></tr><tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi " + assignee + "<br>" + "Your work got logged successfully." + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/TaskDetails/" + taskId + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View activity</a><p style=\"color:#666;\">Please click the button to view your logged work.</p></td></tr><tr><td></td></tr></table><div style=\"text-align:center;padding:20px;\"><p style=\"color:#666;\">Show us some love. Like & Follow us. Spread the word about Worktez.</p><a href=\"https://www.linkedin.com/company/worktez/\" target=\"_blank\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" class=\"bi bi-linkedin\" viewBox=\"0 0 16 16\" style=\"margin-left:10px;cursor:pointer;\"><path d=\"M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z\"/></svg></a><a href=\"https://github.com/Worktez/worktez\" target=\"_blank\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" class=\"bi bi-github\" viewBox=\"0 0 16 16\" style=\"margin-left:10px;cursor:pointer;\"><path d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z\"/></svg></a></div></div>";

  const logWorkPromise = getOrgUseAppKey(appKey).then((orgDetails) => {
    const orgDomain = orgDetails.OrganizationDomain;

    const promise1 = getTask(taskId, orgDomain).then((taskDoc) => {
      logWorkTotalTime = parseFloat(taskDoc.LogWorkTotalTime);
      logWorkTotalTime = parseFloat(logWorkTotalTime) + parseFloat(logHours);

      if (logStatus === "Completed") {
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();

        const todayDate = dd + "-" + mm + "-" + yyyy;

        completiondate = todayDate;
      }
      const logWorkInputJson = {
        LogWorkTotalTime: logWorkTotalTime,
        WorkDone: workDone,
        Status: logStatus,
        CompletionDate: completiondate,
      };
      updateTask(logWorkInputJson, orgDomain, taskId);
      taskMailer("Log_Task", taskId, orgDomain, assignee);
    }).catch((error) => {
      status = 500;
      console.log("Error:", error);
    });


    promises.push(promise1);

    if (logStatus == "Completed") {
      const promise2 = getOrgRawData(orgDomain).then((rawData) => {
        let totalCompletedTask = parseInt(rawData.TotalCompletedTask);
        let totalUnCompletedTask = parseInt(rawData.TotalUnCompletedTask);
        totalCompletedTask += 1;
        totalUnCompletedTask -= 1;

        const updateRawDataInputJson = {
          TotalCompletedTask: totalCompletedTask,
          TotalUnCompletedTask: totalUnCompletedTask,
        };
        updateOrgRawData(updateRawDataInputJson, orgDomain);
      }).catch((error) => {
        status = 500;
        console.log("Error:", error);
      });
      promises.push(promise2);

      const promise3 = getTask(taskId, orgDomain).then((taskDoc) => {
        const project = taskDoc.Project;

        const sprintCounterUpdate = getSprint(orgDomain, project, fullSprintName).then((sprintDetails) => {
          let totalUnCompletedTask = sprintDetails.TotalUnCompletedTask;
          let totalCompletedTask = sprintDetails.TotalCompletedTask;
          let completedStoryPoint = sprintDetails.CompletedStoryPoint;

          totalUnCompletedTask -= 1;
          totalCompletedTask += 1;
          completedStoryPoint += taskDoc.StoryPointNumber;

          const updateSprintInputJson = {
            TotalCompletedTask: totalCompletedTask,
            TotalUnCompletedTask: totalUnCompletedTask,
            CompletedStoryPoint: completedStoryPoint,
          };
          updateSprint(updateSprintInputJson, orgDomain, project, fullSprintName);
        });
        return Promise.resolve(sprintCounterUpdate);
      }).catch((error) => {
        status = 500;
        console.log("Error:", error);
      });
      promises.push(promise3);
    }

    addActivity("LOGWORK_COMMENT", logWorkComment, taskId, date, time, orgDomain, uid);
    Promise.resolve(promises).then(() => {
      result = { data: "Logged Work successfully!" };
      console.log("Logged Work successfully!");
      return response.status(status).send(result);
    })
        .catch((error) => {
          const result = { data: error };
          console.error("Error Logging Work", error);
          return response.status(status).send(result);
        });
  });
  return Promise.resolve(logWorkPromise);
};