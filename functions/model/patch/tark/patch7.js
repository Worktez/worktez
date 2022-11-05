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

const { getOrg, updateOrg } = require("../../organization/lib");
const { updatePatchData } = require("../lib");

exports.patch7 = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const newfield = request.body.data.newField;
  const newFieldValue = request.body.data.NewFieldValue;
  const newFieldValueType = request.body.data.NewFieldValueType;
  const uid = request.body.data.Uid;
  let result;

  const promise1 = getOrg(orgDomain).then((orgData) => {
    const data = {};
    if (newFieldValueType == "Array") {
      data[newfield] = [];
    } else if (newFieldValueType == "String") {
      data[newfield] = newFieldValue;
    } else if (newFieldValueType == "Number") {
      data[newfield] = Number(newFieldValue);
    }
    updateOrg(orgDomain, data);
  });
  const Promises = [promise1];
  Promise.all(Promises).then(() => {
    result = {data: "OK! Patch7 executed"};
    updatePatchData("Patch7", {LastUsedByUid: uid, LastUsedByOrg: orgDomain});
    console.log("Patch7 executed successfully");
    return response.status(200).send(result);
  }).catch(function(error) {
    result = {data: error};
    console.error("Patch7 error in updating organization", error);
    return response.status(500).send(result);
  });
};
