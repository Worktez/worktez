/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable max-len */
const {getPatchData, setPatch} = require("../lib");

exports.patchModerator = function(request, response) {
  const Patch = request.body.data.Patch;
  const patchName = request.body.data.PatchName;
  const patchDescription = request.body.data.PatchDescription;
  const CreationDate = request.body.data.CreationDate;
  const UpdatedOn = request.body.data.UpdatedOn;
  const LastUsedByOrg = request.body.data.LastUsedByOrg;
  const LastUsedByUid = request.body.data.LastUsedByUid;

  const promise = getPatchData(Patch).then((patch) => {
    if (patch == undefined) {
      setPatch(Patch, patchName, patchDescription, CreationDate, UpdatedOn, LastUsedByOrg, LastUsedByUid);
    }
  });

  return Promise.resolve(promise).then(() => {
    result = {data: "Patch document created successfully"};
    console.log("Patch document created successfully");
    return response.status(200).send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error in creating Patch document", error);
    return response.status(500).send(result);
  });
};
