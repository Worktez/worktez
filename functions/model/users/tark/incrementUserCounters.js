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

const {getUser, updateUser} = require("../lib");

exports.incrementNumberofPostsforUser = function(uid) {
  getUser(uid, "").then((userData) => {
    let UserPostsCounter = userData.UserPostsCounter;
    if (isNaN(UserPostsCounter)) {
      UserPostsCounter = 0;
    }
    UserPostsCounter = UserPostsCounter+1;
    const inputPostJson = {
      UserPostsCounter: UserPostsCounter,
    };
    updateUser(inputPostJson, uid);
  });
};

exports.decrementNumberofPostsforUser = function(uid) {
  getUser(uid, "").then((userData) => {
    let UserPostsCounter = userData.UserPostsCounter;
    if (isNaN(UserPostsCounter)) {
      UserPostsCounter = 0;
    }
    UserPostsCounter = UserPostsCounter-1;
    const inputPostJson = {
      UserPostsCounter: UserPostsCounter,
    };
    updateUser(inputPostJson, uid);
  });
};

exports.incrementNumberofLikesforUser = function(uid) {
  getUser(uid, "").then((userData) => {
    let UserReactionCounter = userData.UserReactionCounter;
    if (isNaN(UserReactionCounter)) {
      UserReactionCounter = 0;
    }
    UserReactionCounter = UserReactionCounter+1;
    const inputPostJson = {
      UserReactionCounter: UserReactionCounter,
    };
    updateUser(inputPostJson, uid);
  });
};

exports.decrementNumberofLikesforUser = function(uid) {
  getUser(uid, "").then((userData) => {
    let UserReactionCounter = userData.UserReactionCounter;
    if (isNaN(UserReactionCounter)) {
      UserReactionCounter = 0;
    }
    UserReactionCounter = UserReactionCounter-1;
    const inputPostJson = {
      UserReactionCounter: UserReactionCounter,
    };
    updateUser(inputPostJson, uid);
  });
};


exports.incrementNumberofCommentsforUser = function(uid) {
  getUser(uid, "").then((userData) => {
    let UserCommentCounter = userData.UserCommentCounter;
    if (isNaN(UserCommentCounter)) {
      UserCommentCounter = 0;
    }
    UserCommentCounter = UserCommentCounter+1;
    const inputPostJson = {
      UserCommentCounter: UserCommentCounter,
    };
    updateUser(inputPostJson, uid);
  });
};

exports.incrementNumberofCompletedTaskforUser = function(uid) {
  getUser(uid, "").then((userData) => {
    let CompletedTaskCounter = userData.CompletedTaskCounter;
    if (isNaN(CompletedTaskCounter)) {
      CompletedTaskCounter = 0;
    }
    CompletedTaskCounter = CompletedTaskCounter+1;
    const inputPostJson = {
      CompletedTaskCounter: CompletedTaskCounter,
    };
    updateUser(inputPostJson, uid);
  });
};
