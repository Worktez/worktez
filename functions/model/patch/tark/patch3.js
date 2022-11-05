/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const admin = require("firebase-admin");
const { updateTask } = require("../../tasks/lib");
const { updatePatchData } = require("../lib");

const db = admin.firestore();

exports.patch3 = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const oldField = request.body.data.FieldName;
  const oldFieldValue = request.body.data.FieldValue;
  const newField = request.body.data.NewField;
  const newFieldValue = request.body.data.NewFieldValue;
  const uid = request.body.data.Uid;
  let taskId;
  let result;

  const promise1 = db.collection("Organizations").doc(orgDomain).collection("Tasks").where(oldField, "==", oldFieldValue).get().then((task) => {
    task.forEach((doc) => {
      taskId = doc.data().Id;
      console.log("Executing Promise2 of Patch3");
      const data = {};
      data[newField] = newFieldValue;
      updateTask(data, orgDomain, taskId);
    });
    const Promises = [promise1];
    Promise.all(Promises).then(() => {
      result = { data: "OK! Patch3 executed" };
      console.log("updated");
      updatePatchData("Patch3", {LastUsedByUid: uid, LastUsedByOrg: orgDomain});
      return response.status(200).send(result);
    }).catch(function(error) {
      result = { data: error };
      console.error("Patch error in updating value", error);
      return response.status(500).send(result);
    });
  });
};