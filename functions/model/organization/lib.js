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

const { db } = require("../application/lib");

/**
 * Description
 * @param {any} orgDomain
 * @param {any} orgId
 * @param {any} appKey
 * @param {any} securityPhrase
 * @param {any} orgName
 * @param {any} orgEmail
 * @param {any} orgAdmin
 * @param {any} orgDescription
 * @param {any} orgLogoURL
 * @return {any}
 */
exports.setOrg = function(orgDomain, orgId, appKey, securityPhrase, orgName, orgEmail, orgAdmin, orgDescription, orgLogoURL) {
  const orgData = db.collection("Organizations").doc(orgDomain).set({
    OrganizationId: orgId,
    AppKey: appKey,
    SecurityPhase: securityPhrase,
    OrganizationName: orgName,
    OrganizationDomain: orgDomain,
    OrganizationEmail: orgEmail,
    OrganizationAdmin: orgAdmin,
    OrganizationDescription: orgDescription,
    OrganizationLogoURL: orgLogoURL,
    TeamsId: [],
    TeamsName: [],
    LogoCounter: 0,
    FilesCounter: 0,
  });
  return Promise.resolve(orgData);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} inputJson
 * @return {any}
 */
exports.updateOrg = function(orgDomain, inputJson) {
  const updateTeam = db.collection("Organizations").doc(orgDomain).update(inputJson);
  return Promise.resolve(updateTeam);
};

/**
 * Description
 * @param {any} orgDomain
 * @return {any}
 */
exports.getOrg = function(orgDomain) {
  const getOrgPromise = db.collection("Organizations").doc(orgDomain).get().then((doc) => {
    if (doc.exists) return doc.data();
    else return;
  });
  return Promise.resolve(getOrgPromise);
};

/**
 * Description
 * @param {any} appKey
 * @return {any}
 */
exports.getOrgUseAppKey = function(appKey) {
  const getOrgPromise = db.collection("Organizations").where("AppKey", "==", appKey).get().then((doc) => {
    let data;
    doc.forEach((org) => {
      data = org.data();
    });
    return data;
  });
  return Promise.resolve(getOrgPromise);
};

/**
 * Description
 * @param {any} orgDomain
 * @return {any}
 */
exports.setOrgRawData = function(orgDomain) {
  const setOrgAppDetails = db.collection("Organizations").doc(orgDomain).collection("RawData").doc("AppDetails").set({
    // CurrentSprintId: 0,
    TotalNumberOfTask: 0,
    TotalCompletedTask: 0,
    TotalUnCompletedTask: 0,
    TotalNumberOfOrganizations: -1,
    TotalNumberOfTeams: 0,
    TotalNumberOfMembers: 0,
  });
  return Promise.resolve(setOrgAppDetails);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} orgDomain
 * @return {any}
 */
exports.updateOrgRawData = function(inputJson, orgDomain) {
  const updateOrgAppDetails = db.collection("Organizations").doc(orgDomain).collection("RawData").doc("AppDetails").update(inputJson);
  return Promise.resolve(updateOrgAppDetails);
};

/**
 * Description
 * @param {any} orgDomain
 * @return {any}
 */
exports.getOrgRawData = function(orgDomain) {
  const getOrgAppDetails = db.collection("Organizations").doc(orgDomain).collection("RawData").doc("AppDetails").get().then((doc) => {
    if (doc.exists) {
      return doc.data();
    } else {
      return;
    }
  });
  return Promise.resolve(getOrgAppDetails);
};


/**
 * Description
 * @param {any} orgDomain
 * @param {any} email
 * @param {any} dateOfOnboarding
 * @param {any} dateOfExit
 * @param {any} isAdmin
 * @param {any} teamManager
 * @param {any} teams
 * @return {any}
 */
exports.setOrgMember = function(orgDomain, email, dateOfOnboarding, dateOfExit, isAdmin, teamManager, teams ) {
  const createMember = db.collection("Organizations").doc(orgDomain).collection("Members").doc(email).set({
    Active: true,
    DateOfOnboarding: dateOfOnboarding,
    DateOfExit: dateOfExit,
    IsAdmin: isAdmin,
    TeamManager: teamManager,
    Teams: teams,
    Email: email,
  });
  return Promise.resolve(createMember);
};

/**
 * Description
 * @param {any} orgDomain
 * @param {any} email
 * @return {any}
 */
exports.getOrgMember = function(orgDomain, email) {
  const MemberDetails = db.collection("Organizations").doc(orgDomain).collection("Members").doc(email).get().then((MemberDoc) => {
    return MemberDoc.data();
  });
  return Promise.resolve(MemberDetails);
};

/**
 * Description
 * @param {any} orgDomain
 * @return {any}
 */
exports.getAllMembers = function(orgDomain) {
  const MembersDetails = db.collection("Organizations").doc(orgDomain).collection("Members").where("Active", "==", true).get();
  return Promise.resolve(MembersDetails);
};


/**
 * Description
 * @param {any} inputJson
 * @param {any} orgDomain
 * @param {any} email
 * @return {any}
 */
exports.updateMember = function(inputJson, orgDomain, email) {
  const updateMemberPromise = db.collection("Organizations").doc(orgDomain).collection("Members").doc(email).update(inputJson);
  return Promise.resolve(updateMemberPromise);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} orgDomain
 * @param {any} email
 * @return {any}
 */
exports.getAllOrgs = function() {
  const orgData = [];
  const getPromise = db.collection("Organizations").get().then((orgDoc) => {
    orgDoc.forEach((element) => {
      if (element.exists) {
        orgData.push(element.data());
      }
    });
    return orgData;
  });
  return Promise.resolve(getPromise);
};