/* eslint-disable object-curly-spacing */
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

exports.createNewTask = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request.body.data);
        const title = request.body.data.Title;
        const des = request.body.data.Description;
        const priority = request.body.data.Priority;
        const difficulty = request.body.data.Difficulty;
        const creator = request.body.data.Creator;
        const assignee = request.body.data.Assignee;
        const estimatedTime = parseInt(request.body.data.EstimatedTime);
        const status = request.body.data.Status;
        const category = request.body.data.Category;
        const storyPointNumber = parseInt(request.body.data.StoryPointNumber);
        const sprintNumber = parseInt(request.body.data.SprintNumber);
        const creationDate = request.body.data.CreationDate;
        const time = request.body.data.Time;
        const fullSprintId = createSprintId(sprintNumber);
        const loggedWorkTotalTime = 0;
        const workDone = 0;
        let taskId = "";
        let totalDevelopmentTask;
        let totalBusinessTask;
        let totalOtherTask;
        let totalMarketingTask;
        let totalNumberOfTask;
        let result;
        let totalUnCompletedTask = 0;
        let totalCompletedTask = 0;
        let sprintDataPromise;
        let currentSprintId = 0;
        const completiondate = "Not yet Completed";

        // eslint-disable-next-line prefer-const
        let promises = [];

        const promise1 = db.collection("RawData").doc("AppDetails").get().then((doc) => {
            if (doc.exists) {
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
                const p1 = db.collection("Tasks").doc(taskId).set({
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
                    CompletionDate: completiondate,
                });

                const p2 = db.collection("RawData").doc("AppDetails").update({
                    TotalDevelopmentTask: totalDevelopmentTask,
                    TotalBusinessTask: totalBusinessTask,
                    TotalMarketingTask: totalMarketingTask,
                    TotalOtherTask: totalOtherTask,
                    TotalNumberOfTask: totalNumberOfTask,
                    TotalUnCompletedTask: totalUnCompletedTask,
                });

                promises.push(p1);
                promises.push(p2);
            } else {
                totalNumberOfTask = 0;
                totalDevelopmentTask = 0;
                totalBusinessTask = 0;
                totalMarketingTask = 0;
                totalOtherTask = 0;
                totalUnCompletedTask = 0;
                currentSprintId = 0;

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
                const p1 = db.collection("Tasks").doc(taskId).set({
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
                    CompletionDate: completiondate,
                });

                const p2 = db.collection("RawData").doc("AppDetails").set({
                    TotalDevelopmentTask: totalDevelopmentTask,
                    TotalBusinessTask: totalBusinessTask,
                    TotalMarketingTask: totalMarketingTask,
                    TotalOtherTask: totalOtherTask,
                    TotalNumberOfTask: totalNumberOfTask,
                    TotalUnCompletedTask: totalUnCompletedTask,
                    CurrentSprintId: currentSprintId,
                });

                promises.push(p1);
                promises.push(p2);
            }

            Activity.addActivity("CREATED", "Created task " + taskId, taskId, creationDate, time);

            return Promise.all(promises);
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
                    TotalNumberOfTask: totalNumberOfTask,
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
                    TotalNumberOfTask: totalNumberOfTask,
                });
            }
            return Promise.resolve(sprintDataPromise);
        });

        const newTaskPromises = [promise1, promise2];
        Promise.all(newTaskPromises).then(() => {
                result = { data: "OK!" };
                console.log("Task Created Successfully");
                return response.status(200).send(result);
            })
            .catch((error) => {
                result = { data: error };
                console.error("Error Creating Task: ", error);
                return response.status(500).send(result);
            });
    });
});

function createSprintId(sprintNumber) {
    if (sprintNumber === -1) {
        return "Backlog";
    } else if (sprintNumber === -2) {
        return "Deleted";
    } else {
        return ("S" + sprintNumber);
    }
}