/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */

const { getAllUsers, updateUser } = require("../users/lib");
const { updatePatchData } = require("./lib");

exports.patch9 = function(request, response) {
  const newfield = request.body.data.newField;
  const newFieldValue = request.body.data.NewFieldValue;
  const newFieldValueType = request.body.data.NewFieldValueType;
  const uid = request.body.data.Uid;

  inputJson = {};
  if (newFieldValueType == "Array") {
    inputJson[newfield] = [];
  } else if (newFieldValueType == "String") {
    inputJson[newfield] = newFieldValue;
  } else if (newFieldValueType == "Number") {
    inputJson[newfield] = Number(newFieldValue);
  }

  const promise1 = getAllUsers().then((data) => {
    data.forEach((element) => {
      updateUser(inputJson, element.data().uid);
    });
  });

  const Promises = [promise1];
  Promise.all(Promises).then(() => {
    result = {data: "OK! Patch9 executed"};
    updatePatchData("Patch9", {LastUsedByUid: uid, LastUsedByOrg: "orgDomain"});
    console.log("Patch9 executed successfully");
    return response.status(200).send(result);
  }).catch(function(error) {
    result = {data: error};
    console.error("Patch9 error in updating organization", error);
    return response.status(500).send(result);
  });
};
