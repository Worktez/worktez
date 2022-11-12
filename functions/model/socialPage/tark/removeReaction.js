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
const { getPost, deletePostReaction, updatePost } = require("../lib");
const { decrementNumberofLikesforUser } = require("../../users/tark/incrementUserCounters");

exports.removeReaction = function(request, response) {
  const postId = request.body.data.PostId;
  const uid = request.body.data.Uid;
  let result;
  let status = 200;

  const p1 = getPost(postId).then((postDoc) => {
    if (postDoc == undefined) {
      result = {data: {status: "ERROR", postData: undefined}};
    } else {
      const reactionsCounter = postDoc.Reactions - 1;
      deletePostReaction(postId, uid);
      const inputJson = {
        Reactions: reactionsCounter,
      };
      updatePost(inputJson, postId);
      decrementNumberofLikesforUser(uid);
      result = {data: {status: "OK", postData: postDoc}};
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });


  return Promise.resolve(p1).then(() => {
    console.log("Removed Reaction Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Removing Reaction", error);
    return response.status(status).send(result);
  });
};

