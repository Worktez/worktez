/* eslint-disable valid-jsdoc */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

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

const { db } = require("../application/lib");

/**
 * Description
 * @param {any} uid
 * @param {any} orgDomain
 * @param {any} milestoneName
 * @param {any} description
 * @param {any} roadmapId
 * @param {any} teamId
 * @param {any} taskName
 * @param {any} startDate
 * @param {any} endDate
 * @return {any}
 */
exports.setRoadmap = function(orgDomain, milestoneName, description, taskName, startDate, endDate, teamId, roadmapId) {
  const addRoadmapPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamId).collection("Roadmap").doc(milestoneName).collection("tasks").doc(roadmapId).set({
    Description: description,
    TaskName: taskName,
    StartDate: startDate,
    EndDate: endDate,
    Status: "OK",
  });
  return Promise.resolve(addRoadmapPromise);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamId
 * @return {any}
 */
exports.getAllRoadmapData = function(orgDomain, teamId) {
  let query = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamId).collection("Roadmap");
  if (teamId!="") {
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
 * @param {any} milestoneName
 * @param {any} roadmapId
 * @return {any}
 */
exports.getRoadmapData = function(orgDomain, teamId, milestoneName, roadmapId) {
  const getRoadmapDataPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamId).collection("Roadmap").doc(milestoneName).get().then((doc) => {
    if (doc.exists) return doc.data();
    else return;
  });
  return Promise.resolve(getRoadmapDataPromise);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamId
 * @param {any} milestoneName
 * @param {any} roadmapId
 * @param {any} inputJson
 * @return {any}
 */
exports.updateRoadmap = function(inputJson, teamId, orgDomain, roadmapId, milestoneName) {
  const editRoadmapPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamId).collection("Roadmap").doc(milestoneName).update(inputJson);
  return Promise.resolve(editRoadmapPromise);
};
