const functions = require('firebase-functions');
var cors = require('cors')({ origin: true });

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// class Task {
//     constructor(id, title, status, priority, estimatedTime, difficulty, description, creator, category, assignee, logWorkTotalTime, workDone, creationDate, sprintNumber, storyPointNumber) {
//         this.Id = id;
//         this.Title = title;
//         this.Status = status;
//         this.Priority = priority;
//         this.EstimatedTime = estimatedTime;
//         this.Difficulty = difficulty;
//         this.Description = description;
//         this.Creator = creator;
//         this.Category = category;
//         this.Assignee = assignee;
//         this.LogWorkTotalTime = logWorkTotalTime;
//         this.WorkDone = workDone;
//         this.CreationDate = creationDate;
//         this.SprintNumber = sprintNumber;
//         this.StoryPointNumber = storyPointNumber;
//     }
// }


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
        var sprintDataPromise;

        db.collection("RawData").doc("AppDetails").get().then((doc) => {

                totalNumberOfTask = doc.data().TotalNumberOfTask;
                totalDevelopmentTask = doc.data().TotalDevelopmentTask;
                totalBusinessTask = doc.data().TotalBusinessTask;
                totalMarketingTask = doc.data().TotalMarketingTask;
                totalUnCompletedTask = doc.data().TotalUnCompletedTask;

                if (category === "Development") {
                    totalDevelopmentTask = totalDevelopmentTask + 1;
                    taskId = category[0] + totalDevelopmentTask;
                } else if (category === "Business") {
                    totalBusinessTask = totalBusinessTask + 1;
                    taskId = category[0] + totalBusinessTask;
                } else {
                    totalMarketingTask = totalMarketingTask + 1;
                    taskId = category[0] + totalMarketingTask;
                }

                totalUnCompletedTask = totalUnCompletedTask + 1;
                totalNumberOfTask = totalNumberOfTask + 1;
                console.log(taskId);

                var setDataPromise = db.collection("Tasks").doc(taskId).set({
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
                    CreationDate: creationDate
                });
                return Promise.resolve(setDataPromise);
            })
            .then(function(setDataPromise) {
                var updateSetDataPromise = db.collection("RawData").doc("AppDetails").update({
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
                        if (doc.exists) {
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
                                totalMarketingTask = totalMarketingTask + 1;
                            }

                            totalNumberOfTask = totalNumberOfTask + 1;
                            totalUnCompletedTask = totalUnCompletedTask + 1;


                            sprintDataPromise = db.collection("Main").doc(fullSprintId).update({
                                TotalBusinessTask: totalBusinessTask,
                                TotalDevelopmentTask: totalDevelopmentTask,
                                TotalMarketingTask: totalMarketingTask,
                                TotalUnCompletedTask: totalUnCompletedTask,
                                TotalNumberOfTask: totalNumberOfTask
                            });
                        } else {
                            totalBusinessTask = 0;
                            totalDevelopmentTask = 0;
                            totalMarketingTask = 0;
                            totalUnCompletedTask = 0;
                            totalCompletedTask = 0;
                            totalNumberOfTask = 0;

                            if (category === "Development") {
                                totalDevelopmentTask = totalDevelopmentTask + 1;
                            } else if (category === "Business") {
                                totalBusinessTask = totalBusinessTask + 1;
                            } else {
                                totalMarketingTask = totalMarketingTask + 1;
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
                                TotalUnCompletedTask: totalUnCompletedTask,
                                TotalCompletedTask: totalCompletedTask,
                                TotalNumberOfTask: totalNumberOfTask
                            });

                        }
                        return Promise.resolve(sprintDataPromise);
                    })
                    .then((sprintDataPromise) => {
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
        var totalDevelopment = parseInt(request.body.data.TotalDevelopment);
        var totalBusiness = parseInt(request.body.data.TotalBusiness);
        var totalMarketing = parseInt(request.body.data.TotalMarketing);
        var newSprintId;
        var createSprintPromise;
        var result;

        console.log("End Date from Backend: " + endDate);
        console.log("Start Date from Backend: " + startDate);
        console.log("Status from Backend: " + status);

        db.collection("RawData").doc("AppDetails").get()
            .then(function(doc) {
                newSprintId = parseInt(doc.data().CurrentSprintId) + 1;
                var newSprintIdString = "S" + newSprintId.toString();

                return db.collection("Main").doc(newSprintIdString).get().then((doc) => {
                    if (doc.exists) {
                        createSprintPromise = db.collection("Main").doc(newSprintIdString).update({
                            TotalDevelopmentTask: totalDevelopment,
                            TotalBusinessTask: totalBusiness,
                            TotalMarketingTask: totalMarketing,
                            EndDate: endDate,
                            StartDate: startDate,
                            Status: status
                        });
                    } else {
                        var totalUnCompletedTask = 0;
                        var totalCompletedTask = 0;
                        var totalNumberOfTask = 0;

                        createSprintPromise = db.collection("Main").doc(newSprintIdString).set({
                            TotalDevelopmentTask: totalDevelopment,
                            TotalBusinessTask: totalBusiness,
                            TotalMarketingTask: totalMarketing,
                            EndDate: endDate,
                            StartDate: startDate,
                            Status: status,
                            TotalUnCompletedTask: totalUnCompletedTask,
                            TotalCompletedTask: totalCompletedTask,
                            TotalNumberOfTask: totalNumberOfTask
                        });
                    }
                    return Promise.resolve(createSprintPromise);
                });
            })
            .then(function(createSprintPromise) {
                var setNewSprintCounterPromise = db.collection("RawData").doc("AppDetails").update({
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
        var status = request.body.data.LogWorkStatus;
        var taskId = request.body.data.LogTaskId;
        var logHours = parseInt(request.body.data.LogHours);
        var workDone = parseInt(request.body.data.LogWorkDone);
        var sprintNumber = parseInt(request.body.data.SprintNumber);
        // var logWorkComment = request.body.data.LogWorkComment;
        var fullSprintId = createSprintId(sprintNumber);
        var logWorkTotalTime;

        db.collection("Tasks").doc(taskId).get().then(function(doc) {
                logWorkTotalTime = parseInt(doc.data().LogWorkTotalTime);
                logWorkTotalTime = parseInt(logWorkTotalTime) + parseInt(logHours);

                var updatePromise = db.collection("Tasks").doc(taskId).update({
                    LogWorkTotalTime: logWorkTotalTime,
                    WorkDone: workDone,
                    Status: status
                });
                return Promise.resolve(updatePromise);
            })
            .then(function(updatePromise) {
                return db.collection("RawData").doc("AppDetails").get().then(function(doc) {
                    totalCompletedTask = parseInt(doc.data().TotalCompletedTask);
                    totalUnCompletedTask = parseInt(doc.data().TotalUnCompletedTask);
                    if (status === "Completed") {
                        totalCompletedTask = totalCompletedTask + 1;
                        totalUnCompletedTask = totalUnCompletedTask - 1;
                    }
                    var updateStatus = db.collection("RawData").doc("AppDetails").update({
                        TotalCompletedTask: totalCompletedTask,
                        TotalUnCompletedTask: totalUnCompletedTask
                    });
                    return Promise.resolve(updateStatus);
                });
            })
            .then(function(updatePromise) {
                return db.collection("Main").doc(fullSprintId).get().then(function(doc) {
                    totalCompletedTask = doc.data().TotalCompletedTask;
                    totalUnCompletedTask = doc.data().TotalUnCompletedTask;

                    if (status === "Completed") {
                        totalCompletedTask = totalCompletedTask + 1;
                        totalUnCompletedTask = totalUnCompletedTask - 1;
                    }
                    var updateSprintstatus = db.collection("Main").doc(fullSprintId).update({
                        TotalCompletedTask: totalCompletedTask,
                        TotalUnCompletedTask: totalUnCompletedTask
                    });
                    return Promise.resolve(updateSprintstatus);
                });
            })
            .then(function(updateSprintstatus) {
                result = { data: "OK" }
                console.log("Document successfully written!");
                return response.status(200).send(result);
            })
            .catch(function(error) {
                var result = { data: error };
                console.log("error", error);
                return response.status(500).send(result)
            });
    });
});

exports.editPageTask = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);

        var des = request.body.data.Description;
        var priority = request.body.data.Priority;
        var difficulty = request.body.data.Difficulty;
        var assignee = request.body.data.Assignee;
        var estimatedTime = request.body.data.EstimatedTime;
        var status = request.body.data.Status;
        var category = request.body.data.Category;
        var storyPointNumber = request.body.data.StoryPointNumber;
        var sprintNumber = request.body.data.SprintNumber;
        var previousId = request.body.data.PreviousId;
        var previousSprintId = createSprintId(previousId);
        var taskId = request.body.data.Id;
        var fullSprintId = createSprintId(sprintNumber);
        var totalDevelopmentTask;
        var totalBusinessTask;
        var totalMarketingTask;
        var totalNumberOfTask;
        var result;
        var totalUnCompletedTask;
        var totalCompletedTask;
        var sprintEditPromise;

        const p1 = db.collection("Main").doc(previousSprintId).get().then((doc) => {
            totalNumberOfTask = doc.data().TotalNumberOfTask;
            totalDevelopmentTask = doc.data().TotalDevelopmentTask;
            totalBusinessTask = doc.data().TotalBusinessTask;
            totalMarketingTask = doc.data().TotalMarketingTask;
            totalUnCompletedTask = doc.data().TotalUnCompletedTask;

            if (category === "Development") {
                totalDevelopmentTask = totalDevelopmentTask - 1;
            } else if (category === "Business") {
                totalBusinessTask = totalBusinessTask - 1;
            } else {
                totalMarketingTask = totalMarketingTask - 1;
            }

            totalNumberOfTask = totalNumberOfTask - 1;
            totalUnCompletedTask = totalUnCompletedTask - 1;

            var editSprintDeleteCounter = db.collection("Main").doc(previousSprintId).update({
                TotalDevelopmentTask: totalDevelopmentTask,
                TotalBusinessTask: totalBusinessTask,
                TotalMarketingTask: totalMarketingTask,
                TotalNumberOfTask: totalNumberOfTask,
                TotalUnCompletedTask: totalUnCompletedTask
            });

            return Promise.resolve(editSprintDeleteCounter);
        });

        const p2 = db.collection("Main").doc(fullSprintId).get().then((doc) => {
            if (doc.exists) {
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
                    totalMarketingTask = totalMarketingTask + 1;
                }

                totalNumberOfTask = totalNumberOfTask + 1;
                totalUnCompletedTask = totalUnCompletedTask + 1;


                sprintEditPromise = db.collection("Main").doc(fullSprintId).update({
                    TotalBusinessTask: totalBusinessTask,
                    TotalDevelopmentTask: totalDevelopmentTask,
                    TotalMarketingTask: totalMarketingTask,
                    TotalUnCompletedTask: totalUnCompletedTask,
                    TotalNumberOfTask: totalNumberOfTask
                });
            } else {
                totalBusinessTask = 0;
                totalDevelopmentTask = 0;
                totalMarketingTask = 0;
                totalUnCompletedTask = 0;
                totalCompletedTask = 0;
                totalNumberOfTask = 0;

                if (category === "Development") {
                    totalDevelopmentTask = totalDevelopmentTask + 1;
                } else if (category === "Business") {
                    totalBusinessTask = totalBusinessTask + 1;
                } else {
                    totalMarketingTask = totalMarketingTask + 1;
                }

                totalNumberOfTask = totalNumberOfTask + 1;
                totalUnCompletedTask = totalUnCompletedTask + 1;

                sprintEditPromise = db.collection("Main").doc(fullSprintId).set({
                    TotalBusinessTask: totalBusinessTask,
                    TotalDevelopmentTask: totalDevelopmentTask,
                    TotalMarketingTask: totalMarketingTask,
                    TotalUnCompletedTask: totalUnCompletedTask,
                    TotalCompletedTask: totalCompletedTask,
                    TotalNumberOfTask: totalNumberOfTask
                });
            }

            return Promise.resolve(sprintEditPromise)
        });

        const p3 = db.collection("Tasks").doc(taskId).update({
            Id: taskId,
            Description: des,
            Priority: priority,
            Difficulty: difficulty,
            Assignee: assignee,
            EstimatedTime: estimatedTime,
            Status: status,
            Category: category,
            SprintNumber: sprintNumber,
            StoryPointNumber: storyPointNumber
        });

        var promises = [p1, p2, p3];

        Promise.all(promises).then(() => {
                result = { data: "OK" };
                console.log("Document sucessfully written");
                return response.status(200).send(result);
            })
            .catch((error) => {
                result = { data: error };
                console.log("error", error);
                return response.status(500).send(result)
            });
    });
});

