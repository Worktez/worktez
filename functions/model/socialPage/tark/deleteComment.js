/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Abhishek Mishra <am1426620@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const {deletePostComment, getPost} = require("../lib");
const {getUser} = require("../../users/lib");

exports.deleteComment = function(request, response) {
  const uid = request.body.data.Uid;
  const postId = request.body.data.PostId;
  const commentId = request.body.data.CommentId;

  let result;
  let status = 200;

  const promise = getUser(uid, "").then((doc) => {
    const p1 = getPost(postId).then((postData) => {
      if (postData == undefined) {
        result = {data: {status: "Post doesn't exist"}};
      } else {
        const updateCommentJson = {
          Status: "DELETED",
        };
        deletePostComment(updateCommentJson, postId, commentId);
      }
    }).catch((error) => {
      status = 500;
      console.log("Error:", error);
    });

    return Promise.resolve(p1);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Comment Deleted Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = {data: error};
        console.error("Error Deleting", error);
        return response.status(status).send(result);
      });
};
