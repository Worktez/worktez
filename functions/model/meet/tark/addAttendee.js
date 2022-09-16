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
const {updateMeetDetails} = require("../lib");

exports.addAttendee = function(request, response) {
  const teamMembers = request.body.data.TeamMembers;
  const add = request.body.data.Add;

  let result;
  const status = 200;

  const found = teamMembers.include(add);
  if (found) {
    result = {data: "Attendees already added"};
    console.log("Attendees already added");
  } else {
    teamMembers.push(add);
    const updateJson = {
      TeamMembers: teamMembers,
    };
    updateMeetDetails(updateJson);
    result = {data: "Attendee added Successfully"};
    console.log("Attendee added Successfully");
  }
  return response.status(status).send(result);
};