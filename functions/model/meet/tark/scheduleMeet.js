/* eslint-disable max-len */
const {getApplicationData, updateApplication} = require("../../application/lib");
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
  console.log(orgDomain, teamId, teamMembers, title, startTime, endTime, hostName, description, date);
  let status = 200;
  let result;

  const promise1 = getApplicationData().then((appData) => {
    const meetCounter = appData.MeetCounter+1;
    const appDetailsUpdateJson = {
      MeetCounter: meetCounter,
    };

    const meetDocId = "m" + meetCounter;
    setUserMeet(meetDocId, orgDomain, teamId, teamMembers, title, startTime, endTime, hostName, description, date, uid);
    setMeet(meetDocId, orgDomain, teamId, teamMembers, title, startTime, endTime, hostName, description, date);
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
