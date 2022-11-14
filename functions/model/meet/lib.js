/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const {db} = require("../application/lib");

/**
 * Description
 * @param {any} meetDocId
 * @param {any} orgDomain
 * @param {any} teamId
 * @param {any} teamMembers
 * @param {any} title
 * @param {any} startTime
 * @param {any} endTime
 * @param {any} hostName
 * @param {any} description
 * @param {any} date
 * @param {any} roomId
 * @return {any}
 */
exports.setMeet = function(meetDocId, orgDomain, teamId, teamMembers, title, startTime, endTime, hostName, description, date, roomId) {
  const setMeetDoc = db.collection("Meet").doc(meetDocId).set({
    MeetDocId: meetDocId,
    OrgDomain: orgDomain,
    TeamId: teamId,
    TeamMembers: teamMembers,
    Title: title,
    StartTime: startTime,
    EndTime: endTime,
    HostName: hostName,
    Description: description,
    Date: date,
    RoomId: roomId,
  });
  return Promise.resolve(setMeetDoc);
};

/**
 * Description
 * @param {any} meetDocId
 * @param {any} orgDomain
 * @param {any} teamId
 * @param {any} teamMembers
 * @param {any} title
 * @param {any} startTime
 * @param {any} endTime
 * @param {any} hostName
 * @param {any} description
 * @param {any} date
 * @param {any} uid
 * @param {any} roomId
 * @return {any}
 */
exports.setUserMeet = function(meetDocId, orgDomain, teamId, teamMembers, title, startTime, endTime, hostName, description, date, uid, roomId) {
  const setMeetDoc1 = db.collection("Users").doc(uid).collection("Meet").doc(meetDocId).set({
    MeetDocId: meetDocId,
    OrgDomain: orgDomain,
    TeamId: teamId,
    TeamMembers: teamMembers,
    Title: title,
    StartTime: startTime,
    EndTime: endTime,
    HostName: hostName,
    Description: description,
    Date: date,
    Uid: uid,
    RoomId: roomId,
  });
  return Promise.resolve(setMeetDoc1);
};

/**
 * Description
 * @param {any} updateJson
 * @param {any} meetDocId
 * @param {any} title
 * @return {any}
 */
exports.updateMeetDetails= function(updateJson, meetDocId) {
  const updateMeet = db.collection("Meet").doc(meetDocId).update(updateJson);
  return Promise.resolve(updateMeet);
};

/**
 * Description
 * @param {any} meetDocId
 * @return {any}
 */
exports.getWorktezMeetDetails=function(meetDocId) {
  const query = db.collection("Meet").doc(meetDocId);
  const promise = query.get().then((doc) => {
    const data=[];
    doc.forEach((element) => {
      if (element.exists) {
        data.push( element.data());
      }
    });
    return data;
  });
  return Promise.resolve(promise);
};

/**
 * Description
 * @param {any} uid
 * @return {any}
 */
exports.getMeetDetails=function(uid) {
  const query = db.collection("Users").doc(uid).collection("Meet");

  const promise = query.get().then((doc) => {
    const data=[];
    doc.forEach((element) => {
      if (element.exists) {
        data.push( element.data());
      }
    });
    return data;
  });

  return Promise.resolve(promise);
};

/**
 * Description
 * @param {any} updateJson
 * @param {any} meetDocId
 * @return {any}
 */
exports.updateMeetDetailsAtWorktez= function(updateJson, meetDocId) {
  const updateMeet = db.collection("Meet").doc(meetDocId).update(updateJson);
  return Promise.resolve(updateMeet);
};
