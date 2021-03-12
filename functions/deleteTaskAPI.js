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

exports.deleteTask = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request.body.data);

        const sprintNumber = request.body.data.SprintNumber;
        const taskId = request.body.data.Id;
        const fullSprintId = createSprintId(sprintNumber);
        const category = request.body.data.Category;
        const status = request.body.data.Status;
        let totalDevelopmentTask;
        let totalBusinessTask;
        let totalMarketingTask;
        let totalOtherTask;
        let totalNumberOfTask;
        let result;
        let totalCompletedTask;
        let totalUnCompletedTask;
        const date = request.body.data.Date;
        const time = request.body.data.Time;

        const p1 = db.collection("Tasks").doc(taskId).update({
            SprintNumber: -2,
        });

        const p2 = db.collection("Main").doc(fullSprintId).get().then((doc) => {
            totalNumberOfTask = doc.data().TotalNumberOfTask;
            totalDevelopmentTask = doc.data().TotalDevelopmentTask;
            totalBusinessTask = doc.data().TotalBusinessTask;
            totalMarketingTask = doc.data().TotalMarketingTask;
            totalOtherTask = doc.data().TotalOtherTask;
            totalCompletedTask = doc.data().TotalCompletedTask;
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
            status === "Completed" ? totalCompletedTask = totalCompletedTask - 1 : totalUnCompletedTask = totalUnCompletedTask - 1;
            const updateDeleteTaskCounter = db.collection("Main").doc(fullSprintId).update({
                TotalDevelopmentTask: totalDevelopmentTask,
                TotalBusinessTask: totalBusinessTask,
                TotalMarketingTask: totalMarketingTask,
                TotalOtherTask: totalOtherTask,
                TotalNumberOfTask: totalNumberOfTask,
                TotalCompletedTask: totalCompletedTask,
                TotalUnCompletedTask: totalUnCompletedTask,
            });
            return Promise.resolve(updateDeleteTaskCounter);
        });
        Activity.addActivity("DELETED", "Deleted task " + taskId, taskId, date, time);

        const p3 = db.collection("Main").doc("Deleted").get().then((doc) => {
            if (doc.exists) {
                totalNumberOfTask = doc.data().TotalNumberOfTask;
                totalDevelopmentTask = doc.data().TotalDevelopmentTask;
                totalBusinessTask = doc.data().TotalBusinessTask;
                totalMarketingTask = doc.data().TotalMarketingTask;
                totalOtherTask = doc.data().TotalOtherTask;
                totalCompletedTask = doc.data().TotalCompletedTask;
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
                const updateDeleteTaskCounter2 = db.collection("Main").doc("Deleted").update({
                    TotalDevelopmentTask: totalDevelopmentTask,
                    TotalBusinessTask: totalBusinessTask,
                    TotalMarketingTask: totalMarketingTask,
                    TotalOtherTask: totalOtherTask,
                    TotalNumberOfTask: totalNumberOfTask,
                    TotalCompletedTask: totalCompletedTask,
                    TotalUnCompletedTask: totalUnCompletedTask,
                });
                return Promise.resolve(updateDeleteTaskCounter2);
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

                sprintDataPromise = db.collection("Main").doc("Deleted").set({
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
                return Promise.resolve(sprintDataPromise);
            }
        });

        const deleteTaskPromises = [p1, p2, p3];
        Promise.all(deleteTaskPromises).then(() => {
                result = { data: "OK" };
                console.log("Deleted Task Sucessfully");
                return response.status(200).send(result);
            })
            .catch((error) => {
                result = { data: error };
                console.error("Error Deleting Task", error);
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