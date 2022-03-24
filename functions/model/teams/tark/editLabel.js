const {getLabelById, updateLabel} =require("../lib");

exports.editLabel = function(request, response) {
  const displayName = request.body.data.DisplayName;
  const iconName = request.body.data.IconName;
  const colorCode = request.body.data.ColorCode;
  const orgDomain = request.body.data.OrgDomain;
  const teamName = request.body.data.TeamName;
  const docId = request.body.data.Id;

  let result;
  let status = 200;

  const promise = getLabelById(orgDomain, teamName, docId).then((labelData) => {
    if (labelData == undefined) {
      result = {data: {status: "Label does not exist"}};
    } else {
      const inputJson = {
        DisplayName: displayName,
        IconName: iconName,
        ColorCode: colorCode,
      };
      updateLabel(inputJson, orgDomain, teamName, docId);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });


  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Label edited Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = {data: error};
        console.error("Error editing Label", error);
        return response.status(status).send(result);
      });
};
