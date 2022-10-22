/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
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
const {deleteUserPost, getPost} = require("../lib");
const {getUser} = require("../../users/lib");
const {decrementNumberofPostsforUser} = require("../../users/tark/incrementUserCounters");

exports.deletePost = function(request, response) {
  const uid = request.body.data.Uid;
  const postId = request.body.data.PostId;

  let result;
  let status = 200;

  const promise = getUser(uid, "").then((doc) => {
    const p1 = getPost(postId).then((postData) => {
      if (postData == undefined) {
        result = {data: {status: "Post doesn't exist"}};
      } else {
        const updatePostToJson = {
          Status: "DELETED",
        };
        deleteUserPost(updatePostToJson, postId);
        decrementNumberofPostsforUser(uid);
      }
    }).catch((error) => {
      status = 500;
      console.log("Error:", error);
    });

    return Promise.resolve(p1);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Post Deleted Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = {data: error};
        console.error("Error Deleting", error);
        return response.status(status).send(result);
      });
};
