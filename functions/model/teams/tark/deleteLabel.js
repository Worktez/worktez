/* eslint-disable linebreak-style */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Simran Nigam <nigamsimran14@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const {getLabelById, updateLabel, updateTeamDetails} =require("../lib");
const admin = require("firebase-admin");

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

      const scope = labelData.Scope;
      const displayName = labelData.DisplayName;

      const inputJson = {};

      if (scope == "Priority") {
        inputJson["Priority"] = admin.firestore.FieldValue.arrayRemove(displayName);
      } else if (scope == "Difficulty") {
        inputJson["Difficulty"] = admin.firestore.FieldValue.arrayRemove(displayName);
      } else if (scope == "Status") {
        inputJson["Status"] = admin.firestore.FieldValue.arrayRemove(displayName);
      } else if (scope == "Type") {
        inputJson["Type"] = admin.firestore.FieldValue.arrayRemove(displayName);
      } else if (scope == "MilestoneStatus") {
        inputJson["MilestoneStatus"] = admin.firestore.FieldValue.arrayRemove(displayName);
      }

      updateTeamDetails(inputJson, orgDomain, teamName);
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


