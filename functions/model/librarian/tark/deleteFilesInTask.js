/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
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

const { updateFileToTask } = require("../lib");
const { getTask } = require("../../tasks/lib");
const { getOrgUseAppKey } = require("../../organization/lib");
const { addActivity } = require("../../activity/tark/addActivity");

exports.deleteFilesInTask = function(request, response) {
  const fileName = request.body.data.FileName;
  const appKey = request.body.data.AppKey;
  const uid = request.body.data.Uid;
  const taskId = request.body.data.TaskId;
  const date = request.body.data.Date;
  const time = request.body.data.Time;
  const taskFileDocumentName = request.body.data.TaskFileDocumentName;

  let result;
  let status = 200;
    
  const promise = getOrgUseAppKey(appKey).then((orgDetail) => {
    const orgDomain = orgDetail.OrganizationDomain;

    const p1 = getTask(taskId, orgDomain).then((taskDoc) => {
      if (taskDoc == undefined) {
        result = {data: {status: "ERROR"}};
      } else {
        const updateTaskFileJson = {
          FileStatus: "DELETED",
        };
        updateFileToTask(updateTaskFileJson, orgDomain, taskId, taskFileDocumentName);
                
        const comment = "Removed " + fileName;
        addActivity("EDITED", comment, taskId, date, time, orgDomain, uid);
      }
    }).catch((error) => {
      status = 500;
      console.log("Error:", error);
    });

    return Promise.resolve(p1);
  });

  Promise.resolve(promise).then(() => {
    result = { data: {status: "OK"} };
    console.log("File Deleted Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = { data: error };
        console.error("Error Deleting", error);
        return response.status(status).send(result);
      });
};
