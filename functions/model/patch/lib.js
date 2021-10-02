/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const {db} = require("../application/lib");

exports.setPatch = function(documentName, PatchName, PatchDescription, CreationDate, UpdatedOn, LastUsedByOrg, LastUsedByUid) {
  const promise = db.collection("Patches").doc(documentName).set({
    Name: PatchName,
    PatchId: documentName,
    Description: PatchDescription,
    CreationDate: CreationDate,
    UpdatedOn: UpdatedOn,
    LastUsedByOrg: LastUsedByOrg,
    LastUsedByUid: LastUsedByUid,
  });
  return Promise.resolve(promise);
};

exports.updatePatchData = function(documentName, updateJson) {
  const promise = db.collection("Patches").doc(documentName).update(updateJson);
  return Promise.resolve(promise);
};

exports.getPatchData = function(documentName) {
  const getPatchData = db.collection("Patches").doc(documentName).get().then((patch) => {
    if (patch.exists) {
      return patch.data();
    } else {
      return;
    }
  });
  return Promise.resolve(getPatchData);
};
