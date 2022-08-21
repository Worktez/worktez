/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
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

