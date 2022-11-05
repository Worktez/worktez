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

const { getAllPosts } = require("../lib");

exports.getPosts = function(request, response) {
  const postsData = [];
  let status = 200;
  let result;

  const getPostsPromise = getAllPosts().then((postData) => {
    postData.forEach((postDoc) => {
      postsData.push(postDoc.data());
    });
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  const promises = [getPostsPromise];
  Promise.all(promises).then(() => {
    if (postsData) {
      result = { data: { status: "OK", data: postsData } };
      console.log("Got Posts Sucessfully");
      return response.status(status).send(result);
    }
  })
      .catch((error) => {
        console.error("Error Getting Posts", error);
        result = { data: { status: "Error", data: undefined } };
        return response.status(status).send(result);
      });
};