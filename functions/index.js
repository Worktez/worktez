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
        var createNewTaskSprintNumber = request.body.data.CreateNewTaskSprintNumber;
        var fullSprintId = createSprintId(createNewTaskSprintNumber);
        var loggedWorkTotalTime = 0;
        var workDone = 0;

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

        db.collection(fullSprintId).doc(category).set({
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
                CreateNewTaskSprintNumber: createNewTaskSprintNumber
            })
            .then(() => {
                var work = { data: "working" }
                console.log("Document successfully written!");
                return response.status(200).send(work);
            })
            .catch(() => {
                console.error("Error writing document: ", error);
            });

    });
});

exports.startNewSprint = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);

        var status = request.body.data.Status;
        var startDate = request.body.data.Startdate;
        var endDate = request.body.data.Enddate;
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
                console.log("error", error);
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