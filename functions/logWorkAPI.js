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

exports.logWork = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request.body.data);

        const status = request.body.data.LogWorkStatus;
        const taskId = request.body.data.LogTaskId;
        const logHours = parseInt(request.body.data.LogHours);
        const workDone = parseInt(request.body.data.LogWorkDone);
        const sprintNumber = parseInt(request.body.data.SprintNumber);
        const logWorkComment = request.body.data.LogWorkComment;
        const date = request.body.data.Date;
        const time = request.body.data.Time;
        const fullSprintId = createSprintId(sprintNumber);
        let logWorkTotalTime;
        let completiondate = "Not yet Completed";
        const today = new Date();

        const promise1 = db.collection("Tasks").doc(taskId).get().then((doc) => {
            logWorkTotalTime = parseInt(doc.data().LogWorkTotalTime);
            logWorkTotalTime = parseInt(logWorkTotalTime) + parseInt(logHours);

            if (status === "Completed") {
                const dd = String(today.getDate()).padStart(2, "0");
                const mm = String(today.getMonth() + 1).padStart(2, "0");
                const yyyy = today.getFullYear();

                const todayDate = dd + "/" + mm + "/" + yyyy;

                completiondate = todayDate;
            }


            const updatePromise = db.collection("Tasks").doc(taskId).update({
                LogWorkTotalTime: logWorkTotalTime,
                WorkDone: workDone,
                Status: status,
                CompletionDate: completiondate,
            });
            return Promise.resolve(updatePromise);
        });
        const promise2 = db.collection("RawData").doc("AppDetails").get().then((doc) => {
            totalCompletedTask = parseInt(doc.data().TotalCompletedTask);
            totalUnCompletedTask = parseInt(doc.data().TotalUnCompletedTask);
            if (status === "Completed") {
                totalCompletedTask = totalCompletedTask + 1;
                totalUnCompletedTask = totalUnCompletedTask - 1;
            }
            const updateStatus = db.collection("RawData").doc("AppDetails").update({
                TotalCompletedTask: totalCompletedTask,
                TotalUnCompletedTask: totalUnCompletedTask,
            });
            return Promise.resolve(updateStatus);
        });
        const promise3 = db.collection("Main").doc(fullSprintId).get().then((doc) => {
            totalCompletedTask = parseInt(doc.data().TotalCompletedTask);
            totalUnCompletedTask = parseInt(doc.data().TotalUnCompletedTask);

            if (status === "Completed") {
                totalCompletedTask = totalCompletedTask + 1;
                totalUnCompletedTask = totalUnCompletedTask - 1;
            }
            const updateSprintstatus = db.collection("Main").doc(fullSprintId).update({
                TotalCompletedTask: totalCompletedTask,
                TotalUnCompletedTask: totalUnCompletedTask,
            });
            return Promise.resolve(updateSprintstatus);
        });
        Activity.addActivity("LOGWORK_COMMENT", logWorkComment, taskId, date, time);
        const logWorkPromises = [promise1, promise2, promise3];
        Promise.all(logWorkPromises).then(() => {
                result = { data: "Logged Work successfully!" };
                console.log("Logged Work successfully!");
                return response.status(200).send(result);
            })
            .catch((error) => {
                const result = { data: error };
                console.error("Error Logging Work", error);
                return response.status(500).send(result);
            });
    });
});

function createSprintId(sprintNumber) {
    if (sprintNumber === -1) {
        return "Backlog";
    } else if (sprintNumber === -2) {
        return "Trash";
    } else {
        return ("S" + sprintNumber);
    }
}