exports.deleteTask = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);

        var sprintNumber = request.body.data.SprintNumber;
        var taskId = request.body.data.Id;
        var fullSprintId = createSprintId(sprintNumber);
        var category = request.body.data.Category;
        var totalDevelopmentTask;
        var totalBusinessTask;
        var totalMarketingTask;
        var totalNumberOfTask;
        var result;
        var totalUnCompletedTask;

        db.collection("Tasks").doc(taskId).delete()
            .then(() => {
                return db.collection("RawData").doc("AppDetails").get().then((doc) => {
                    totalNumberOfTask = doc.data().TotalNumberOfTask;
                    totalDevelopmentTask = doc.data().TotalDevelopmentTask;
                    totalBusinessTask = doc.data().TotalBusinessTask;
                    totalMarketingTask = doc.data().TotalMarketingTask;
                    totalUnCompletedTask = doc.data().TotalUnCompletedTask;

                    if (category === "Development") {
                        totalDevelopmentTask = totalDevelopmentTask - 1;
                    } else if (category === "Business") {
                        totalBusinessTask = totalBusinessTask - 1;
                    } else {
                        totalMarketingTask = totalMarketingTask - 1;
                    }

                    totalUnCompletedTask = totalUnCompletedTask - 1;
                    totalNumberOfTask = totalNumberOfTask - 1;

                    var updateDeleteCounter = db.collection("Main").doc("RawData").update({
                        TotalDevelopmentTask: totalDevelopmentTask,
                        TotalBusinessTask: totalBusinessTask,
                        TotalMarketingTask: totalMarketingTask,
                        TotalNumberOfTask: totalNumberOfTask,
                        TotalUnCompletedTask: totalUnCompletedTask
                    });
                    return Promise.resolve(updateDeleteCounter);
                });
            })
            .then(function(updateDeleteCounter) {
                return db.collection("Main").doc(fullSprintId).get().then(function(doc) {
                    totalNumberOfTask = doc.data().TotalNumberOfTask;
                    totalDevelopmentTask = doc.data().TotalDevelopmentTask;
                    totalBusinessTask = doc.data().TotalBusinessTask;
                    totalMarketingTask = doc.data().TotalMarketingTask;
                    totalUnCompletedTask = doc.data().TotalUnCompletedTask;

                    if (category === "Development") {
                        totalDevelopmentTask = totalDevelopmentTask - 1;
                    } else if (category === "Business") {
                        totalBusinessTask = totalBusinessTask - 1;
                    } else {
                        totalMarketingTask = totalMarketingTask - 1;
                    }

                    totalUnCompletedTask = totalUnCompletedTask - 1;
                    totalNumberOfTask = totalNumberOfTask - 1;

                    var updateDeleteTaskCounter = db.collection("Main").doc(fullSprintId).update({
                        TotalDevelopmentTask: totalDevelopmentTask,
                        TotalBusinessTask: totalBusinessTask,
                        TotalMarketingTask: totalMarketingTask,
                        TotalNumberOfTask: totalNumberOfTask,
                        TotalUnCompletedTask: totalUnCompletedTask
                    });
                    return Promise.resolve(updateDeleteTaskCounter);
                });
            })
            .then((updateDeleteTaskCounter) => {
                result = { data: "OK" };
                console.log("Document sucessfully deleted");
                return response.status(200).send(result);
            })
            .catch(function(error) {
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