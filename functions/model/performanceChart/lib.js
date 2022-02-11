/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
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

const { db } = require("../application/lib");

exports.setOrganizationsChart = function(orgDomain, teamId, chartName, inputJson) {
    const setChart = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamId).collection("Charts").doc(chartName).set(inputJson);
    return Promise.resolve(setChart);
};

exports.updateChart = function(orgDomain, teamId, chartName, inputJson) {
    const setChart = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamId).collection("Charts").doc(chartName).update(inputJson);
    return Promise.resolve(setChart);
};

exports.getOrganizationsChartDetails = function(orgDomain, teamId, chartName) {
    const getDetailsPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamId).collection("Charts").doc(chartName).get().then((doc) => {
        return doc.data();
    });
    return Promise.resolve(getDetailsPromise);
};

exports.setUserChart = function(orgDomain, uid, inputJson) {
    const setChart = db.collection("Users").doc(uid).collection("PerformanceChart").doc(orgDomain).set(inputJson);
    return Promise.resolve(setChart);
};

exports.getUserPerformanceChart = function(orgDomain, uid) {
    const getUserPerformanceChartPromise = db.collection("Users").doc(uid).collection("PerformanceChart").doc(orgDomain).get().then((doc) => {
        return doc.data();
    });
    return Promise.resolve(getUserPerformanceChartPromise);
};
