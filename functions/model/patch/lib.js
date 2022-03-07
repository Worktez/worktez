/* eslint-disable linebreak-style */
/* eslint-disable max-len */
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

const {db} = require("../application/lib");

/**
 * Description
 * @param {any} documentName
 * @param {any} PatchName
 * @param {any} PatchDescription
 * @param {any} CreationDate
 * @param {any} UpdatedOn
 * @param {any} LastUsedByOrg
 * @param {any} LastUsedByUid
 * @return {any}
 */
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

/**
 * Description
 * @param {any} documentName
 * @param {any} updateJson
 * @return {any}
 */
exports.updatePatchData = function(documentName, updateJson) {
  const promise = db.collection("Patches").doc(documentName).update(updateJson);
  return Promise.resolve(promise);
};

/**
 * Description
 * @param {any} documentName
 * @return {any}
 */
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
