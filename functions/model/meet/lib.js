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
 * @return {any}
 */
exports.setMeet = function(meetDocId, orgDomain, teamId, teamMembers, title, startTime, endTime, hostName, description, date, uid) {
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
 * @return {any}
 */
exports.setUserMeet = function(meetDocId, orgDomain, teamId, teamMembers, title, startTime, endTime, hostName, description, date, uid) {
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
