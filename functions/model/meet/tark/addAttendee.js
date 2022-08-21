/* eslint-disable max-len */
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
