/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

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
const { getApplicationData, updateApplication } = require("../../application/lib");
const { incrementNumberofPostsforUser } = require("../../users/tark/incrementUserCounters");

exports.addPost = function(request, response) {
    const uid = request.body.data.Uid;
    const content = request.body.data.Content;
    const lastUpdatedDate = request.body.data.LastUpdatedDate;
    const lastUpdatedTime = request.body.data.LastUpdatedTime;
    const photoURLs = request.body.data.Urls;
    let result;
    let postId;
    let status = 200;


    const promise1 = getApplicationData().then((rawData) => {
        if (rawData) {
            let postcounter = rawData.PostCounter;
            postcounter = postcounter + 1;
            postId = "P" + postcounter;

            setPost(uid, content, postId, lastUpdatedDate, lastUpdatedTime, photoURLs).then((postData) => {
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