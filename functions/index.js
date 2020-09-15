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
        var createNewTaskSprintNumber = request.body.data.CreateNewTaskSprintNumber;
        var fullSprintId = createSprintId(createNewTaskSprintNumber);
        var loggedWorkTotalTime = 0;
        var workDone = 0;
        var taskId = "";
        var totalDevelopmentTask;
        var totalBusinessTask;
        var totalMarketingTask;
        var totalNumberOfTask;

        console.log(title);
        console.log(des);
        console.log(priority);
        console.log(difficulty);
        console.log(creator);
        console.log(assignee);
        console.log(estimatedTime);
        console.log(status);
        console.log(category);
        console.log(createNewTaskSprintNumber);
        console.log(storyPointNumber);

        db.collection("Main").doc("RawData").get().then((doc) => {

                totalDevelopmentTask = doc.data().TotalDevelopmentTask + 1;
                totalBusinessTask = doc.data().TotalBusinessTask + 1;
                totalMarketingTask = doc.data().TotalBusinessTask + 1;
                totalNumberOfTask = (totalDevelopmentTask + totalBusinessTask + totalMarketingTask);

                if (category === "Development") {
                    taskId = category[0] + totalDevelopmentTask;
                } else if (category === "Business") {
                    taskId = category[0] + totalBusinessTask;
                } else {
                    taskId = category[0] + totalMarketingTask;
                }

                console.log(taskId);

                var setDataPromise = db.collection(fullSprintId).doc(taskId).set({
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
                    CreateNewTaskSprintNumber: createNewTaskSprintNumber,
                    StoryPointNumber: storyPointNumber
                });
                return Promise.resolve(setDataPromise);
            })
            .then(function(setDataPromise) {
                var updateSetDataPromise = db.collection("Main").doc("RawData").update({
                    TotalDevelopmentTask: totalDevelopmentTask,
                    TotalBusinessTask: totalBusinessTask,
                    TotalMarketingTask: totalMarketingTask,
                    TotalNumberOfTask: totalNumberOfTask

                });
                return Promise.resolve(updateSetDataPromise);
            })
            .then((updateSetDataPromise) => {
                var result = { data: "working" }
                console.log("Document successfully written!");
                return response.status(200).send(result);
            })
            .catch(() => {
                var error = "not Working";
                console.error("Error writing document: ", error);
                return response.status(500).send(error);
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
                var work = { data: "working" }
                console.log("Document successfully written!");
                return response.status(200).send(work);
            })
            .catch(function(error) {
                var error = "not Working";
                console.log("error", error);
                return response.status(500).send(error);
            });
    });
});

function createSprintId(createNewTaskSprintNumber) {
    if (createNewTaskSprintNumber === -1) {
        return "Backlog";
    } else {
        return ("S" + createNewTaskSprintNumber);
    }
}