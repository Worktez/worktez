/* eslint-disable valid-jsdoc */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
/* eslint-disable max-len */
const {db} = require("../application/lib");

/**
 * Description
 * @param {any} description
 * @param {any} releaseName
 * @param {any} tagName
 * @param {any} targetBranch
 * @param {any} ifDraft
 * @param {any} preRelease
 * @param {any} generateRelease
 * @param {any} ownerName
 * @param {any} repoName
 * @param {any} teamId
 * @param {any} releaseId
 * @param {any} orgDomain
 * @param {any} releaseDate
 * @param {any} title
 * @return {any}
 */
exports.setRelease = function(description, releaseName, tagName, targetBranch, ifDraft, preRelease, generateRelease, teamId, releaseId, orgDomain, releaseDate, title) {
  const setReleasePromise = db.collection("Organizations").doc(orgDomain).collection("Releases").doc(releaseId).set({
    Description: description,
    ReleaseName: releaseName,
    TagName: tagName,
    TargetBranch: targetBranch,
    IfDraft: ifDraft,
    PreRelease: preRelease,
    GenerateRelease: generateRelease,
    TeamId: teamId,
    ReleaseDate: releaseDate,
    ReleaseId: releaseId,
    Title: title,
    Status: "OK",
  });
  return Promise.resolve(setReleasePromise);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamId
 * @return {any}
 */
exports.getAllReleaseData = function(orgDomain, teamId="") {
  let query = db.collection("Organizations").doc(orgDomain).collection("Releases").where("Status", "==", "OK");
  if (teamId != "") {
    query = query.where("TeamId", "==", teamId);
  }

  const promise = query.get().then((doc) => {
    const data=[];
    doc.forEach((element) => {
      if (element.exists) {
        data.push(element.data());
      }
    });
    return data;
  });
  return Promise.resolve(promise);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamId
 * @param {any} releaseId
 * @return {any}
 */
exports.updateRelease = function(updateReleaseToJson, orgDomain, releaseId) {
  const updateReleasePromise = db.collection("Organizations").doc(orgDomain).collection("Releases").doc(releaseId).update(updateReleaseToJson);
  return Promise.resolve(updateReleasePromise);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} releaseId
 * @return {any}
 */
exports.getReleaseData = function(orgDomain, releaseId) {
  const getReleaseDataPromise = db.collection("Organizations").doc(orgDomain).collection("Releases").doc(releaseId).get().then((doc) => {
    if (doc.exists) {
      return doc.data();
    } else {
      return;
    }
  });
  return Promise.resolve(getReleaseDataPromise);
};
