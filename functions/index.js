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

exports.createNewSprint = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);
        var title = request.body.data.Title;
        var des = request.body.data.Description;
        var status = request.body.data.Status;
        var totalDevelopmentTask = request.body.data.development;
        var totalBusinessTask = request.body.data.business;
        var totalMarketingTask = request.body.data.marketing;
        var lastSprintId = 1;
        var newSprintId = lastSprintId + 1;
        var currentSprintId = "S" + newSprintId;
        var totalTask = totalDevelopmentTask + totalBusinessTask + totalMarketingTask;
        document.getElementById("SprintNo").innerHTML = currentSprintId;
        var date = new Date();
        var startDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        var endDate = (date.getDate() + 14) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

        console.log(title);
        console.log(des);
        console.log(endDate);
        console.log(startDate);
        console.log(totalDevelopmentTask);
        console.log(totalBusinessTask);
        console.log(totalMarketingTask);
        console.log(status);
        console.log(totalTask);

        db.collection("Main").doc("RawData").set({
                development: totalDevelopmentTask,
                business: totalDevelopmentTask,
                marketing: totalMarketingTask,
                Totaltask: totalTask
            })
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

function getIdNumber() {
    var today = new Date();
    var date = String(String(today.getFullYear()) + (today.getMonth() + 1)) + today.getDate();
    var time = String(String(today.getHours()) + today.getMinutes()) + today.getSeconds();

    var result = date + time;

    return result;
}

// function fetchRawData() {
//     dataset.forEach((element) => {
//         const development = dataset.filter(element => element.category == "Development");
//         console.log(development.length);
//         document.getElementById("totalDevelopmentTask").innerHTML = development.length;

//         const business = dataset.filter(element => element.category == "Business");
//         console.log(business.length);
//         document.getElementById("totalBusinessTask").innerHTML = business.length;

//         const marketing = dataset.filter(element => element.category == "Marketing");
//         console.log(marketing.length);
//         document.getElementById("totalMarketingTask").innerHTML = marketing.length;
//     });
// }
function createSprintId(createNewTaskSprintNumber) {
    if (createNewTaskSprintNumber === -1) {
        return "Backlog";
    } else {
        return ("S" + createNewTaskSprintNumber);
    }
}