/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const Activity = require("./addActivity");

const admin = require("firebase-admin");

const db = admin.firestore();

exports.deleteTask = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request.body.data);

        const appKey = request.body.data.AppKey;
        const sprintNumber = request.body.data.SprintNumber;
        const taskId = request.body.data.Id;
        const fullSprintId = createSprintId(sprintNumber);
        const status = request.body.data.Status;
        let totalNumberOfTask;
        let result;
        let totalCompletedTask;
        let totalUnCompletedTask;
        const date = request.body.data.Date;
        const time = request.body.data.Time;

        const deleteTaskPromise = db.collection("Organizations").where("AppKey", "==", appKey).get().then((org) => {
            org.forEach((doc) => {
                documentID = doc.data().OrganizationDomain;
            });

            console.log("DocumentID = " + documentID);


            const p1 = db.collection("Organizations").doc(documentID).collection("Tasks").doc(taskId).update({
                SprintNumber: -2,
            });

            const p2 = db.collection("Organizations").doc(documentID).collection("Sprints").doc(fullSprintId).get().then((doc) => {
                totalNumberOfTask = doc.data().TotalNumberOfTask;
                totalCompletedTask = doc.data().TotalCompletedTask;
                totalUnCompletedTask = doc.data().TotalUnCompletedTask;

                totalNumberOfTask = totalNumberOfTask - 1;
                status === "Completed" ? totalCompletedTask = totalCompletedTask - 1 : totalUnCompletedTask = totalUnCompletedTask - 1;
                const updateDeleteTaskCounter = db.collection("Organizations").doc(documentID).collection("Sprints").doc(fullSprintId).update({
                    TotalNumberOfTask: totalNumberOfTask,
                    TotalCompletedTask: totalCompletedTask,
                    TotalUnCompletedTask: totalUnCompletedTask,
                });
                return Promise.resolve(updateDeleteTaskCounter);
            });
            Activity.addActivity("DELETED", "Deleted task " + taskId, taskId, date, time, documentID);

            const deleteTaskPromises = [p1, p2];
            Promise.all(deleteTaskPromises).then(() => {
                    result = { data: "OK" };
                    console.log("Deleted Task Sucessfully");
                    return response.status(200).send(result);
                })
                .catch((error) => {
                    result = { data: error };
                    console.error("Error Deleting Task", error);
                    return response.status(500).send(result);
                });
        });
        return Promise.resolve(deleteTaskPromise);
    });
});

function createSprintId(sprintNumber) {
    if (sprintNumber === -1) {
        return "Backlog";
    } else if ((sprintNumber === -2)) {
        return "Deleted";
    } else {
        return ("S" + sprintNumber);
    }
}