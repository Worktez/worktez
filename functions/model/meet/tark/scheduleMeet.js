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
 * Author : Sanjay Krishna S R <sanjaykrishna1203@gmail.com>
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const {getApplicationData, updateApplication} = require("../../application/lib");
const {setMeet, generateRoomId} = require("../lib");
const {setUserMeet} = require("../lib");

exports.scheduleMeet = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const teamId = request.body.data.TeamId;
  const attendees = request.body.data.Attendees;
  const title = request.body.data.Title;
  const startTime = request.body.data.StartTime;
  const endTime = request.body.data.EndTime;
  const hostEmail = request.body.data.HostEmail;
  const description = request.body.data.Description;
  const date = request.body.data.Date;
  let status = 200;
  let result;

  const promise1 = getApplicationData().then((appData) => {
    const meetCounter = appData.MeetCounter+1;
    const appDetailsUpdateJson = {
      MeetCounter: meetCounter,
    };
    let roomId = "";
    roomId = generateRoomId();

    // @TODO Check if room id already exists, if exists generate another ID
    //    getRoomDetailsById(roomId).then((data)=>{
    //     if (data != undefined) retry;


    console.log("Room Id", roomId);

    setMeet(orgDomain, teamId, attendees, title, startTime, endTime, hostEmail, description, date, roomId);

    attendees.forEach((email) => {
      setUserMeet(email, orgDomain, teamId, attendees, title, startTime, endTime, hostEmail, description, date, roomId);
    });
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
