/* eslint-disable linebreak-style */
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
