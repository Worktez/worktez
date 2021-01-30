const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const createNewTaskAPI = require('./createNewTaskAPI');
const startNewSprintAPI = require('./startNewSprintAPI');
const logWorkAPI = require('./logWorkAPI');
const editPageTaskAPI = require('./editPageTaskAPI');
const deleteTaskAPI = require('./deleteTaskAPI');
const createNewUserAPI = require('./createNewUserAPI');
const updateSprintStatusAPI = require('./updateSprintStatusAPI');

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

exports.startNewSprint = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);

        var status = request.body.data.Status;
        var startDate = request.body.data.StartDate;
        var endDate = request.body.data.EndDate;
        var totalDevelopment = parseInt(request.body.data.TotalDevelopment);
        var totalBusiness = parseInt(request.body.data.TotalBusiness);
        var totalMarketing = parseInt(request.body.data.TotalMarketing);
        var totalOther = parseInt(request.body.data.TotalOther);
        var newSprintId = parseInt(request.body.data.NewSprintId);
        var newSprintIdString = "S" + newSprintId.toString();
        var createSprintPromise;
        var result;

        console.log("End Date from Backend: " + endDate);
        console.log("Start Date from Backend: " + startDate);
        console.log("Status from Backend: " + status);

        const p1 = db.collection("Main").doc(newSprintIdString).get().then((doc) => {
            if (doc.exists) {
                createSprintPromise = db.collection("Main").doc(newSprintIdString).update({
                    TotalDevelopmentTask: totalDevelopment,
                    TotalBusinessTask: totalBusiness,
                    TotalMarketingTask: totalMarketing,
                    TotalOtherTask: totalOther,
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
                    TotalOtherTask: totalOther,
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
        const p2 = db.collection("RawData").doc("AppDetails").update({
            CurrentSprintId: newSprintId
        });
        const Promises = [p1, p2];
        return Promise.all(Promises).then(() => {
                console.log("Sprint started successfully");
                result = { data: "OK" }
                console.log("Document successfully written!");
                return response.status(200).send(result);
            })
            .catch((error) => {
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
        var completionDate;
        var today = new Date();

        const promise1 = db.collection("Tasks").doc(taskId).get().then((doc) => {
            logWorkTotalTime = parseInt(doc.data().LogWorkTotalTime);
            logWorkTotalTime = parseInt(logWorkTotalTime) + parseInt(logHours);

            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            var todayDate = dd + "/" + mm + "/" + yyyy;

            if (status === 'Completed') {
                completionDate = todayDate;
            } else {
                completionDate = "Not yet Completed";
            }
            var updatePromise = db.collection("Tasks").doc(taskId).update({
                LogWorkTotalTime: logWorkTotalTime,
                WorkDone: workDone,
                Status: status,
                CompletionDate: completionDate
            });
            return Promise.resolve(updatePromise);
        });
        const promise2 = db.collection("RawData").doc("AppDetails").get().then((doc) => {
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
        const promise3 = db.collection("Main").doc(fullSprintId).get().then((doc) => {
            totalCompletedTask = parseInt(doc.data().TotalCompletedTask);
            totalUnCompletedTask = parseInt(doc.data().TotalUnCompletedTask);

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
        const logWorkPromises = [promise1, promise2, promise3];
        Promise.all(logWorkPromises).then(() => {
                result = { data: "OK" }
                console.log("Document successfully written!");
                return response.status(200).send(result);
            })
            .catch((error) => {
                var result = { data: error };
                console.log("error", error);
                return response.status(500).send(result)
            });
    });
});

exports.editPageTask = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);

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

        var promises = [];
        if (editedSprintNumber !== previousId) {
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
        var status = request.body.data.Status;
        var totalDevelopmentTask;
        var totalBusinessTask;
        var totalMarketingTask;
        var totalOtherTask;
        var totalNumberOfTask;
        var result;
        var totalCompletedTask;
        var totalUnCompletedTask;

        const p1 = db.collection("Tasks").doc(taskId).update({
            Category: "Trash",
            SprintNumber: -2
        });

        const p2 = db.collection("Main").doc(fullSprintId).get().then((doc) => {
            totalNumberOfTask = doc.data().TotalNumberOfTask;
            totalDevelopmentTask = doc.data().TotalDevelopmentTask;
            totalBusinessTask = doc.data().TotalBusinessTask;
            totalMarketingTask = doc.data().TotalMarketingTask;
            totalOtherTask = doc.data().TotalOtherTask
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
            var updateDeleteTaskCounter = db.collection("Main").doc(fullSprintId).update({
                TotalDevelopmentTask: totalDevelopmentTask,
                TotalBusinessTask: totalBusinessTask,
                TotalMarketingTask: totalMarketingTask,
                TotalOtherTask: totalOtherTask,
                TotalNumberOfTask: totalNumberOfTask,
                TotalCompletedTask: totalCompletedTask,
                TotalUnCompletedTask: totalUnCompletedTask
            });
            return Promise.resolve(updateDeleteTaskCounter);
        });
        const deleteTaskPromises = [p1, p2];
        Promise.all(deleteTaskPromises).then(() => {
                result = { data: "OK" };
                console.log("Document sucessfully deleted");
                return response.status(200).send(result);
            })
            .catch((error) => {
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
exports.createNewUser = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);
        const user = request.body.data;
        const Uid = user.uid;
        const PhotoURL = user.photoURL;
        const DisplayName = user.displayName;
        const Email = user.email;
        const PhoneNumber = user.phoneNumber;
        const ProviderId = user.providerId;

        db.collection("Users").doc(Uid).get().then((doc) => {
                if (doc.exists) {
                    const userData = db.collection("Users").doc(Uid).update({
                        uid: Uid,
                        photoURL: PhotoURL,
                        displayName: DisplayName,
                        email: Email,
                        phoneNumber: PhoneNumber,
                        providerId: ProviderId
                    });
                    return Promise.resolve(userData);
                } else {
                    const userData = db.collection("Users").doc(Uid).set({
                        uid: Uid,
                        photoURL: PhotoURL,
                        displayName: DisplayName,
                        email: Email,
                        phoneNumber: PhoneNumber,
                        providerId: ProviderId
                    });
                    return Promise.resolve(userData);
                }
            }).then(() => {
                result = { data: "User Logged In Successfully" };
                console.log("Document successfully written");
                return response.status(200).send(result);
            })
            .catch((error) => {
                result = { data: error };
                console.log("error", error);
                return response.status(500).send(result)
            });
    });
});

exports.updateSprintStatus = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        var sprintStatus = request.body.data.SprintStatus;
        var currentSprintName = request.body.data.CurrentSprintName;
        console.log(currentSprintName);
        db.collection("Main").doc(currentSprintName).update({
            Status: sprintStatus,
        });
    });
})

exports.addCompletionDatePatch = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);
        var completionDate = request.body.data.CompletionDate;
        var id;
        var result;
        var p1 = db.collection("Tasks").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                id = doc.data().Id;
                console.log(id);
                db.collection("Tasks").doc(id).update({
                        CompletionDate: completionDate
                    }).then(() => {
                        result = { data: "It has worked!" }
                        console.log("Document successfully written!");
                        return response.status(200).send(result);
                    })
                    .catch(function(error) {
                        result = { data: error };
                        console.error("Error writing document: ", error);
                        return response.status(500).send(result)
                    });
            });
            return Promise.resolve(p1);
        });
    });
})
exports.createNewTask = createNewTaskAPI.createNewTask;
exports.startNewSprint = startNewSprintAPI.startNewSprint;
exports.logWork = logWorkAPI.logWork;
exports.editPageTask = editPageTaskAPI.editPageTask;
exports.deleteTask = deleteTaskAPI.deleteTask;
exports.createNewUser = createNewUserAPI.createNewUser;
exports.updateSprintStatus = updateSprintStatusAPI.updateSprintStatus;
