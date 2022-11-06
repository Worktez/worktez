/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Abhishek Mishra <am1426620@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const { db } = require("../application/lib");

/**
 * Description
 * @param {any} personName
 * @param {any} emailAddress
 * @param {any} requestId
 * @param {any} contactNumber
 * @param {any} orgName
 * @param {any} date
 * @param {any} time
 * @return {any}
 */
exports.setRequest = function(personName, emailAddress, requestId, contactNumber, orgName, date, time) {
  const addRequestPromise = db.collection("DemoRequests").doc(requestId).set({
    PersonName: personName,
    EmailAddress: emailAddress,
    ContactNumber: contactNumber,
    OrganisationOrProjectName: orgName,
    CreationDate: date,
    CreationTime: time,
  });
  return Promise.resolve(addRequestPromise);
};

/**
 * Description
 * @return {any}
 */
exports.setDemoRequestData = function() {
  const P1 = db.collection("DemoRequests").doc("RawData").set({
    DemoRequestCounter: 0,
  });
  return Promise.resolve(P1);
};


exports.getDemoRequestData = function() {
  const promise = db.collection("DemoRequests").doc("RawData").get().then((doc) => {
    if (doc.exists) {
      return doc.data();
    } else {
      return;
    }
  });
  return Promise.resolve(promise);
};

/**
 * Description
 * @param {any} inputJson
 * @return {any}
 */
exports.updateDemoRequestData = function(inputJson) {
  const P1 = db.collection("DemoRequests").doc("RawData").update(inputJson);
  return Promise.resolve(P1);
};