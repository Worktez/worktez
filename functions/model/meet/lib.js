/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
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
 * @param {any} roomId
 * @return {any}
 */
 exports.setMeetMeetAtMeetWorktez = function(meetDocId, teamMembers, title, startTime, endTime, hostName, description, date, roomId) {
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
 * @param {any} uid
 * @param {any} hostName
 * @param {any} description
 * @param {any} date
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
 * @param {any} inputJson
 * @param {any} orgDomain
 * @param {any} title
 * @return {any}
 */
exports.updateMeetDetails= function(updateJson) {
  const updateMeet = db.collection("Meet").doc(meetDocId).update(updateJson);
  return Promise.resolve(updateMeet);
};

/**
 * Description
 * @param {any}
 * @param {any}
 * @return {any}
 */
exports.getMeetDetails=function(uid) {
    const query = db.collection("Users").doc(uid).collection("Meet");

    // query = query.where("HostName", "==", "OK");
    const promise = query.get().then((doc) => {
        const data=[];
        // console.log(doc);
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
 * @param {any} meetDocId
 * @param {any} attendees
 * @param {any} title
 * @param {any} startTime
 * @param {any} endTime
 * @param {any} hostName
 * @param {any} description
 * @param {any} date
 * @return {any}
 */
exports.setMeetAtWorktez = function(meetDocId, attendees, title, startTime, endTime, hostName, description, date) {
  const setMeetDoc = db.collection("Meet.Worktez").doc(meetDocId).set({
    MeetDocId: meetDocId,
    Attendees: attendees,
    Title: title,
    StartTime: startTime,
    EndTime: endTime,
    HostName: hostName,
    Description: description,
    Date: date,
  });
  return Promise.resolve(setMeetDoc);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} title
 * @return {any}
 */
exports.updateMeetDetailsAtWorktez= function(updateJson) {
  const updateMeet = db.collection("Meet.Worktez").doc(meetDocId).update(updateJson);
  return Promise.resolve(updateMeet);
};
