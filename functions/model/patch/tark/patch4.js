/* eslint-disable linebreak-style */
/* eslint-disable no-var */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
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

const db = admin.firestore();

exports.patch4 = function(request, response) {
    const uid = request.body.data.Uid;
    const orgDomain = request.body.data.OrgDomain;
    console.log(uid);
    console.log(orgDomain);

    const promise1 = db.collection("Organizations").doc(orgDomain).collection("Activity").get().then((activities) => {
        activities.forEach((activity) => {
            const updateActivities = db.collection("Organizations").doc(orgDomain).collection("Activity").doc(activity.id).collection("Action").get().then((actions) => {
                console.log(activity.id + "Activity Length is " + actions.docs.length);
                if (actions.docs.length > 0) {
                    actions.forEach((action) => {
                        console.log("Action" + action.id + "for Activity" + activity.id);
                        const updateAction = db.collection("Organizations").doc(orgDomain).collection("Activity").doc(activity.id).collection("Action").doc(action.id).update({
                            Uid: uid,
                        });
                        return Promise.resolve(updateAction);
                    });
                }
            });
            return Promise.resolve(updateActivities);
        });
    });
    const Promises = [promise1];
    Promise.all(Promises).then(() => {
        result = { data: "OK! Patch4 executed" };
        console.log("Activities updated");
        return response.status(200).send(result);
    }).catch(function(error) {
        result = { data: error };
        console.error("Patch error in updating Activities", error);
        return response.status(500).send(result);
    });
};