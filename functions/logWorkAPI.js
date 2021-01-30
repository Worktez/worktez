const functions = require('firebase-functions');
var cors = require('cors')({ origin: true });

const admin = require('firebase-admin');

const db = admin.firestore();

exports.logWork = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        var status = request.body.data.LogWorkStatus;
        var taskId = request.body.data.LogTaskId;
        var logHours = parseInt(request.body.data.LogHours);
        var workDone = parseInt(request.body.data.LogWorkDone);
        var sprintNumber = parseInt(request.body.data.SprintNumber);
        // var logWorkComment = request.body.data.LogWorkComment;
        var fullSprintId = createSprintId(sprintNumber);
        var logWorkTotalTime;
        var completionDate;
        var today = new Date();

        const promise1 = db.collection("Tasks").doc(taskId).get().then((doc) => {
            logWorkTotalTime = parseInt(doc.data().LogWorkTotalTime);
            logWorkTotalTime = parseInt(logWorkTotalTime) + parseInt(logHours);

            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            var todayDate = dd + "/" + mm + "/" + yyyy;

            if (status === 'Completed') {
                completionDate = todayDate;
            } else {
                completionDate = "Not yet Completed";
            }
            var updatePromise = db.collection("Tasks").doc(taskId).update({
                LogWorkTotalTime: logWorkTotalTime,
                WorkDone: workDone,
                Status: status,
                CompletionDate: completionDate
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
        updateActivity("COMMENT", logWorkComment, taskId, date, time);

        const logWorkPromises = [promise1, promise2, promise3];
        Promise.all(logWorkPromises).then(() => {
                result = { data: "OK" }
                console.log("Document successfully written!");
                return response.status(200).send(result);
            })
            .catch((error) => {
                var result = { data: error };
                console.log("error", error);
                return response.status(500).send(result)
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

async function updateActivity(type, comment, taskId, date, time) {
    var actionId = "";
    if (type === "CREATED") {
        actionId = "A0";
        db.collection("Activity").doc(taskId).set({
            TaskId: taskId,
            TotalActions: 0,
            TotalComments: 0
        });
        db.collection("Activity").doc(taskId).collection("Action").doc(actionId).set({
            Type: type,
            Comment: comment,
            Date: date,
            Time: time
        });
    } else if (type === "COMMENT") {
        actionId = await db.collection("Activity").doc(taskId).get().then((doc) => {
            totalActions = doc.data().TotalActions;
            totalActions = totalActions + 1;
            totalComments = doc.data().TotalComments;
            totalComments = totalComments + 1;
            return ("A" + totalActions);
        });
        if (actionId !== "") {
            db.collection("Activity").doc(taskId).update({
                TotalActions: totalActions,
                TotalComments: totalComments,
            });
            db.collection("Activity").doc(taskId).collection("Action").doc(actionId).set({
                Type: type,
                Comment: comment,
                Date: date,
                Time: time
            });
        }
    } else {
        actionId = await db.collection("Activity").doc(taskId).get().then((doc) => {
            totalActions = doc.data().TotalActions;
            totalActions = totalActions + 1;

            return ("A" + totalActions);

        });
        if (actionId !== "") {
            db.collection("Activity").doc(taskId).update({
                TotalActions: totalActions,
            });
            db.collection("Activity").doc(taskId).collection("Action").doc(actionId).set({
                Type: type,
                Comment: comment,
                Date: date,
                Time: time
            });
        }
    }
}