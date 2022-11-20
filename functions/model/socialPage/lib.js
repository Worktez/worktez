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

const { db } = require("../application/lib");

/**
 * Description
 * @param {any} uid
 * @param {any} content
 * @param {any} postId
 * @param {any} lastUpdatedDate
 * @param {any} lastUpdatedTime
 * @param {any} photoURLs
 * @param {any} lastUpdatedEpochTime
 * @param {any} postCreationEpochTime
 * @return {any}
 */
exports.setPost = function(uid, content, postId, lastUpdatedDate, lastUpdatedTime, photoURLs, lastUpdatedEpochTime, postCreationEpochTime) {
  const addPostPromise = db.collection("Social").doc(postId).set({
    Uid: uid,
    Content: content,
    PostId: postId,
    ImagesUrl: photoURLs,
    Reach: 0,
    Reactions: 0,
    // ReactionCounter: 0,
    CommentCounter: 0,
    LastUpdatedDate: lastUpdatedDate,
    LastUpdatedTime: lastUpdatedTime,
    LastUpdatedEpochTime: lastUpdatedEpochTime,
    PostCreationEpochTime: postCreationEpochTime,
    Status: "OK",
  });
  return Promise.resolve(addPostPromise);
};

/**
 * Description
 * @param {any} currentEpochTime
 * @return {any}
 */
exports.getAllPosts = function(currentEpochTime) {
  let query = db.collection("Social");
  query = query.where("Status", "==", "OK");
  if (currentEpochTime!="") {
    query = query.where("LastUpdatedEpochTime", "<", currentEpochTime);
  }
  const getAllPosts = query.orderBy( "LastUpdatedEpochTime", "desc" ).limit(10).get().then((doc) => {
    return doc;
  });
  return Promise.resolve(getAllPosts);
};


/**
 * Description
 * @param {any} postId
 * @return {any}
 */
exports.getPost = function(postId) {
  const getPostDetails = db.collection("Social").doc(postId).get().then((postDoc) => {
    return postDoc.data();
  });
  return Promise.resolve(getPostDetails);
};

/**
 * Description
 * @param {any} updatePostToJson
 * @param {any} postId
 * @return {any}
 */
exports.deleteUserPost = function(updatePostToJson, postId) {
  const deletePostPromise = db.collection("Social").doc(postId).update(updatePostToJson);
  return Promise.resolve(deletePostPromise);
};

/**
 * Description
 * @param {any} updatePostToJson
 * @param {any} postId
 * @param {any} commentId
 * @return {any}
 */
exports.deletePostComment = function(updatePostToJson, postId, commentId) {
  const deleteCommentPromise = db.collection("Social").doc(postId).collection("Comment").doc(commentId).update(updatePostToJson);
  return Promise.resolve(deleteCommentPromise);
};

/**
 * Description
 * @param {any} postId
 * @param {any} uid
 * @return {any}
 */
exports.deletePostReaction = function(postId, uid) {
  const deleteReactionPromise = db.collection("Social").doc(postId).collection("Reactions").where("Uid", "==", uid);
  deleteReactionPromise.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.delete();
    });
  });
  return Promise.resolve(deleteReactionPromise);
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
    CommentId: commentId,
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
exports.setReactDoc = function(postId, reactId, creationDate, creationTime, type, uid) {
  const setReactDetails = db.collection("Social").doc(postId).collection("Reactions").doc(reactId).set({
    CreationDate: creationDate,
    CreationTime: creationTime,
    Type: type,
    Uid: uid,
    PostId: postId,
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


/**
 * Description
 * @param {any} postID
 * @return {any}
 */
exports.getCommentsContent = function(postID) {
  const getCommentsPromise = db.collection("Social").doc(postID).collection("Comment").where("Status", "==", "OK").get();
  return Promise.resolve(getCommentsPromise);
};

/**
 * Description
 * @param {any} postID
 * @return {any}
 */
exports.getReactionsContent = function(postID) {
  const getReactionsPromise = db.collection("Social").doc(postID).collection("Reactions").get();
  return Promise.resolve(getReactionsPromise);
};