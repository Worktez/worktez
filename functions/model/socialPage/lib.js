/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
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

const { db } = require("../application/lib");

/**
 * Description
 * @param {any} uid
 * @param {any} post
 * @param {any} postId
 * @param {any} lastUpdatedDate
 * @param {any} lastUpdatedTime
 * @return {any}
 */
exports.setPost = function(uid, post, postId, lastUpdatedDate, lastUpdatedTime) {
    const addPostPromise = db.collection("Social").doc(postId).set({
        Uid: uid,
        Post: post,
        PostId: postId,
        Reach: 0,
        Reactions: 0,
        // ReactionCounter: 0,
        CommentCounter: 0,
        LastUpdatedDate: lastUpdatedDate,
        LastUpdatedTime: lastUpdatedTime,
        Status: "OK",
    });
    return Promise.resolve(addPostPromise);
};

/**
 * Description
 * @return {any}
 */
exports.getAllPosts = function() {
    const query = db.collection("Social");
    const getAllPosts = query.get();
    return Promise.resolve(getAllPosts);
};

/**
 * Description
 * @param {any} postId
 * @return {any}
 */
exports.getPost = function(postId) {
    const getPostDetails = db.collection("Social").doc(postId).get().then((taskDoc) => {
        return taskDoc.data();
    });
    return Promise.resolve(getPostDetails);
};

/**
 * Description
 * @param {any} uid
 * @param {any} postId
 * @param {any} content
 * @param {any} commentId
 * @param {any} lastUpdatedDate
 * @param {any} lastUpdatedTime
 * @return {any}
 */
exports.addUserComment = function(uid, postId, content, commentId, lastUpdatedDate, lastUpdatedTime) {
    const addCommentPromise = db.collection("Social").doc(postId).collection("Comment").doc(commentId).set({
        Content: content,
        PostId: postId,
        Uid: uid,
        LastUpdatedDate: lastUpdatedDate,
        LastUpdatedTime: lastUpdatedTime,
        Status: "OK",
    });
    return Promise.resolve(addCommentPromise);
};

/**
 * Description
 * @param {any} postId
 * @param {any} reactId
 * @param {any} creationDate
 * @param {any} creationTime
 * @param {any} type
 * @param {any} uid
 * @param {any} reactStatus
 * @return {any}
 */
exports.setReactDoc = function(postId, reactId, creationDate, creationTime, type, uid, reactStatus) {
    const setReactDetails = db.collection("Social").doc(postId).collection("Reactions").doc(reactId).set({
        CreationDate: creationDate,
        CreationTime: creationTime,
        Type: type,
        Uid: uid,
        // Status: reactStatus
    });
    return Promise.resolve(setReactDetails);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} postID
 * @return {any}
 */
exports.updatePost = function(inputJson, postID) {
    const updatePostPromise = db.collection("Social").doc(postID).update(inputJson);
    return Promise.resolve(updatePostPromise);
};