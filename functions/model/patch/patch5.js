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
const { getAllUsers, updateUser } = require("../users/lib");
const { generateBase64String } = require("../application/lib");

exports.patch5 = function(request, response) {
    const orgDomain = request.body.data.OrgDomain;
    const key = request.body.data.Key;
    let value = request.body.data.Value;

    let status = 200;

    const promise1 = getOrg(orgDomain).then((orgData) => {
        const updateUsersPromise = getAllUsers().then((users) => {
            if (users.docs.length > 0) {
                users.forEach((userDoc) => {
                    userData = userDoc.data();

                    const userUpdateInputJson = {};

                    if (value == "Random") {
                        const date = new Date();
                        value = generateBase64String(date.getMilliseconds() + "Random");
                    }

                    userUpdateInputJson[key] = value;
                    updateUser(userUpdateInputJson, userData.uid);
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