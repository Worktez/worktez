/* eslint-disable max-len */
const {getApplicationData, updateApplication} = require("../../application/lib");
const {setMeetAtWorktez} = require("../lib");

exports.scheduleMeetAtWorktez = function(request, response) {
  const attendees = request.body.data.Attendees;
  const title = request.body.data.Title;
  const startTime = request.body.data.StartTime;
  const endTime = request.body.data.EndTime;
  const hostName = request.body.data.HostName;
  const description = request.body.data.Description;
  const date = request.body.data.Date;

  console.log(attendees, title, startTime, endTime, hostName, description, date);

  let status = 200;
  let result;

  const promise1 = getApplicationData().then((appData) => {
    const meetCounter = appData.MeetCounter+1;
    const appDetailsUpdateJson = {
      MeetCounter: meetCounter,
    };

    const meetDocId = "m" + meetCounter;
    setMeetAtWorktez(meetDocId, attendees, title, startTime, endTime, hostName, description, date);
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
