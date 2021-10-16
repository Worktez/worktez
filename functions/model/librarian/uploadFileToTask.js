/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const { setFileToTask} = require("./lib");
const { getTask, updateTask } = require("../tasks/lib");
const { getOrgUseAppKey } = require("../organization/lib");
const { addActivity } = require("../activity/addActivity");

exports.uploadFileToTask = function(request, response) {
  const fileName = request.body.data.FileName;
  const fileUrl = request.body.data.FileUrl;
  const lastModified = request.body.data.LastModified;
  const size = request.body.data.Size;
  const appKey = request.body.data.AppKey;
  const uid = request.body.data.Uid;
  const taskId = request.body.data.TaskId;
  const date = request.body.data.Date;
  const time = request.body.data.Time;
  const basePath = request.body.data.BasePath;

  let result;
  let status = 200;
  
  const promise = getOrgUseAppKey(appKey).then((orgDetail) => {
    const orgDomain = orgDetail.OrganizationDomain;
    const orgId = orgDetail.OrganizationId;

    const p1 = getTask(taskId, orgDomain).then((taskDoc) => {
      if (taskDoc == undefined) {
        result = {data: {status: "ERROR"}};
      } else {
        let taskFilesCounter = taskDoc.TaskFilesCounter;
        taskFilesCounter++;

        const taskFileDocumentName = "File"+taskFilesCounter;
        const updateTaskFileJson = {
          FileName: fileName,
          FileUrl: fileUrl,
          LastModified: lastModified,
          Size: size,
          Uid: uid,
          Date: date,
          Time: time,
          TaskId: taskId,
          OrgId: orgId,
          TaskFileDocumentName: taskFileDocumentName,
          BasePath: basePath,
          FileStatus: "OK",
        };
        setFileToTask(updateTaskFileJson, orgDomain, taskId, taskFileDocumentName);

        const updateTaskForCounter = {
          TaskFilesCounter: taskFilesCounter,
        };

        updateTask(updateTaskForCounter, orgDomain, taskId);
        
        const comment = "Added " + fileName;
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
    console.log("File Uploaded Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = { data: error };
        console.error("Error Uploading", error);
        return response.status(status).send(result);
      });
};
