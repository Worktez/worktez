/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-undef */
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
const { getPost, setReactDoc, updatePost } = require("../lib");
const { incrementNumberofLikesforUser } = require("../../users/tark/incrementUserCounters");

exports.addReaction = function(request, response) {
  const postId = request.body.data.PostId;
  const uid = request.body.data.Uid;
  const creationDate = request.body.data.CreationDate;
  const creationTime = request.body.data.CreationTime;
  const type = request.body.data.Type;
  let result;
  let status = 200;
  
  const p1 = getPost(postId).then((postDoc) => {
    if (postDoc == undefined) {
      result = {data: {status: "ERROR", postData: undefined}};
    } else {
      const reactionsCounter = postDoc.Reactions + 1;
      const reactId= "R"+(reactionsCounter);
      setReactDoc(postId, reactId, creationDate, creationTime, type, uid);
      const inputJson = {
        Reactions: reactionsCounter,
      };
      updatePost(inputJson, postId);
      incrementNumberofLikesforUser(uid);
      result = {data: {status: "OK", postData: postDoc}};
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  
  return Promise.resolve(p1).then(() => {
    console.log("Added Reaction Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Adding Reaction", error);
    return response.status(status).send(result);
  });
};
