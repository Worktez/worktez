/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { db } = require("../application/lib");

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
        LogoCounter: 0,
    });
    return Promise.resolve(orgData);
};

exports.updateOrg = function(orgDomain, inputJson) {
    const updateTeam = db.collection("Organizations").doc(orgDomain).update(inputJson);
    return Promise.resolve(updateTeam);
};

exports.getOrg = function(orgDomain) {
    const getOrgPromise = db.collection("Organizations").doc(orgDomain).get().then((doc) => {
        if (doc.exists) return doc.data();
        else return;
    });
    return Promise.resolve(getOrgPromise);
};

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

exports.setOrgRawData = function(orgDomain) {
    const setOrgAppDetails = db.collection("Organizations").doc(orgDomain).collection("RawData").doc("AppDetails").set({
        CurrentSprintId: 0,
        TotalNumberOfTask: 0,
        TotalCompletedTask: 0,
        TotalUnCompletedTask: 0,
        TotalNumberOfOrganizations: -1,
    });
    return Promise.resolve(setOrgAppDetails);
};

exports.updateOrgRawData = function(inputJson, orgDomain) {
    const updateOrgAppDetails = db.collection("Organizations").doc(orgDomain).collection("RawData").doc("AppDetails").update(inputJson);
    return Promise.resolve(updateOrgAppDetails);
};

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