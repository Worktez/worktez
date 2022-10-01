/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
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

const admin = require("firebase-admin");
const firestore = admin.firestore();

/**
 * Description
 * @param {any} "firebase-functions"
 * @returns {any}
 */
const functions = require("firebase-functions");
/**
 * Description
 * @param {any} "cors"
 * @returns {any}
 */
const cors = require("cors")({ origin: true });

const http = require("http");
let requestHandler = null;

/**
 * Description
 * @param {any} "fastify"
 * @returns {any}
 */
const fastify = require("fastify")({
  logger: false,
  serverFactory: (handler) => {
    requestHandler = handler;
    return http.createServer();
  },
});

/**
 * Description
 * @param {any} "application/json"
 * @param {any} {}
 * @param {any} req
 * @param {any} body
 * @param {any} done
 * @returns {any}
 */
fastify.addContentTypeParser("application/json", {}, (req, body, done) => {
  done(null, body.body);
});

exports.requestHandler = requestHandler;
exports.fastify = fastify;

exports.db = firestore;
exports.functions = functions.region("asia-south1");
exports.cors = cors;

/**
 * Description
 * @param {any} temp
 * @return {any}
 */
exports.generateBase64String = function(temp) {
    return Buffer.from(temp).toString("base64");
};

/**
 * Description
 * @return {any}
 */
exports.setApplication = function() {
    const P1 = firestore.collection("RawData").doc("AppDetails").set({
        CurrentSprintId: 0,
        TotalDevelopmentTask: 0,
        TotalBusinessTask: 0,
        TotalMarketingTask: 0,
        TotalOtherTask: 0,
        TotalNumberOfTask: 0,
        TotalCompletedTask: 0,
        TotalUnCompletedTask: 0,
        TotalNumberOfOrganizations: 0,
        TotalNumberOfPatch: 9,
        TotalNumberOfContributors: 0,
        TotalNumberSchedularOrg: 0,
        MeetCounter: 0,
        MeetWorktezCounter:0,
        PostCounter: 0,
    });
    return Promise.resolve(P1);
};

/**
 * Description
 * @param {any} inputJson
 * @return {any}
 */
exports.updateApplication = function(inputJson) {
    const P1 = firestore.collection("RawData").doc("AppDetails").update(inputJson);
    return Promise.resolve(P1);
};

/**
 * Description
 * @return {any}
 */
exports.getApplicationData = function() {
    const promise = firestore.collection("RawData").doc("AppDetails").get().then((doc) => {
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
 * @param {any} sprintId
 * @return {any}
 */
exports.createSprintName = function(sprintId) {
    if (sprintId == -1) {
        return "Backlog";
    } else if (sprintId == -2) {
        return "Deleted";
    } else {
        return ("S" + sprintId.toString());
    }
};

/**
 * Description
 * @param {any} lastUpdated
 * @return {any}
 */
exports.checkUpdateTime = function(lastUpdated) {
      // const d = new Date();
    // const currentTimeStamp = d.getMilliseconds();
    // for 1 minute difference - 60000
    // for 1 hour difference - 3600000
    // for 1 day difference - 86400000
    const currentTimeStamp = Date.now();
    const diff = currentTimeStamp - lastUpdated;
    console.log(currentTimeStamp, "-", lastUpdated, " = ", diff);
    if (diff >= 60) {
        return currentTimeStamp;
    }
    return 0;
};

const today = new Date();

exports.currentDate = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
exports.currentTime = today.getHours()+"-"+today.getMinutes()+"-"+today.getSeconds();
exports.milliSeconds = today.getMilliseconds();