/* eslint-disable no-const-assign */
/* eslint-disable max-len */
const {getMilestoneData, updateMilestone} = require("../lib");

exports.editMilestone = function(request, response) {
  const milestoneStatus = request.body.data.MilestoneStatus;
  const orgDomain = request.body.data.OrgDomain;
  const milestoneId = request.body.data.MilestoneId;

  let result;
  let status = 200;

  const promise = getMilestoneData(orgDomain, milestoneId).then((milestoneData) => {
    if (milestoneData == undefined) {
      result = {data: {status: "Milestone does not exist"}};
    } else {
      const inputJson = {
        MilestoneStatus: milestoneStatus,
      };
      updateMilestone(inputJson, orgDomain, milestoneId);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("milestone edited Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = {data: error};
        console.error("Error editing Filter", error);
        return response.status(status).send(result);
      });
};
