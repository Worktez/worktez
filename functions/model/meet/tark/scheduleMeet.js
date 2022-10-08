/* eslint-disable max-len */
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
const {getApplicationData, updateApplication, generateBase64String, milliSeconds} = require("../../application/lib");
const {setMeet} = require("../lib");
const {setUserMeet} = require("../lib");

exports.scheduleMeet = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const teamId = request.body.data.TeamId;
  const teamMembers = request.body.data.TeamMembers;
  const title = request.body.data.Title;
  const startTime = request.body.data.StartTime;
  const endTime = request.body.data.EndTime;
  const hostName = request.body.data.HostName;
  const description = request.body.data.Description;
  const date = request.body.data.Date;
  const uid = request.body.data.Uid;

  let status = 200;
  let result;

  const promise1 = getApplicationData().then((appData) => {
    const meetCounter = appData.MeetCounter+1;
    const appDetailsUpdateJson = {
      MeetCounter: meetCounter,
    };

    const meetDocId = "m" + meetCounter;
    const roomId = generateBase64String( milliSeconds+title);
    if (teamId=="" && uid=="" && orgDomain=="") {
      setMeet(meetDocId, orgDomain, teamId, teamMembers, title, startTime, endTime, hostName, description, date, roomId);
    } else {
      setUserMeet(meetDocId, orgDomain, teamId, teamMembers, title, startTime, endTime, hostName, description, date, uid, roomId);
      setMeet(meetDocId, orgDomain, teamId, teamMembers, title, startTime, endTime, hostName, description, date, roomId);
    }
    updateApplication(appDetailsUpdateJson);
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  const promise = [promise1];
  return Promise.all(promise).then(() => {
    const arr = ["Scheduled meet Successfully"];
    result = {data: arr};
    console.log("Scheduled meet Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error Scheduling Meet", error);
    return response.status(status).send(result);
  });
};
