const functions = require('firebase-functions');
var cors = require('cors')({ origin: true });

const admin = require('firebase-admin');
admin.initializeApp();

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
        var estimatedTime = request.body.data.EstimatedTime;
        var status = request.body.data.Status;
        var category = request.body.data.Category;
        var storyPointNumber = request.body.data.StoryPointNumber;
        var sprintNumber = request.body.data.SprintNumber;
        var fullSprintId = createSprintId(sprintNumber);
        var loggedWorkTotalTime = 0;
        var workDone = 0;
        var taskId = "";
        var totalDevelopmentTask;
        var totalBusinessTask;
        var totalMarketingTask;
        var totalNumberOfTask;
        var result;
        var totalUnCompletedTask = 0;

        console.log(title);
        console.log(des);
        console.log(priority);
        console.log(difficulty);
        console.log(creator);
        console.log(assignee);
        console.log(estimatedTime);
        console.log(status);
        console.log(category);
        console.log(sprintNumber);
        console.log(storyPointNumber);

        db.collection("Main").doc("RawData").get().then((doc) => {

                totalNumberOfTask = doc.data().TotalNumberOfTask;
                totalDevelopmentTask = doc.data().TotalDevelopmentTask;
                totalBusinessTask = doc.data().TotalBusinessTask;
                totalMarketingTask = doc.data().TotalBusinessTask;
                totalUnCompletedTask = doc.data().TotalUnCompletedTask;

                if (category === "Development") {
                    totalDevelopmentTask = totalDevelopmentTask + 1;
                    taskId = category[0] + totalDevelopmentTask;
                } else if (category === "Business") {
                    totalBusinessTask = totalBusinessTask + 1;
                    taskId = category[0] + totalBusinessTask;
                } else {
                    totalMarketingTask = totalBusinessTask + 1;
                    taskId = category[0] + totalBusinessTask;
                }

                totalUnCompletedTask = totalUnCompletedTask + 1;
                totalNumberOfTask = totalNumberOfTask + 1;
                console.log(taskId);

                var setDataPromise = db.collection(fullSprintId).doc(taskId).set({
                    Id: taskId,
                    Title: title,
                    Description: des,
                    Priority: priority,
                    Difficulty: difficulty,
                    Creator: creator,
                    Assignee: assignee,
                    ET: estimatedTime,
                    Status: status,
                    Category: category,
                    LogWorkTotalTime: loggedWorkTotalTime,
                    WorkDone: workDone,
                    SprintNumber: sprintNumber,
                    StoryPointNumber: storyPointNumber
                });
                return Promise.resolve(setDataPromise);
            })
            .then(function(setDataPromise) {
                var updateSetDataPromise = db.collection("Main").doc("RawData").update({
                    TotalDevelopmentTask: totalDevelopmentTask,
                    TotalBusinessTask: totalBusinessTask,
                    TotalMarketingTask: totalMarketingTask,
                    TotalNumberOfTask: totalNumberOfTask,
                    TotalUnCompletedTask: totalUnCompletedTask
                });
                return Promise.resolve(updateSetDataPromise);
            })
            .then((updateSetDataPromise) => {
                return db.collection("Main").doc(fullSprintId).get().then((doc) => {
                        totalNumberOfTask = doc.data().TotalNumberOfTask;
                        totalDevelopmentTask = doc.data().TotalDevelopmentTask;
                        totalBusinessTask = doc.data().TotalBusinessTask;
                        totalMarketingTask = doc.data().TotalMarketingTask;
                        totalUnCompletedTask = doc.data().TotalUnCompletedTask;

                        if (category === "Development") {
                            totalDevelopmentTask = totalDevelopmentTask + 1;
                        } else if (category === "Business") {
                            totalBusinessTask = totalBusinessTask + 1;
                        } else {
                            totalMarketingTask = totalBusinessTask + 1;
                        }

                        totalNumberOfTask = totalNumberOfTask + 1;
                        totalUnCompletedTask = totalUnCompletedTask + 1;

                        var setSprintDataPromise = db.collection("Main").doc(fullSprintId).update({
                            TotalBusinessTask: totalBusinessTask,
                            TotalDevelopmentTask: totalDevelopmentTask,
                            TotalMarketingTask: totalMarketingTask,
                            TotalUnCompletedTask: totalUnCompletedTask,
                            TotalNumberOfTask: totalNumberOfTask
                        });
                        return Promise.resolve(setSprintDataPromise);
                    })
                    .then((setSprintDataPromise) => {
                        result = { data: "OK" };
                        console.log("Document sucessfully written");
                        return response.status(200).send(result);
                    })
                    .catch((error) => {
                        result = { data: error };
                        console.log("error", error);
                        return response.status(500).send(result);
                    });
            })
            .catch((error) => {
                result = { data: error };
                console.error("Error writing document: ", error);
                return result;
            });
    });
});

exports.startNewSprint = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);

        var status = request.body.data.Status;
        var startDate = request.body.data.StartDate;
        var endDate = request.body.data.EndDate;
        var newSprintId;
        var result;

        console.log("End Date from Backend: " + endDate);
        console.log("Start Date from Backend: " + startDate);
        console.log("Status from Backend: " + status);

        db.collection("Main").doc("RawData").get()
            .then(function(doc) {
                newSprintId = doc.data().CurrentSprintId + 1;
                var newSprintIdString = "S" + newSprintId.toString();

                var setNewSprintPromise = db.collection("Main").doc(newSprintIdString).update({
                    EndDate: endDate,
                    StartDate: startDate,
                    Status: status
                });
                return Promise.resolve(setNewSprintPromise);
            })
            .then(function(setNewSprintPromise) {
                var setNewSprintCounterPromise = db.collection("Main").doc("RawData").update({
                    CurrentSprintId: newSprintId
                });
                return Promise.resolve(setNewSprintCounterPromise);
            })
            .then(function(setNewSprintCounterPromise) {
                console.log("Sprint started successfully");
                result = { data: "OK" }
                console.log("Document successfully written!");
                return response.status(200).send(result);
            })
            .catch(function(error) {
                result = { data: error }
                console.log("error", error);
                return response.status(500).send(result);
            });
    });
});
exports.logWork = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);

        var status = request.body.data.LogWorkStatus;
        var taskId = request.body.data.LogTaskId;
        var logWorkHour = request.body.data.LogWorkHour;
        var workDone = request.body.data.LogWorkDone;
        var sprintNumber = request.body.data.SprintNumber;
        var fullSprintId = createSprintId(sprintNumber);
        var logWorkTotalTime;
        console.log(status);
        console.log(taskId);
        console.log(logWorkHour);
        console.log(workDone);
        console.log(sprintNumber);
        console.log(fullSprintId);

        db.collection(fullSprintId).doc(taskId).get().then(function(doc) {
                logWorkTotalTime = doc.data().LogWorkTotalTime;
                logWorkTotalTime = parseInt(logWorkTotalTime) + parseInt(logWorkHour);

                var updatePromise = db.collection(fullSprintId).doc(taskId).update({
                    LogWorkTotalTime: logWorkTotalTime,
                    WorkDone: workDone,
                    Status: status
                });
                return Promise.resolve(updatePromise);
            })
            .then(function(updatePromise) {
                var result = { data: "ok" };
                return response.status(200).send(result);
            })
            .catch(function(error) {
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