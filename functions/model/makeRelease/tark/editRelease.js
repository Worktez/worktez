const {getReleaseData, updateRelease} = require("../lib");

exports.editRelease = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const releaseId = request.body.data.ReleaseId;
  const releaseName = request.body.data.ReleaseName;
  const tagName = request.body.data.TagName;
  const targetBranch = request.body.data.TargetBranch;
  const description = request.body.data.Description;
  const ifDraft = request.body.data.IfDraft;
  const preRelease = request.body.data.PreRelease;
  const generateRelease = request.body.data.GenerateRelease;
  const teamId = request.body.data.TeamId;

  let result;
  let status = 200;

  const promise = getReleaseData(orgDomain, releaseId).then((releaseData) => {
    if (releaseData == undefined) {
      result = {data: {status: "Release does not exist"}};
    } else {
      const inputJson = {
        ReleaseName: releaseName,
        Description: description,
        TagName: tagName,
        TargetBranch: targetBranch,
        IfDraft: ifDraft,
        PreRelease: preRelease,
        GenerateRelease: generateRelease,
        TeamId: teamId,
      };
      updateRelease(inputJson, orgDomain, releaseId);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("release edited Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error editing Release", error);
    return response.status(status).send(result);
  });
};
