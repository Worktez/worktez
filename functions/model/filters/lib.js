/* eslint-disable linebreak-style */
/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

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

const {db} = require("../application/lib");

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamName
 * @param {any} docId
 * @param {any} filterName
 * @param {any} scope
 * @param {any} status
 * @return {any}
 */
exports.setFilterProperties = function(orgDomain, teamName, docId, filterName, description, filterJson) {
  const setFilterProperties = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).collection("CustomFilter").doc(docId).set({
    FilterName: filterName,
    Description: description,
    FilterJson: filterJson,
    Status: "OK",
    Id: docId,
  });
  return Promise.resolve(setFilterProperties);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamName
 * @param {any} docId
 * @return {any}
 */
exports.getFilterById = function(orgDomain, teamName, docId) {
  console.log(orgDomain, teamName, docId);
  const getFilterById = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).collection("CustomFilter").doc(docId).get().then((doc) => {
    const data = doc.data();
    return data;
  });
  return Promise.resolve(getFilterById);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamName
 * @param {any} docId
 * @return {any}
 */
exports.getFilters = function(orgDomain, teamName) {
  console.log(orgDomain, teamName);
  const getFilterPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).collection("CustomFilter").where("Status", "==", "OK").get().then((doc) => {
    const data = [];
    doc.forEach((filter) => {
      data.push(filter.data());
    });
    return data;
  });
  return Promise.resolve(getFilterPromise);
};


/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamName
 * @param {any} docId
 * @return {any}
 */
exports.updateFilter = function(inputJson, orgDomain, teamName, docId) {
  const editFilterPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).collection("CustomFilter").doc(docId).update(inputJson);
  return Promise.resolve(editFilterPromise);
};
