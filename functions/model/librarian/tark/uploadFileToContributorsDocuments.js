/***********************************************************
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
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const { setFileToContributorsDocument } = require("../lib");
const { getApplicationData } = require("../../application/lib");

exports.uploadFileToContributorsDocuments = function(request, response) {
  const fileName = request.body.data.FileName;
  const fileUrl = request.body.data.FileUrl;
  const lastModified = request.body.data.LastModified;
  const size = request.body.data.Size;
  const date = request.body.data.Date;
  const time = request.body.data.Time;
  const basePath = request.body.data.BasePath;

  let result;
  let status = 200;
  
  const promise = getApplicationData().then((data) => {
    let filesCounter = data.TotalNumberOfContributors;
    filesCounter++;
    
    const orgFileDocumentName = "File"+filesCounter;
    const updateOrgFileJson = {
      FileName: fileName,
      FileUrl: fileUrl,
      LastModified: lastModified,
      Size: size,
      Date: date,
      Time: time,
      OrgFileDocumentName: orgFileDocumentName,
      BasePath: basePath,
      FileStatus: "OK",
    };
    setFileToContributorsDocument(updateOrgFileJson, orgFileDocumentName);
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
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
