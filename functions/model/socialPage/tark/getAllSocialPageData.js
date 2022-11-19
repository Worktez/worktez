/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Simran Nigam <nigamsimran14@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const {getAllPosts, getCommentsContent} = require("../lib");
const {getReactionsContent} = require("../lib");

exports.getAllSocialPageData = function(request, response) {
  const currentEpochTime = request.body.data.CurrentEpochTime;
  let status =200;
  let result;
  const socialPageData={};
  const promise = getAllPosts(currentEpochTime).then((postDoc) => {
    let promise1;
    const promises=[];
    postDoc.forEach((element) => {
      const comments=[];
      const reactions=[];
      const postData = element.data();
      const postId = postData.PostId;
      socialPageData[postId] = postData;
      promise1 = getReactionsContent(postId).then((data) => {
        data.forEach((reactionData) => {
          const reactionsData = reactionData.data();
          reactions.push(reactionsData);
          socialPageData[postId]["Reactionss"] = reactions;
        });
      });
      promises.push(promise1);
      promise1 = getCommentsContent(postId).then((data) => {
        data.forEach((commentData) => {
          const commentsData = commentData.data();
          comments.push(commentsData);
          socialPageData[postId]["Comments"] = comments;
        }
        );
      });
      promises.push(promise1);
    });
    return Promise.all(promises);
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });
  return Promise.resolve(promise).then(() => {
    result = {data: socialPageData};
    return response.status(status).send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error Getting Posts", error);
    return response.status(status).send(result);
  });
};
