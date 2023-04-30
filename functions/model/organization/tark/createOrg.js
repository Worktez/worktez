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

const { functions, getApplicationData, updateApplication, generateBase64String, basicSubscription } = require("../../application/lib");
const { setOrg, getOrg, getOrgRawData, setOrgRawData, updateOrgRawData } = require("../lib");
const { setMyOrgCollection, getMyOrgCollectionDoc, getUser, updateUser } = require("../../users/lib");
const { setSchedularUnit } = require("../../scheduledFunctions/tark/setSchedular");
const { addSubscription } = require("../../subscriptions/tark/addSubscription");
const { createMember } = require("../tark/createMember");
const admin = require("firebase-admin");

exports.createOrg = functions.https.onRequest((request, response) => {
  const data = request.body.data;
  const date = new Date();
  const orgId = generateBase64String(date.toString() + date.getMilliseconds().toString());
  const appKey = generateBase64String(date.getMilliseconds() + orgId);
  const subscriptionData = basicSubscription;
  const organizationName = data.OrganizationName;
  const orgDomain = data.OrganizationDomain;
  const orgEmail = data.OrganizationEmail;
  const orgAdmin = data.OrganizationAdmin;
  const orgAdminUid = data.OrganizationAdminUid;
  const orgDescription = data.OrganizationDescription;
  const orgLogoURL = data.OrganizationLogoURL;
  const securityPhrase = generateBase64String(orgId + appKey + organizationName + date.getMilliseconds() + date.getDay());

  let status = 200;

  const promise1 = getOrg(orgDomain).then((orgDoc) => {
    if (orgDoc == undefined) {
      setOrg(orgDomain, orgId, appKey, securityPhrase, organizationName, orgEmail, orgAdmin, orgDescription, orgLogoURL);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  const promise2 = getOrgRawData(orgDomain).then((orgRawData) => {
    if (orgRawData == undefined) {
      setOrgRawData(orgDomain);

      const p2 = getApplicationData().then((appData) => {
        const totalNumberOfOrganizations = appData.TotalNumberOfOrganizations;

        const appDetailsUpdateJson = {
          TotalNumberOfOrganizations: totalNumberOfOrganizations + 1,
          OrgDomains: admin.firestore.FieldValue.arrayUnion(orgDomain),
        };

        updateApplication(appDetailsUpdateJson);
        updateOrgRawData(appDetailsUpdateJson, orgDomain);
      }).catch((error) => {
        status = 500;
        console.log("Error:", error);
      });

      return Promise.resolve(p2);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  const promise3 = getMyOrgCollectionDoc(orgAdminUid, orgDomain).then((orgDoc) => {
    if (orgDoc == undefined) {
      setMyOrgCollection(orgAdminUid, orgDomain, appKey);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  const promise4 = getUser(orgAdminUid, "").then((userDoc) => {
    const selectedAppKey = appKey;
    const userUpdateJson = {
      SelectedOrgAppKey: selectedAppKey,
    };
    updateUser(userUpdateJson, orgAdminUid);
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  const promise5 =addSubscription(appKey, orgAdminUid, subscriptionData, orgDomain).then(() => {
    return;
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  const schedularInput = {
    SelectedOrgAppKey: appKey,
  };
  const createMemberInput = {
    orgDomain: orgDomain,
    email: orgAdmin,
    isAdmin: true,
    teamManager: true,
    teams: [],
  };

  setSchedularUnit(schedularInput, orgId);
  createMember(createMemberInput);
  let result;
  const promises = [promise1, promise2, promise3, promise4, promise5];
  return Promise.all(promises).then(() => {
    const arr = ["Created Organization Successfully", appKey, orgId];
    result = { data: arr };
    console.log("Created Organization Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = { data: error };
        console.error("Error Creating Organization", error);
        return response.status(status).send(result);
      });
});