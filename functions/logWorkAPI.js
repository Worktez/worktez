const functions = require('firebase-functions');
var cors = require('cors')({ origin: true });
var Activity = require("./addActivity");

const admin = require('firebase-admin');

const db = admin.firestore();

exports.logWork = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request.body.data);

        var status = request.body.data.LogWorkStatus;
        var taskId = request.body.data.LogTaskId;
        var logHours = parseInt(request.body.data.LogHours);
        var workDone = parseInt(request.body.data.LogWorkDone);
        var sprintNumber = parseInt(request.body.data.SprintNumber);
        var logWorkComment = request.body.data.LogWorkComment;
        var date = request.body.data.Date;
        var time = request.body.data.Time;
        var fullSprintId = createSprintId(sprintNumber);
        var logWorkTotalTime;
        var totalActions;
        var totalComments;
        var actionId;

        const promise1 = db.collection("Tasks").doc(taskId).get().then((doc) => {
            logWorkTotalTime = parseInt(doc.data().LogWorkTotalTime);
            logWorkTotalTime = parseInt(logWorkTotalTime) + parseInt(logHours);

            var updatePromise = db.collection("Tasks").doc(taskId).update({
                LogWorkTotalTime: logWorkTotalTime,
                WorkDone: workDone,
                Status: status
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
            var updateStatus = db.collection("RawData").doc("AppDetails").update({
                TotalCompletedTask: totalCompletedTask,
                TotalUnCompletedTask: totalUnCompletedTask
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
            var updateSprintstatus = db.collection("Main").doc(fullSprintId).update({
                TotalCompletedTask: totalCompletedTask,
                TotalUnCompletedTask: totalUnCompletedTask
            });
            return Promise.resolve(updateSprintstatus);
        });
        Activity.addActivity("LOGWORK_COMMENT", logWorkComment, taskId, date, time);
        const logWorkPromises = [promise1, promise2, promise3];
        Promise.all(logWorkPromises).then(() => {
                result = { data: "Logged Work successfully!" }
                console.log("Logged Work successfully!");
                return response.status(200).send(result);
            })
            .catch((error) => {
                var result = { data: error };
                console.error("Error Logging Work", error);
                return response.status(500).send(result);
            });
    });
});

function createSprintId(sprintNumber) {
    if (sprintNumber === -1) {
        return "Backlog";
    } else {
        return ("S" + sprintNumber);
    }
}