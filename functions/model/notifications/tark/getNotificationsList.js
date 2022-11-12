/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
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

const { getNotifications, emptyActiveNotification } = require("../lib");

exports.getNotificationsList = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const uid = request.body.data.Uid;
  const notificationStatus = request.body.data.NotificationStatus;

  let status = 200;
  let result;
  getNotifications(uid, orgDomain, notificationStatus, "", "").then((doc) => {
    emptyActiveNotification(uid, orgDomain);
    result = { data: doc };
    console.log("Sent notifications successfully");
    return response.status(status).send(result);
  }).catch((error)=>{
    status = 500;
    const result = { data: error };
    console.error("Error getting notifications", error);
    return response.status(status).send(result);
  });
};