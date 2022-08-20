/* eslint-disable max-len */
const {updateMeetDetails} = require("../lib");

exports.addAttendee = function(request, response) {
  // const orgDomain = request.body.data.OrgDomain;
  // const teamId = request.body.data.TeamId;
  const teamMembers = request.body.data.TeamMembers;
  // const host = request.body.data.Host;
  // const description = request.body.data.Description;
  // const title = request.body.data.Title;
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
