/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

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
 * @param {any} description
 * @param {any} filterJson
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
 * @param {any} inputJson
 * @param {any} orgDomain
 * @param {any} teamName
 * @param {any} docId
 * @return {any}
 */
exports.updateFilter = function(inputJson, orgDomain, teamName, docId) {
  const editFilterPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).collection("CustomFilter").doc(docId).update(inputJson);
  return Promise.resolve(editFilterPromise);
};
