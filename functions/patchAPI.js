/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

const admin = require("firebase-admin");

const db = admin.firestore();

exports.patch = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        let a = 1;
        /* const moveTasksPromise = */
        const setSprintNumber = parseInt(request.body.data.SetSprintNumber);
        db.collection("Tasks").where("SprintNumber", "==", setSprintNumber).get().then((task) => {
            console.log("im running");

            let taskID = parseInt(request.body.data.TaskID);
            let completedTask = parseInt(request.body.data.CompletedTask);
            let unCompletedTask = parseInt(request.body.data.UnCompletedTask);
            let totalDevelopmentTasks = parseInt(request.body.data.DevTask);
            let totalBusinessTasks = parseInt(request.body.data.BusinessTask);
            let totalMarketingTasks = parseInt(request.body.data.MarketingTask);
            let totalOtherTasks = parseInt(request.body.data.OtherTask);
            const orgId = request.body.data.OrgID;
            const orgDomain = request.body.data.OrgDomain;

            console.log(task);

            task.forEach((document) => {
                a += 1;
                console.log(a);
                // Old details
                const assignee = document.data().Assignee;
                const category = document.data().Category;
                const completionDate = document.data().CompletionDate;
                const creationDate = document.data().CreationDate;
                const creator = document.data().Creator;
                const description = document.data().Description;
                const difficulty = document.data().Difficulty;
                const estimatedTime = document.data().EstimatedTime;
                const logWorkTotalTime = document.data().LogWorkTotalTime;
                const priority = document.data().Priority;
                const sprintNumber = document.data().SprintNumber;
                const status = document.data().Status;
                const storyPointNumber = document.data().StoryPointNumber;
                const title = document.data().Title;
                const workDone = document.data().WorkDone;

                if (sprintNumber === setSprintNumber) {
                    // let fullSprintName = createSprintId(sprintNumber);

                    // changed details
                    const project = category;
                    const projectId = project.slice(0, 3);
                    taskID = taskID + 1;
                    let newTaskId = "";

                    if (project == "Development") {
                        totalDevelopmentTasks = totalDevelopmentTasks + 1;
                        newTaskId = project.slice(0, 3) + totalDevelopmentTasks;
                    } else if (project == "Business") {
                        totalBusinessTasks = totalBusinessTasks + 1;
                        newTaskId = project.slice(0, 3) + totalBusinessTasks;
                    } else if (project == "Marketing") {
                        totalMarketingTasks = totalMarketingTasks + 1;
                        newTaskId = project.slice(0, 3) + totalMarketingTasks;
                    } else {
                        totalOtherTasks = totalOtherTasks + 1;
                        newTaskId = project.slice(0, 3) + totalOtherTasks;
                    }

                    if (status === "Completed") {
                        completedTask = completedTask + 1;
                    } else {
                        unCompletedTask = unCompletedTask + 1;
                    }

                    console.log(project);
                    console.log(projectId);
                    console.log(newTaskId);


                    db.collection("Organizations").doc(orgDomain).collection("Tasks").doc(newTaskId).set({
                        Id: newTaskId,
                        Assignee: assignee,
                        Project: project,
                        CompletionDate: completionDate,
                        CreationDate: creationDate,
                        Creator: creator,
                        Description: description,
                        Difficulty: difficulty,
                        EstimatedTime: estimatedTime,
                        LogWorkTotalTime: logWorkTotalTime,
                        Priority: priority,
                        SprintNumber: 1,
                        Status: status,
                        StoryPointNumber: storyPointNumber,
                        Title: title,
                        WorkDone: workDone,
                        OrganizationId: orgId,
                        TeamId: projectId,
                    });
                }
            });
            result = {
                totalBusinessTasks: totalBusinessTasks,
                totalDevelopmentTasks: totalDevelopmentTasks,
                totalMarketingTasks: totalMarketingTasks,
                totalOtherTasks: totalOtherTasks,
                numberOfTasks: taskID,
                numberOfCompleted: completedTask,
                numberOfUncompleted: unCompletedTask,
            };
            // response.status(200).send(result);
            return response.send({
                status: 200,
                data: result,
            });
        }).catch(function(error) {
            result = { data: error };
            console.error("Patch error in getting tasks: ", error);
            return response.status(500).send(result);
        });
    });
});
// return Promise.resolve(moveTasksPromise)