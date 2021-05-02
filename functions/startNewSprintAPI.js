/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

const admin = require("firebase-admin");

const db = admin.firestore();

exports.startNewSprint = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request.body.data);

        const appKey = request.body.data.AppKey;
        const status = request.body.data.Status;
        const startDate = request.body.data.StartDate;
        const endDate = request.body.data.EndDate;
        const newSprintId = parseInt(request.body.data.NewSprintId);
        const newSprintIdString = "S" + newSprintId.toString();
        let createSprintPromise;
        let result;
        let orgDomain;
        let orgId;

        console.log("App key from Backend: " + appKey);
        console.log("End Date from Backend: " + endDate);
        console.log("Start Date from Backend: " + startDate);
        console.log("Status from Backend: " + status);

        const startSprintPromise = db.collection("Organizations").where("AppKey", "==", appKey).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    orgDomain = doc.data().OrganizationDomain;
                    orgId = doc.data().OrganizationId;
                });
                const p1 = db.collection("Organizations").doc(orgDomain).collection("Sprints").doc(newSprintIdString).get().then((doc) => {
                    if (doc.exists) {
                        createSprintPromise = db.collection("Organizations").doc(orgDomain).collection("Sprints").doc(newSprintIdString).update({
                            EndDate: endDate,
                            StartDate: startDate,
                            Status: status,
                            OrganizationId: orgId,
                        });
                    } else {
                        const totalUnCompletedTask = 0;
                        const totalCompletedTask = 0;
                        const totalNumberOfTask = 0;

                        createSprintPromise = db.collection("Organizations").doc(orgDomain).collection("Sprints").doc(newSprintIdString).set({
                            EndDate: endDate,
                            StartDate: startDate,
                            Status: status,
                            TotalUnCompletedTask: totalUnCompletedTask,
                            TotalCompletedTask: totalCompletedTask,
                            TotalNumberOfTask: totalNumberOfTask,
                            OrganizationId: orgId,
                        });
                    }
                    return Promise.resolve(createSprintPromise);
                });

                const p2 = db.collection("Organizations").doc(orgDomain).collection("Teams").get().then((teamCol) => {
                    teamCol.forEach((teamDoc) => {
                        const teamSprintPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamDoc.id).collection("Sprints").doc(newSprintIdString).get().then((teamSprint) => {
                            if (!teamSprint.exists) {
                                const createTeamSprint = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamDoc.id).collection("Sprints").doc(newSprintIdString).set({
                                    OrganizationId: orgId,
                                    TeamId: teamId,
                                    SprintNumber: newSprintId,
                                    TotalCompletedTask: 0,
                                    TotalNumberOfTask: 0,
                                    TotalUnCompletedTask: 0,
                                });
                                return Promise.resolve(createTeamSprint);
                            }
                        });
                        return Promise.resolve(teamSprintPromise);
                    });
                });

                const p3 = db.collection("Organizations").doc(orgDomain).collection("RawData").doc("AppDetails").update({
                    CurrentSprintId: newSprintId,
                });
                const Promises = [p1, p2, p3];
                return Promise.all(Promises).then(() => {
                        console.log("Sprint started successfully");
                        result = { data: "OK" };
                        return response.status(200).send(result);
                    })
                    .catch((error) => {
                        result = { data: error };
                        console.error("Error Starting Sprint", error);
                        return response.status(500).send(result);
                    });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        return Promise.resolve(startSprintPromise);
    });
});