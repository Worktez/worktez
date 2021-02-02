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

        const status = request.body.data.Status;
        const startDate = request.body.data.StartDate;
        const endDate = request.body.data.EndDate;
        const totalDevelopment = parseInt(request.body.data.TotalDevelopment);
        const totalBusiness = parseInt(request.body.data.TotalBusiness);
        const totalMarketing = parseInt(request.body.data.TotalMarketing);
        const totalOther = parseInt(request.body.data.TotalOther);
        const newSprintId = parseInt(request.body.data.NewSprintId);
        const newSprintIdString = "S" + newSprintId.toString();
        let createSprintPromise;
        let result;

        console.log("End Date from Backend: " + endDate);
        console.log("Start Date from Backend: " + startDate);
        console.log("Status from Backend: " + status);

        const p1 = db.collection("Main").doc(newSprintIdString).get().then((doc) => {
            if (doc.exists) {
                createSprintPromise = db.collection("Main").doc(newSprintIdString).update({
                    TotalDevelopmentTask: totalDevelopment,
                    TotalBusinessTask: totalBusiness,
                    TotalMarketingTask: totalMarketing,
                    TotalOtherTask: totalOther,
                    EndDate: endDate,
                    StartDate: startDate,
                    Status: status,
                });
            } else {
                const totalUnCompletedTask = 0;
                const totalCompletedTask = 0;
                const totalNumberOfTask = 0;

                createSprintPromise = db.collection("Main").doc(newSprintIdString).set({
                    TotalDevelopmentTask: totalDevelopment,
                    TotalBusinessTask: totalBusiness,
                    TotalMarketingTask: totalMarketing,
                    TotalOtherTask: totalOther,
                    EndDate: endDate,
                    StartDate: startDate,
                    Status: status,
                    TotalUnCompletedTask: totalUnCompletedTask,
                    TotalCompletedTask: totalCompletedTask,
                    TotalNumberOfTask: totalNumberOfTask,
                });
            }
            return Promise.resolve(createSprintPromise);
        });
        const p2 = db.collection("RawData").doc("AppDetails").update({
            CurrentSprintId: newSprintId,
        });
        const Promises = [p1, p2];
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
    });
});