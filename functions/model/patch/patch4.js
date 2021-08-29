/* eslint-disable linebreak-style */
/* eslint-disable no-var */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const admin = require("firebase-admin");
const { updatePatchData } = require("./lib");

const db = admin.firestore();

exports.patch4 = function(request, response) {
    const uid = request.body.data.Uid;
    const orgDomain = request.body.data.OrgDomain;
    console.log(uid);
    console.log(orgDomain);

    const promise1 = db.collection("Organizations").doc(orgDomain).collection("Activity").get().then((activities) => {
        activities.forEach((activity) => {
            const updateActivities = db.collection("Organizations").doc(orgDomain).collection("Activity").doc(activity.id).collection("Action").get().then((actions) => {
                actions.forEach((action) => {
                    const updateAction = db.collection("Organizations").doc(orgDomain).collection("Activity").doc(activity.id).collection("Action").doc(action.id).update({
                        Uid: uid,
                    });
                    return Promise.resolve(updateAction);
                });
                return Promise.resolve(updateActivities);
            });
        });
        const Promises = [promise1];
        Promise.all(Promises).then(() => {
            result = { data: "OK! Patch4 executed" };
            updatePatchData("Patch4", { LastUsedByUid: uid, LastUsedByOrg: orgDomain });
            console.log("Counters updated");
            return response.status(200).send(result);
        }).catch(function(error) {
            result = { data: error };
            console.error("Patch error in updating counters", error);
            return response.status(500).send(result);
        });
    });
};