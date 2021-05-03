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
        const appKey = request.body.data.AppKey;
        const title = request.body.data.Title;
        const des = request.body.data.Description;
        const priority = request.body.data.Priority;
        const difficulty = request.body.data.Difficulty;
        const creator = request.body.data.Creator;
        const assignee = request.body.data.Assignee;
        const estimatedTime = parseInt(request.body.data.EstimatedTime);
        const status = request.body.data.Status;
        const project = request.body.data.Project;
        const storyPointNumber = parseInt(request.body.data.StoryPointNumber);
        const sprintNumber = parseInt(request.body.data.SprintNumber);
        const creationDate = request.body.data.CreationDate;
        const teamId = request.body.data.TeamId;
        const time = request.body.data.Time;
        const fullSprintId = createSprintId(sprintNumber);
        const loggedWorkTotalTime = 0;
        const workDone = 0;
        let taskId = "";
        let totalNumberOfTask;
        let result;
        let totalUnCompletedTask = 0;
        // const currentSprintId = 0;
        const completiondate = "Not yet Completed";
        let orgDocument;
        let orgId;

        const createTaskPromise = db.collection("Organizations").where("AppKey", "==", appKey).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    orgDocument = doc.data().OrganizationDomain;
                    orgId = doc.data().OrganizationId;
                });
                console.log("orgDocument = " + orgDocument);
                console.log("Project = " + project);

                const promise1 = db.collection("Organizations").doc(orgDocument).collection("Teams").doc(project).get().then((doc) => {
                    const totalTeamTasks = doc.data().TotalTeamTasks + 1;
                    taskId = teamId.toString() + totalTeamTasks.toString();

                    const p1 = db.collection("Organizations").doc(orgDocument).collection("Teams").doc(project).update({
                        TotalTeamTasks: totalTeamTasks,
                    });
                    const p2 = db.collection("Organizations").doc(orgDocument).collection("Tasks").doc(taskId).set({
                        Id: taskId,
                        Title: title,
                        Description: des,
                        Priority: priority,
                        Difficulty: difficulty,
                        Creator: creator,
                        Assignee: assignee,
                        EstimatedTime: estimatedTime,
                        Status: status,
                        Project: project,
                        LogWorkTotalTime: loggedWorkTotalTime,
                        WorkDone: workDone,
                        SprintNumber: sprintNumber,
                        StoryPointNumber: storyPointNumber,
                        CreationDate: creationDate,
                        CompletionDate: completiondate,
                        OrganizationId: orgId,
                        TeamId: teamId,
                    });

                    Activity.addActivity("CREATED", "Created task " + taskId, taskId, creationDate, time, orgDocument);

                    const promises1 = [p1, p2];
                    return Promise.all(promises1);
                });

                const promise2 = db.collection("Organizations").doc(orgDocument).collection("RawData").doc("AppDetails").get().then((doc) => {
                    if (doc.exists) {
                        totalNumberOfTask = doc.data().TotalNumberOfTask;
                        totalUnCompletedTask = doc.data().TotalUnCompletedTask;
                        totalUnCompletedTask = totalUnCompletedTask + 1;
                        totalNumberOfTask = totalNumberOfTask + 1;

                        const p1 = db.collection("Organizations").doc(orgDocument).collection("RawData").doc("AppDetails").update({
                            TotalNumberOfTask: totalNumberOfTask,
                            TotalUnCompletedTask: totalUnCompletedTask,
                        });
                        return Promise.resolve(p1);
                    }
                });

                // const promise3 = db.collection("Organizations").doc(orgDocument).collection("Sprints").doc(fullSprintId).get().then((doc) => {
                //     if (doc.exists) {
                //         totalNumberOfTask = doc.data().TotalNumberOfTask;
                //         totalUnCompletedTask = doc.data().TotalUnCompletedTask;
                //         totalNumberOfTask = totalNumberOfTask + 1;
                //         totalUnCompletedTask = totalUnCompletedTask + 1;

                //         sprintDataPromise = db.collection("Organizations").doc(orgDocument).collection("Sprints").doc(fullSprintId).update({
                //             TotalUnCompletedTask: totalUnCompletedTask,
                //             TotalNumberOfTask: totalNumberOfTask,
                //             OrganizationId: orgId,
                //         });
                //     } else {
                //         totalUnCompletedTask = 0;
                //         totalCompletedTask = 0;
                //         totalNumberOfTask = 0;

                //         totalNumberOfTask = totalNumberOfTask + 1;
                //         totalUnCompletedTask = totalUnCompletedTask + 1;

                //         sprintDataPromise = db.collection("Organizations").doc(orgDocument).collection("Sprints").doc(fullSprintId).set({
                //             EndDate: "xx/xx/xxxx",
                //             StartDate: "xx/xx/xxxx",
                //             Status: "Not Started",
                //             TotalUnCompletedTask: totalUnCompletedTask,
                //             TotalCompletedTask: totalCompletedTask,
                //             TotalNumberOfTask: totalNumberOfTask,
                //             OrganizationId: orgId,
                //         });
                //     }
                //     return Promise.resolve(sprintDataPromise);
                // });

                const promise3 = db.collection("Organizations").doc(orgDocument).collection("Teams").doc(project).collection("Sprints").doc(fullSprintId).get().then((teamSprint) => {
                    if (teamSprint.exists) {
                        let totalUnCompletedTask = teamSprint.data().TotalUnCompletedTask;
                        let totalNumberOfTask = teamSprint.data().TotalNumberOfTask;

                        totalUnCompletedTask = totalUnCompletedTask + 1;
                        totalNumberOfTask = totalNumberOfTask + 1;
                        const createTeamSprint = db.collection("Organizations").doc(orgDocument).collection("Teams").doc(project).collection("Sprints").doc(fullSprintId).update({
                            TotalNumberOfTask: totalNumberOfTask,
                            TotalUnCompletedTask: totalUnCompletedTask,
                        });
                        return Promise.resolve(createTeamSprint);
                    } else {
                        const createTeamSprint = db.collection("Organizations").doc(orgDocument).collection("Teams").doc(project).collection("Sprints").doc(fullSprintId).set({
                            EndDate: "xx/xx/xxxx",
                            StartDate: "xx/xx/xxxx",
                            Status: "Not Started",
                            OrganizationId: orgId,
                            TeamId: teamId,
                            SprintNumber: sprintNumber,
                            TotalCompletedTask: 0,
                            TotalNumberOfTask: 1,
                            TotalUnCompletedTask: 1,
                        });
                        return Promise.resolve(createTeamSprint);
                    }
                });

                const newTaskPromises = [promise1, promise2, promise3];
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
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        return Promise.resolve(createTaskPromise);
    });
});

function createSprintId(sprintNumber) {
    if (sprintNumber === -1) {
        return "Backlog";
    } else {
        return ("S" + sprintNumber);
    }
}