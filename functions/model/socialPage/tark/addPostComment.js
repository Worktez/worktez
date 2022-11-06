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

const { addUserComment, getPost, updatePost } = require("../lib");
const { incrementNumberofCommentsforUser } = require("../../users/tark/incrementUserCounters");

exports.addPostComment = function(request, response) {
  const uid = request.body.data.Uid;
  const postId = request.body.data.PostId;
  const content = request.body.data.Content;

  const lastUpdatedDate = request.body.data.LastUpdatedDate;
  const lastUpdatedTime = request.body.data.LastUpdatedTime;

  let result;
  let status = 200;


  const promise1 = getPost(postId).then((PostDoc) => {
    if (PostDoc) {
      let CommentCounter=PostDoc.CommentCounter;
      if (isNaN(CommentCounter)) {
        CommentCounter = 0;
      }
      CommentCounter = CommentCounter+1;
      const commentId= "C" + CommentCounter;

      addUserComment(uid, postId, content, commentId, lastUpdatedDate, lastUpdatedTime).then((commentData) => {
        incrementNumberofCommentsforUser(uid);
      }).catch((error) => {
        result = { data: error };
        status = 500;
        console.error("Error", error);
      });

      const updateUserInputJson = {
        CommentCounter: CommentCounter,
      };
      updatePost(updateUserInputJson, postId);
    }
  });

  const Promises = [promise1];
  return Promise.all(Promises).then(() => {
    result = { data: "Comment Added successfully" };
    return response.status(status).send(result);
  }).catch((error) => {
    result = { data: error };
    console.error("Error adding Comment", error);
    return response.status(status).send(result);
  });
};