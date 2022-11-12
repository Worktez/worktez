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

const {getCommentsContent} = require("../lib");

exports.getComments = function(request, response) {
  const postID = request.body.data.PostId;
  const commentsData = [];
  let status = 200;
  let result;

  const getCommentsPromise = getCommentsContent(postID).then((commentData) => {
    commentData.forEach((commentDoc) => {
      commentsData.push(commentDoc.data());
    });
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  const promises = [getCommentsPromise];
  Promise.all(promises).then(() => {
    result = {data: {status: "OK", data: commentsData}};
    console.log("Fetched comments Sucessfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        console.error("Error Getting Comments", error);
        result = {data: {status: "Error", data: undefined}};
        return response.status(status).send(result);
      });
};
