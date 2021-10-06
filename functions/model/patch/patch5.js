/* eslint-disable linebreak-style */
/* eslint-disable no-var */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

// const admin = require("firebase-admin");
// const { updatePatchData } = require("./lib");
const { getOrg } = require("../organization/lib");
const { getAllUsers, updateUser, setMyOrgCollection } = require("../users/lib");

exports.patch5 = function(request, response) {
    const orgDomain = request.body.data.OrgDomain;

    let status = 200;

    const promise1 = getOrg(orgDomain).then((orgData) => {
        const updateUsersPromise = getAllUsers().then((users) => {
            if (users.docs.length > 0) {
                users.forEach((userDoc) => {
                    userData = userDoc.data();

                    const userUpdateInputJson = {
                        SelectedOrgAppKey: userData.AppKey,
                        SelectedTeamId: userData.TeamId,
                    };
                    updateUser(userUpdateInputJson, userData.uid);

                    if (userData.AppKey != "") {
                        teams = [userData.TeamId];
                        setMyOrgCollection(userData.uid, orgData.OrganizationDomain, userData.AppKey, teams, userData.TeamId);
                    }
                });
            }
        });
        return Promise.resolve(updateUsersPromise);
    }).catch((err) => {
        status = 500;
        console.error("Error : " + err);
    });

    const Promises = [promise1];
    Promise.all(Promises).then(() => {
        result = { data: "OK! Patch5 executed" };
        return response.status(status).send(result);
    }).catch(function(error) {
        result = { data: error };
        console.error("Patch5 error", error);
        return response.status(status).send(result);
    });
};