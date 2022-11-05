/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

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

exports.uploadPostImagesDoc = function(request, response) {
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

  const promise = getPost(uid).then((data) => {
    let photoCounter = data.TotalPhotoCounter;
    photoCounter++;

    const updateUserDocJson = {
      TotalPhotoCounter: photoCounter,
    };
    updatePost(updateUserDocJson, uid);

    const imageFileName = "P" + photoCounter;
    const updateUserFileJson = {
      FileName: fileName,
      FileUrl: fileUrl,
      LastModified: lastModified,
      Size: size,
      Date: date,
      Time: time,
      OrgFileDocumentName: fileName,
      BasePath: basePath,
      FileStatus: "OK",
    };
    setPostImages(updateUserFileJson, uid, imageFileName);
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

