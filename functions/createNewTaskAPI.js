const functions = require('firebase-functions');
var cors = require('cors')({ origin: true });

const admin = require('firebase-admin');

const db = admin.firestore();

exports.createNewTask = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);
        var title = request.body.data.Title;
        var des = request.body.data.Description;
        var priority = request.body.data.Priority;
        var difficulty = request.body.data.Difficulty;
        var creator = request.body.data.Creator;
        var assignee = request.body.data.Assignee;
        var estimatedTime = parseInt(request.body.data.EstimatedTime);
        var status = request.body.data.Status;
        var category = request.body.data.Category;
        var storyPointNumber = parseInt(request.body.data.StoryPointNumber);
        var sprintNumber = parseInt(request.body.data.SprintNumber);
        var creationDate = request.body.data.CreationDate;
        var time = request.body.data.Time;
        var fullSprintId = createSprintId(sprintNumber);
        var loggedWorkTotalTime = 0;
        var workDone = 0;
        var taskId = "";
        var totalDevelopmentTask;
        var totalBusinessTask;
        var totalOtherTask;
        var totalMarketingTask;
        var totalNumberOfTask;
        var result;
        var totalUnCompletedTask = 0;
        var sprintDataPromise;
        var completionDate = "Not yet Completed";

        const promise1 = db.collection("RawData").doc("AppDetails").get().then((doc) => {
            totalNumberOfTask = doc.data().TotalNumberOfTask;
            totalDevelopmentTask = doc.data().TotalDevelopmentTask;
            totalBusinessTask = doc.data().TotalBusinessTask;
            totalMarketingTask = doc.data().TotalMarketingTask;
            totalOtherTask = doc.data().TotalOtherTask;
            totalUnCompletedTask = doc.data().TotalUnCompletedTask;
            if (category === "Development") {
                totalDevelopmentTask = totalDevelopmentTask + 1;
                taskId = category[0] + totalDevelopmentTask;
            } else if (category === "Business") {
                totalBusinessTask = totalBusinessTask + 1;
                taskId = category[0] + totalBusinessTask;
            } else if (category === "Marketing") {
                totalMarketingTask = totalMarketingTask + 1;
                taskId = category[0] + totalMarketingTask;
            } else {
                totalOtherTask = totalOtherTask + 1;
                taskId = category[0] + totalOtherTask;
            }
            totalUnCompletedTask = totalUnCompletedTask + 1;
            totalNumberOfTask = totalNumberOfTask + 1;
            console.log(taskId);
            const P1 = db.collection("Tasks").doc(taskId).set({
                Id: taskId,
                Title: title,
                Description: des,
                Priority: priority,
                Difficulty: difficulty,
                Creator: creator,
                Assignee: assignee,
                EstimatedTime: estimatedTime,
                Status: status,
                Category: category,
                LogWorkTotalTime: loggedWorkTotalTime,
                WorkDone: workDone,
                SprintNumber: sprintNumber,
                StoryPointNumber: storyPointNumber,
                CreationDate: creationDate,
                CompletionDate: completionDate
            });
            const P2 = db.collection("RawData").doc("AppDetails").update({
                TotalDevelopmentTask: totalDevelopmentTask,
                TotalBusinessTask: totalBusinessTask,
                TotalMarketingTask: totalMarketingTask,
                TotalOtherTask: totalOtherTask,
                TotalNumberOfTask: totalNumberOfTask,
                TotalUnCompletedTask: totalUnCompletedTask
            });
            updateActivity("CREATED", "Created task " + taskId, taskId, creationDate, time);
            const Promises = [P1, P2];
            return Promise.all(Promises);
        });

        const promise2 = db.collection("Main").doc(fullSprintId).get().then((doc) => {
            if (doc.exists) {
                totalNumberOfTask = doc.data().TotalNumberOfTask;
                totalDevelopmentTask = doc.data().TotalDevelopmentTask;
                totalBusinessTask = doc.data().TotalBusinessTask;
                totalOtherTask = doc.data().TotalOtherTask;
                totalMarketingTask = doc.data().TotalMarketingTask;
                totalUnCompletedTask = doc.data().TotalUnCompletedTask;

                if (category === "Development") {
                    totalDevelopmentTask = totalDevelopmentTask + 1;
                } else if (category === "Business") {
                    totalBusinessTask = totalBusinessTask + 1;
                } else if (category === "Marketing") {
                    totalMarketingTask = totalMarketingTask + 1;
                } else {
                    totalOtherTask = totalOtherTask + 1;
                }

                totalNumberOfTask = totalNumberOfTask + 1;
                totalUnCompletedTask = totalUnCompletedTask + 1;


                sprintDataPromise = db.collection("Main").doc(fullSprintId).update({
                    TotalBusinessTask: totalBusinessTask,
                    TotalDevelopmentTask: totalDevelopmentTask,
                    TotalMarketingTask: totalMarketingTask,
                    TotalOtherTask: totalOtherTask,
                    TotalUnCompletedTask: totalUnCompletedTask,
                    TotalNumberOfTask: totalNumberOfTask
                });
            } else {
                totalBusinessTask = 0;
                totalDevelopmentTask = 0;
                totalMarketingTask = 0;
                totalOtherTask = 0;
                totalUnCompletedTask = 0;
                totalCompletedTask = 0;
                totalNumberOfTask = 0;

                if (category === "Development") {
                    totalDevelopmentTask = totalDevelopmentTask + 1;
                } else if (category === "Business") {
                    totalBusinessTask = totalBusinessTask + 1;
                } else if (category === "Marketing") {
                    totalMarketingTask = totalMarketingTask + 1;
                } else {
                    totalOtherTask = totalOtherTask + 1;
                }


                totalNumberOfTask = totalNumberOfTask + 1;
                totalUnCompletedTask = totalUnCompletedTask + 1;

                sprintDataPromise = db.collection("Main").doc(fullSprintId).set({
                    EndDate: "xx/xx/xxxx",
                    StartDate: "xx/xx/xxxx",
                    Status: "Not Started",
                    TotalBusinessTask: totalBusinessTask,
                    TotalDevelopmentTask: totalDevelopmentTask,
                    TotalMarketingTask: totalMarketingTask,
                    TotalOtherTask: totalOtherTask,
                    TotalUnCompletedTask: totalUnCompletedTask,
                    TotalCompletedTask: totalCompletedTask,
                    TotalNumberOfTask: totalNumberOfTask
                });

            }
            return Promise.resolve(sprintDataPromise);
        });

        const newTaskPromises = [promise1, promise2];
        Promise.all(newTaskPromises).then(() => {
                result = { data: "OK!" }
                console.log("Document successfully written!");
                return response.status(200).send(result);
            })
            .catch((error) => {
                result = { data: error };
                console.error("Error writing document: ", error);
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