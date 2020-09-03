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
        var sprintId = request.body.data.SprintId;
        var fullSprintId = checkSprintId();
        var taskIdNumber = getTaskId();
        var taskId = category[0] + taskIdNumber;
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
        console.log(sprintId);

        db.collection(fullSprintId).doc(taskId).set({
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
                SprintId: sprintId
            })
            // eslint-disable-next-line promise/always-return
            .then(() => {
                var work = { data: "working" }
                console.log("Document successfully written!");
                response.status(200).send(work);
            })
            .catch(() => {
                console.error("Error writing document: ", error);
            });

    });
});

function getTaskId() {
    dashboardDataset.forEach(element => {
        if (category == Development) {
            return element.totalDevelopmentTask + 1;
        } else if (category == Business) {
            return element.totalBusinessTask + 1;
        } else {
            return element.totalMarketingTask + 1;
        }
    });
}

function checkSprintId() {
    if (sprintId == -1) {
        return "Backlog";
    } else {
        return "S" + sprintId;
    }
}