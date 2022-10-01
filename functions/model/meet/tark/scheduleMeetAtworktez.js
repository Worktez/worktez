
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
const {getApplicationData, updateApplication, generateBase64String, milliSeconds} = require("../../application/lib");
const {setMeetAtWorktez} = require("../lib");

exports.scheduleMeetAtWorktez = function(request, response) {
  const attendees = request.body.data.TeamMembers;
  const title = request.body.data.Title;
  const startTime = request.body.data.StartTime;
  const endTime = request.body.data.EndTime;
  const hostName = request.body.data.HostName;
  const description = request.body.data.Description;
  const date = request.body.data.Date;

  let status = 200;
  let result;

  const promise1 = getApplicationData().then((appData) => {
    const meetWorktezCounter = appData.MeetWorktezCounter+1;
    const appDetailsUpdateJson = {
      MeetWorktezCounter: meetWorktezCounter,
    };

    const meetDocId = "m" + meetWorktezCounter;
    const roomId = generateBase64String( milliSeconds+title);
    setMeetAtWorktez(meetDocId, attendees, title, startTime, endTime, hostName, description, date, roomId);
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
