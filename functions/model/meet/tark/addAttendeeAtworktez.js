/* eslint-disable max-len */
const {updateMeetDetailsAtWorktez} = require("../lib");

exports.addAttendeeAtWorktez = function(request, response) {
  const attendees = request.body.data.Attendees;
  const add = request.body.data.Add;

  let result;
  const status = 200;

  const found = attendees.include(add);
  if (found) {
    result = {data: "Attendees already added"};
    console.log("Attendees already added");
  } else {
    attendees.push(add);
    const updateJson = {
      Attendees: attendees,
    };
    updateMeetDetailsAtWorktez(updateJson);
    result = {data: "Attendee added Successfully"};
    console.log("Attendee added Successfully");
  }
  return response.status(status).send(result);
};
