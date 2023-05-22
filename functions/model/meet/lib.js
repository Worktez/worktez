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
 * @param {any} orgDomain
 * @param {any} teamId
 * @param {any} teamMembers
 * @param {any} title
 * @param {any} startTime
 * @param {any} endTime
 * @param {any} hostEmail
 * @param {any} description
 * @param {any} date
 * @param {any} roomId
 * @return {any}
 */
exports.setMeet = function(orgDomain, teamId, teamMembers, title, startTime, endTime, hostEmail, description, date, roomId) {
  const setMeetDoc = db.collection("Meets").doc(roomId).set({
    OrgDomain: orgDomain,
    TeamId: teamId,
    Attendees: teamMembers,
    Title: title,
    StartTime: startTime,
    EndTime: endTime,
    Status: "OK",
    HostEmail: hostEmail,
    Description: description,
    Date: date,
    RoomId: roomId,
  });
  return Promise.resolve(setMeetDoc);
};

/**
 * Description
 * @param {any} userEmail
 * @param {any} orgDomain
 * @param {any} teamId
 * @param {any} teamMembers
 * @param {any} title
 * @param {any} startTime
 * @param {any} endTime
 * @param {any} hostEmail
 * @param {any} description
 * @param {any} date
 * @param {any} roomId
 * @return {any}
 */
exports.setUserMeet = function(userEmail, orgDomain, teamId, teamMembers, title, startTime, endTime, hostEmail, description, date, roomId) {
  const setMeetDoc1 = db.collection("UserMeets").doc(userEmail).collection("Meets").doc(roomId).set({
    OrgDomain: orgDomain,
    TeamId: teamId,
    TeamMembers: teamMembers,
    Title: title,
    StartTime: startTime,
    EndTime: endTime,
    HostEmail: hostEmail,
    Status: "OK",
    Description: description,
    Date: date,
    RoomId: roomId,
  });
  return Promise.resolve(setMeetDoc1);
};

/**
 * Description
 * @param {any} email
 * @param {any} roomId
 * @param {any} updateMeetDetailsToJson
 * @return {any}
 */
exports.updateUserMeetDetails= function(email, roomId, updateMeetDetailsToJson) {
  const updateMeet = db.collection("UserMeets").doc(email).collection("Meets").doc(roomId).update(updateMeetDetailsToJson);
  return Promise.resolve(updateMeet);
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
 * @param {any} email
 * @param {any} today
 * @return {any}
 */
exports.getMeetDetails=function(email, today="") {
  let query = db.collection("UserMeets").doc(email).collection("Meets").where("Status", "==", "OK");
  if (today != "") {
    // @TODO Select only meetings future meetings of the day ( by Time )
    // @TODO Create a scheduler fn for marking past meetings as 'Completed' or 'Ended', It should run with daily scheduler.
    // @TODO Create a scheduler fn for deleting the old meetings from database.S
    query = query.where("Date", "==", today);
  }
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
 * @param {any} roomId
 * @return {any}
 */
exports.updateMeetDetailsByID = function(updateJson, roomId) {
  const updateMeet = db.collection("Meets").doc(roomId).update(updateJson);
  return Promise.resolve(updateMeet);
};

/**
 * Description
 * @param {any} email
 * @param {any} docId
 * @return {any}
 */
exports.getUserMeetDetailsById = function(email, docId) {
  const getUserMeetDetailsById = db.collection("UserMeets").doc(email).collection("Meets").doc(docId).get().then((doc) => {
    const data = doc.data();
    return data;
  });
  return Promise.resolve(getUserMeetDetailsById);
};

exports.generateRoomId = function() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const idLength = 9;
  let id = "";

  // Loop through and add a random character to the ID until it reaches the desired length
  while (id.length < idLength) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    id += alphabet[randomIndex];
  }
  console.log("Room id given", id);
  return id;
};

exports.getRoomDetailsById = function(id) {
  console.log("Checking for", id);
  const promise = db.collection("Meets").doc(id).get().then((doc)=>{
    const data = doc.data();
    return data;
  });
  return Promise.resolve(promise);
};