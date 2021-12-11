/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
const { getTeam } = require("../teams/lib");
const { updatePatchData } = require("./lib");

exports.patch8 = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  let teamName;
  const newfield = request.body.data.newField;
  const newFieldValue = request.body.data.NewFieldValue;
  const newFieldValueType = request.body.data.NewFieldValueType;
  const uid = request.body.data.Uid;
  const promise1 = getTeam(orgDomain, teamName).then((team) => {
      teamName = team.teamName;
      console.log(teamName);
      data = {};
      if (newFieldValueType == "Array") {
        data[newfield] = [];
      } else if (newFieldValueType == "String") {
        data[newfield] = newFieldValue;
      } else if (newFieldValueType == "Number") {
        data[newfield] = Number(newFieldValue);
      }
      updateTeamDetails(data, orgDomain, teamName);
    });
    const Promises = [promise1];
    Promise.all(Promises).then(() => {
      result = {data: "OK! Patch8 executed"};
      updatePatchData("Patch8", {LastUsedByUid: uid, LastUsedByOrg: orgDomain});
      console.log("Patch8 executed successfully");
      return response.status(200).send(result);
    }).catch(function(error) {
      result = {data: error};
      console.error("Patch8 error in updating all tasks", error);
      return response.status(500).send(result);
  });
};
