const functions = require('firebase-functions');
var cors = require('cors')({ origin: true });
var Activity = require("./addActivity");

const admin = require('firebase-admin');

const db = admin.firestore();

exports.editPageTask = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request.body.data);

        var description = request.body.data.Description;
        var priority = request.body.data.Priority;
        var difficulty = request.body.data.Difficulty;
        var assignee = request.body.data.Assignee;
        var estimatedTime = request.body.data.EstimatedTime;
        var category = request.body.data.Category;
        var storyPointNumber = request.body.data.StoryPointNumber;
        var editedSprintNumber = request.body.data.SprintNumber;
        var previousId = request.body.data.PreviousId;
        var creationDate = request.body.data.CreationDate;
        var changedData = request.body.data.ChangedData;
        var previousSprintId = createSprintId(previousId);
        var taskId = request.body.data.Id;
        var editedSprintId = createSprintId(editedSprintNumber);
        var totalDevelopmentTask;
        var totalBusinessTask;
        var totalMarketingTask;
        var totalOtherTask;
        var totalNumberOfTask;
        var result;
        var totalUnCompletedTask;
        var totalCompletedTask;
        var sprintEditPromise;
        var date = request.body.data.Date;
        var time = request.body.data.Time;
        var type = "EDITED";
        var comment = "Edited task details: ";

        var promises = [];
        if (editedSprintNumber !== previousId) {
            comment += "Moved to sprint " + editedSprintId + ". ";
            const p1 = db.collection("Main").doc(previousSprintId).get().then((doc) => {
                totalNumberOfTask = doc.data().TotalNumberOfTask;
                totalDevelopmentTask = doc.data().TotalDevelopmentTask;
                totalBusinessTask = doc.data().TotalBusinessTask;
                totalMarketingTask = doc.data().TotalMarketingTask;
                totalOtherTask = doc.data().TotalOtherTask;
                totalUnCompletedTask = doc.data().TotalUnCompletedTask;

                if (category === "Development") {
                    totalDevelopmentTask = totalDevelopmentTask - 1;
                } else if (category === "Business") {
                    totalBusinessTask = totalBusinessTask - 1;
                } else if (category === "Marketing") {
                    totalMarketingTask = totalMarketingTask - 1;
                } else {
                    totalOtherTask = totalOtherTask - 1;
                }

                totalNumberOfTask = totalNumberOfTask - 1;
                totalUnCompletedTask = totalUnCompletedTask - 1;
                var editSprintDeleteCounter = db.collection("Main").doc(previousSprintId).update({
                    TotalDevelopmentTask: totalDevelopmentTask,
                    TotalBusinessTask: totalBusinessTask,
                    TotalMarketingTask: totalMarketingTask,
                    TotalOtherTask: totalOtherTask,
                    TotalNumberOfTask: totalNumberOfTask,
                    TotalUnCompletedTask: totalUnCompletedTask
                });

                return Promise.resolve(editSprintDeleteCounter);
            });
            promises.push(p1);

            const p2 = db.collection("Main").doc(editedSprintId).get().then((doc) => {
                if (doc.exists) {
                    totalNumberOfTask = doc.data().TotalNumberOfTask;
                    totalDevelopmentTask = doc.data().TotalDevelopmentTask;
                    totalBusinessTask = doc.data().TotalBusinessTask;
                    totalMarketingTask = doc.data().TotalMarketingTask;
                    totalOtherTask = doc.data().TotalOtherTask;
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

                    sprintEditPromise = db.collection("Main").doc(editedSprintId).update({
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
                    sprintEditPromise = db.collection("Main").doc(editedSprintId).set({
                        TotalBusinessTask: totalBusinessTask,
                        TotalDevelopmentTask: totalDevelopmentTask,
                        TotalMarketingTask: totalMarketingTask,
                        TotalOtherTask: totalOtherTask,
                        TotalUnCompletedTask: totalUnCompletedTask,
                        TotalCompletedTask: totalCompletedTask,
                        TotalNumberOfTask: totalNumberOfTask
                    });
                }
                return Promise.resolve(sprintEditPromise)
            });
            promises.push(p2);
        }

        var p3 = db.collection("Tasks").doc(taskId).update({
            Description: description,
            CreationDate: creationDate,
            Priority: priority,
            Difficulty: difficulty,
            Assignee: assignee,
            EstimatedTime: estimatedTime,
            SprintNumber: editedSprintNumber,
            StoryPointNumber: storyPointNumber
        });
        promises.push(p3);
        comment = comment + changedData;
        Activity.addActivity("EDITED", comment, taskId, date, time);

        Promise.all(promises).then(() => {
                result = { data: "OK" };
                console.log("Edited Task Successfully");
                return response.status(200).send(result);
            })
            .catch((error) => {
                result = { data: error };
                console.error("Error Editing Task", error);
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