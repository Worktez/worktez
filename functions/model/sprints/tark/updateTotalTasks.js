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
 * Author : Sanjay Krishna <sanjaykrishna1203@gmail.com>
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
* See the MIT License for more details.
***********************************************************/

const { getAllTasks } = require("../../tasks/lib");
const { updateSprint } = require("../lib");
const { createSprintName } = require("../../application/lib");


exports.updateTotalTasks = function(orgDomain, teamName, teamId, sprintId) {
  const tasksData = [];
  let completedCount = 0;
  let inputJson = {};
  const promise = getAllTasks(orgDomain, teamId, sprintId).then((data)=>{
    data.forEach((taskDoc) => {
      const temp = taskDoc.data();
      tasksData.push(temp);
      if (temp.Status == "Completed") {
        completedCount += 1;
      }
    });
    inputJson = {
      TotalNumberOfTask: tasksData.length,
      TotalCompletedTask: completedCount,
      TotalUnCompletedTask: tasksData.length - completedCount,
    };
    updateSprint(inputJson, orgDomain, teamName, createSprintName(sprintId));
  });
  return Promise.resolve(promise).then(()=>{
    console.log("Updated Total no of tasks for ", orgDomain, teamName, sprintId);
  });
};