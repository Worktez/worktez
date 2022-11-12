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

const { setPost } = require("../lib");
const { getApplicationData, updateApplication, currentEpochTime } = require("../../application/lib");
const { incrementNumberofPostsforUser } = require("../../users/tark/incrementUserCounters");

exports.addPost = function(request, response) {
  const uid = request.body.data.Uid;
  const content = request.body.data.Content;
  const lastUpdatedDate = request.body.data.LastUpdatedDate;
  const lastUpdatedTime = request.body.data.LastUpdatedTime;
  const lastUpdatedEpochTime = request.body.data.LastUpdatedEpochTime;
  const photoURLs = request.body.data.Urls;

  let result;
  let postId;
  let status = 200;


  const promise1 = getApplicationData().then((rawData) => {
    if (rawData) {
      let postcounter = rawData.PostCounter;
      postcounter = postcounter + 1;
      postId = "P" + postcounter;
      const postCreationEpochTime = currentEpochTime;
      setPost(uid, content, postId, lastUpdatedDate, lastUpdatedTime, photoURLs, lastUpdatedEpochTime, postCreationEpochTime).then((postData) => {
        incrementNumberofPostsforUser(uid);
      }).catch((error) => {
        result = { data: error };
        status = 500;
        console.error("Error", error);
      });

      const inputJson = {
        PostCounter: postcounter,
      };
      updateApplication(inputJson);
    }
  });

  const Promises = [promise1];
  return Promise.all(Promises).then(() => {
    result = { data: { status: "OK", PostId: postId } };
    return response.status(status).send(result);
  }).catch((error) => {
    result = { data: { status: "Error", PostId: undefined } };
    console.error("Error adding Post", error);
    return response.status(status).send(result);
  });
};