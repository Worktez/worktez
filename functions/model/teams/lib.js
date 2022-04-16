/* eslint-disable valid-jsdoc */
/* eslint-disable linebreak-style */
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

/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { db } = require("../application/lib");

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamName
 * @param {any} teamDescription
 * @param {any} teamAdmin
 * @param {any} teamManagerEmail
 * @param {any} teamMembers
 * @param {any} scope
 * @param {any} type
 * @param {any} statusLabels
 * @param {any} priorityLabels
 * @param {any} difficultyLabels
 * @param {any} orgId
 * @param {any} teamId
 * @param {any} teamStatus
 * @return {any}
 */
exports.setTeam = function(orgDomain, teamName, teamDescription, teamAdmin, teamManagerEmail, teamMembers, scope, type, statusLabels, priorityLabels, difficultyLabels, orgId, teamId, teamStatus) {
    const setTeam = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).set({
        TeamName: teamName,
        TeamDescription: teamDescription,
        TeamAdmin: teamAdmin,
        TeamManagerEmail: teamManagerEmail,
        TeamMembers: teamMembers,
        Type: type,
        StatusLabels: statusLabels,
        PriorityLabels: priorityLabels,
        DifficultyLabels: difficultyLabels,
        TotalTeamTasks: 0,
        OrganizationId: orgId,
        TeamId: teamId,
        TeamStatus: teamStatus,
        CurrentSprintId: 0,
        LabelCounters: 0,
        Scope: scope,
        ProjectLink: string = "",
    });
    return Promise.resolve(setTeam);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamName
 * @param {any} docId
 * @param {any} displayName
 * @param {any} scope
 * @param {any} iconName
 * @param {any} colorCode
 * @param {any} status
 * @return {any}
 */
 exports.setLabelProperties = function(orgDomain, teamName, docId, displayName, scope, iconName, colorCode) {
    const setLabelProperties = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).collection("LabelProperties").doc(docId).set({
        DisplayName: displayName,
        Scope: scope,
        IconName: iconName,
        ColorCode: colorCode,
        Status: "OK",
        Id: docId,
    });
    return Promise.resolve(setLabelProperties);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} orgDomain
 * @param {any} teamName
 * @return {any}
 */
exports.updateTeamDetails = function(inputJson, orgDomain, teamName) {
    const updateTeam = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).update(inputJson);
    return Promise.resolve(updateTeam);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamName
 * @return {any}
 */
exports.getTeam = function(orgDomain, teamName) {
    const getTeamPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).get().then((doc) => {
        if (doc.exists) return doc.data();
        else return;
    });
    return Promise.resolve(getTeamPromise);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamId
 * @return {any}
 */
exports.getTeamUseTeamId = function(orgDomain, teamId) {
    const getTeamPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").where("TeamId", "==", teamId).get().then((doc) => {
        let data;
        doc.forEach((team) => {
            data = team.data();
        });
        return data;
    });
    return Promise.resolve(getTeamPromise);
};

/**
 * Description
 * @param {any} updateLabelToJson
 * @param {any} teamName
 * @param {any} orgDomain
 * @param {any} scope
 * @param {any} docId
 * @return {any}
 */
 exports.deleteScopeLabel = function(updateLabelToJson, orgDomain, teamName, scope, docId) {
    const deleteLabelPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).collection("LabelProperties").doc(docId).where("Id", "==", docId).update(updateLabelToJson);
    return Promise.resolve(deleteLabelPromise);
};

/**
 * Description
 * @param {any} teamName
 * @param {any} orgDomain
 * @param {any} scope
 * @param {any} docId
 * @param {any} displayName
 * @param {any} iconName
 * @param {any} colorCode
 * @return {any}
 */
exports.addTeamLabel=function(orgDomain, teamName, scope, docId, displayName, iconName, colorCode) {
    const addTeamLabelPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).collection("LabelProperties").doc(docId).set({
        DisplayName: displayName,
        Scope: scope,
        IconName: iconName,
        ColorCode: colorCode,
        Status: "OK",
        Id: docId,
    });
    return Promise.resolve(addTeamLabelPromise);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} teamName
 * @param {any} orgDomain
 * @param {any} docId
 * @return {any}
 */
 exports.updateLabel = function(inputJson, orgDomain, teamName, docId) {
    const editLabelPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).collection("LabelProperties").doc(docId).update(inputJson);
    return Promise.resolve(editLabelPromise);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamName
 * @param {any} docId
 * @return {any}
 */
 exports.getLabelById = function(orgDomain, teamName, docId) {
     console.log(orgDomain, teamName, docId);
    const getLabelByIdPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).collection("LabelProperties").doc(docId).get().then((doc) => {
        const data = doc.data();
        return data;
    });
    return Promise.resolve(getLabelByIdPromise);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamName
 * @param {any} scope
 * @return {any}
 */
 exports.getLabelInScope = function(orgDomain, teamName, scope) {
    const getTeamPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).collection("LabelProperties").where("Scope", "==", scope).where("Status", "==", "OK").get().then((doc) => {
        const data = [];
        doc.forEach((team) => {
            data.push(team.data());
        });
        return data;
    });
    return Promise.resolve(getTeamPromise);
};

