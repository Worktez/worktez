const functions = require('firebase-functions');
var cors = require('cors')({ origin: true });

const admin = require('firebase-admin');

const db = admin.firestore();

exports.deleteTask = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);

        var sprintNumber = request.body.data.SprintNumber;
        var taskId = request.body.data.Id;
        var fullSprintId = createSprintId(sprintNumber);
        var category = request.body.data.Category;
        var status = request.body.data.Status;
        var totalDevelopmentTask;
        var totalBusinessTask;
        var totalMarketingTask;
        var totalOtherTask;
        var totalNumberOfTask;
        var result;
        var totalCompletedTask;
        var totalUnCompletedTask;
        var date = request.body.data.Date;
        var time = request.body.data.Time;
        var totalActions;
        var actionId;

        const p1 = db.collection("Tasks").doc(taskId).update({
            Category: "Trash",
            SprintNumber: -2
        });
        
        const p2 = db.collection("Main").doc(fullSprintId).get().then((doc) => {
            totalNumberOfTask = doc.data().TotalNumberOfTask;
            totalDevelopmentTask = doc.data().TotalDevelopmentTask;
            totalBusinessTask = doc.data().TotalBusinessTask;
            totalMarketingTask = doc.data().TotalMarketingTask;
            totalOtherTask = doc.data().TotalOtherTask
            totalCompletedTask = doc.data().TotalCompletedTask;
            totalUnCompletedTask = doc.data().TotalUnCompletedTask;

            if (category === "Development") {
                totalDevelopmentTask = totalDevelopmentTask - 1;
            } else if (category === "Business") {
                totalBusinessTask = totalBusinessTask - 1;
            } else if (category === "Marketing") {
                totalMarketingTask = totalMarketingTask - 1;
            } else {
                totalOtherTask = totalOtherTask -1;
            }
            totalNumberOfTask = totalNumberOfTask - 1;
            status === "Completed" ? totalCompletedTask = totalCompletedTask - 1 : totalUnCompletedTask = totalUnCompletedTask - 1;
            var updateDeleteTaskCounter = db.collection("Main").doc(fullSprintId).update({
                TotalDevelopmentTask: totalDevelopmentTask,
                TotalBusinessTask: totalBusinessTask,
                TotalMarketingTask: totalMarketingTask,
                TotalOtherTask: totalOtherTask,
                TotalNumberOfTask: totalNumberOfTask,
                TotalCompletedTask: totalCompletedTask,
                TotalUnCompletedTask: totalUnCompletedTask
            });
            return Promise.resolve(updateDeleteTaskCounter);
        });
        updateActivity("DELETED", "Deleted task "+taskId, taskId, date, time);

        const deleteTaskPromises = [p1, p2];
        Promise.all(deleteTaskPromises).then(() => {
                result = { data: "OK" };
                console.log("Document sucessfully deleted");
                return response.status(200).send(result);
            })
            .catch((error) => {
                result = { data: error };
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

async function updateActivity(type, comment, taskId, date, time){
    var actionId = "";
    if(type === "CREATED") {
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
    }
    else if (type === "COMMENT") {
        actionId = await db.collection("Activity").doc(taskId).get().then((doc) => {
            totalActions = doc.data().TotalActions;
            totalActions = totalActions+1;
            totalComments = doc.data().TotalComments;
            totalComments = totalComments+1;
            return ("A" + totalActions);
        });
        if (actionId !== ""){
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
    }
    else{
        actionId = await db.collection("Activity").doc(taskId).get().then((doc) => {
            totalActions = doc.data().TotalActions;
            totalActions = totalActions+1;

            return ("A" + totalActions);

        });
        if (actionId !== ""){
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