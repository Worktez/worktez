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

const { getSprint } = require("../../sprints/lib");
const { getAllTasks } = require("../../tasks/lib");
const { getTeamUseTeamId } = require("../../teams/lib");
const { updateChart, setOrganizationsChart, getOrganizationsChartDetails } = require("../lib");

exports.updateSprintBurndownChartData = function(orgDomain, teamId, fullSprintName) {
  let totalStoryPoints = 0;
  const inputJson = {};
  const tasks = [];
  const p1 = getTeamUseTeamId(orgDomain, teamId).then((data)=>{
    const teamName = data.TeamName;
    const p2 = getSprint(orgDomain, teamName, fullSprintName).then((sprintDoc)=>{
      const sprintNumber = sprintDoc.SprintNumber;
      const sprintStartDate = new Date(sprintDoc.StartDate.replace("/", "-"));
      const sprintEndDate = new Date(sprintDoc.EndDate.replace("/", "-"));
      const date = new Date(sprintStartDate.getTime());
      const dates = [];
      while (date <= sprintEndDate) {
        dates.push([new Date(date), 0]);
        date.setDate(date.getDate() + 1);
      }
      const chartData = dates;

      const p = getAllTasks(orgDomain, teamId, sprintNumber).then((taskCol) => {
        taskCol.forEach((taskDoc) => {
          tasks.push(taskDoc.data());
        });


        tasks.forEach((task) => {
          const taskCreationDate = new Date(task.CreationDate.replace("/", "-"));
          if (taskCreationDate.getTime()<sprintStartDate.getTime()) {
            totalStoryPoints += task.StoryPointNumber;
          }
        });

        chartData.forEach((element, index) => {
          tasks.forEach((task) => {
            let formattedDate;
            let creationDate;
            // To increase story points on task creation
            if (task.CreationDate.includes("/")) {
              // This condition is added to support the Previous data before the change in the ToolsService, Can be removed in future.
              const dateArray = task.CreationDate.split("/");
              creationDate = dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2];
            } else if (task.CreationDate.includes("-")) {
              const dateArray = task.CreationDate.split("-");
              creationDate = dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2];
            }
            if (new Date(creationDate).toDateString() === element[0].toDateString()) {
              totalStoryPoints += task.StoryPointNumber;
            }

            // To decrease story points on task completion

            if (task.CompletionDate.includes("/")) {
              // This condition is added to support the Previous data before the change in the ToolsService, Can be removed in future.
              const dateArray = task.CompletionDate.split("/");
              formattedDate = dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2];
            } else if (task.CompletionDate.includes("-")) {
              const dateArray = task.CompletionDate.split("-");
              formattedDate = dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2];
            }

            if (task.Status == "Completed" && new Date(formattedDate).toDateString() === element[0].toDateString()) {
              totalStoryPoints -= task.StoryPointNumber;
            }
            chartData[index] = totalStoryPoints;
          });
        });

        inputJson[fullSprintName] = chartData;
        const promise = getOrganizationsChartDetails(orgDomain, teamName, "SprintBurndownChart").then((data) => {
          if (data != undefined) {
            updateChart(orgDomain, teamName, "SprintBurndownChart", inputJson);
          } else {
            setOrganizationsChart(orgDomain, teamName, "SprintBurndownChart", inputJson);
          }
          return null;
        }).catch((err) => {
          console.log(err);
        });
        return Promise.resolve(promise);
      });
      return Promise.resolve(p);
    });
    return Promise.resolve(p2);
  });
  Promise.resolve(p1);
};