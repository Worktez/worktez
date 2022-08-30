/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
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

const { setPostImages } = require("../lib");
const { getPost, updatePost } = require("../../users/lib");
 
exports.uploadProfilePicToUserDoc = function(request, response) {
  const fileName = request.body.data.FileName;
  const fileUrl = request.body.data.FileUrl;
  const lastModified = request.body.data.LastModified;
  const size = request.body.data.Size;
  const date = request.body.data.Date;
  const time = request.body.data.Time;
  const basePath = request.body.data.BasePath;
  const uid = request.body.data.Uid;
 
  let result;
  let status = 200;
 
  const promise = getPost(postId).then((data) => {
    let photoCounter = data.TotalPhotoCounter;
    photoCounter++;
 
    const updateUserDocJson = {
      TotalPhotoCounter: photoCounter,
    };
    updatePost(updateUserDocJson, postId);
 
    const imageFileName = "P" + photoCounter;
    const updateUserFileJson = {
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
    setPostImages(updateUserFileJson, postId, imageFileName);
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });
 
  Promise.resolve(promise).then(() => {
    result = { data: { status: "OK" } };
    console.log("Image  Uploaded Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = { data: error };
        console.error("Error Uploading Image", error);
        return response.status(status).send(result);
      });
};
 
