const {getLabelById, updateLabel} =require("../lib");

exports.deleteLabel= function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const teamName = request.body.data.TeamName;
  const docId = request.body.data.Id;

  let result;
  let status = 200;

  const p1 = getLabelById(orgDomain, teamName, docId).then((labelData) => {
    if (labelData == undefined) {
      result = {data: {status: "Label does not exist"}};
    } else {
      const updateLabelToJson = {
        Status: "DELETED",
      };
      updateLabel(updateLabelToJson, orgDomain, teamName, docId);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  Promise.resolve(p1).then(() => {
    result = {data: {status: "OK"}};
    console.log("Label Deleted Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = {data: error};
        console.error("Error Deleting", error);
        return response.status(status).send(result);
      });
};


