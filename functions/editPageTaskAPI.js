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

exports.editPageTask = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request.body.data);

        const appKey = request.body.data.AppKey;
        const description = request.body.data.Description;
        const priority = request.body.data.Priority;
        const difficulty = request.body.data.Difficulty;
        const assignee = request.body.data.Assignee;
        const estimatedTime = request.body.data.EstimatedTime;
        const storyPointNumber = request.body.data.StoryPointNumber;
        const editedSprintNumber = request.body.data.SprintNumber;
        const previousId = request.body.data.PreviousId;
        const creationDate = request.body.data.CreationDate;
        const changedData = request.body.data.ChangedData;
        const previousSprintId = createSprintId(previousId);
        const taskId = request.body.data.Id;
        const editedSprintId = createSprintId(editedSprintNumber);
        let result;
        const date = request.body.data.Date;
        const time = request.body.data.Time;
        let comment = "Edited task details: ";

        const promises = [];

        const editTaskPromise = db.collection("Organizations").where("AppKey", "==", appKey).get().then((org) => {
            org.forEach((doc) => {
                documentID = doc.data().OrganizationDomain;
                orgId = doc.data().OrganizationId;
            });

            console.log("DocumentID = " + documentID + " OrgID = " + orgId);

            if (editedSprintNumber !== previousId) {
                comment += "Moved to sprint " + editedSprintId + ". ";
                const p1 = db.collection("Organizations").doc(documentID).collection("Tasks").doc(taskId).get().then((taskDoc) => {
                    const project = taskDoc.data().Project;
                    const taskPrevSprintPromise = db.collection("Organizations").doc(documentID).collection("Teams").doc(project).collection("Sprints").doc(previousSprintId).get().then((teamSprint) => {
                        if (teamSprint.exists) {
                            let totalUnCompletedTask = teamSprint.data().TotalUnCompletedTask;
                            let totalNumberOfTask = teamSprint.data().TotalNumberOfTask;

                            totalUnCompletedTask = totalUnCompletedTask - 1;
                            totalNumberOfTask = totalNumberOfTask - 1;
                            const createTeamSprint = db.collection("Organizations").doc(documentID).collection("Teams").doc(project).collection("Sprints").doc(previousSprintId).update({
                                TotalNumberOfTask: totalNumberOfTask,
                                TotalUnCompletedTask: totalUnCompletedTask,
                            });
                            return Promise.resolve(createTeamSprint);
                        }
                    });
                    return Promise.resolve(taskPrevSprintPromise);
                });
                promises.push(p1);

                const p2 = db.collection("Organizations").doc(documentID).collection("Tasks").doc(taskId).get().then((teamDoc) => {
                    const project = teamDoc.data().Project;
                    const teamId = teamDoc.data().TeamId;
                    const taskNewSprintPromise = db.collection("Organizations").doc(documentID).collection("Teams").doc(project).collection("Sprints").doc(editedSprintId).get().then((teamSprint) => {
                        if (teamSprint.exists) {
                            let totalUnCompletedTask = teamSprint.data().TotalUnCompletedTask;
                            let totalNumberOfTask = teamSprint.data().TotalNumberOfTask;

                            totalUnCompletedTask = totalUnCompletedTask + 1;
                            totalNumberOfTask = totalNumberOfTask + 1;
                            const createTeamSprint = db.collection("Organizations").doc(documentID).collection("Teams").doc(project).collection("Sprints").doc(editedSprintId).update({
                                TotalNumberOfTask: totalNumberOfTask,
                                TotalUnCompletedTask: totalUnCompletedTask,
                            });
                            return Promise.resolve(createTeamSprint);
                        } else {
                            const createTeamSprint = db.collection("Organizations").doc(documentID).collection("Teams").doc(project).collection("Sprints").doc(editedSprintId).set({
                                EndDate: "xx/xx/xxxx",
                                StartDate: "xx/xx/xxxx",
                                Status: "Not Started",
                                OrganizationId: orgId,
                                TeamId: teamId,
                                SprintNumber: editedSprintNumber,
                                TotalCompletedTask: 0,
                                TotalNumberOfTask: 1,
                                TotalUnCompletedTask: 1,
                            });
                            return Promise.resolve(createTeamSprint);
                        }
                    });
                    return Promise.resolve(taskNewSprintPromise);
                });
                promises.push(p2);
            }

            const p3 = db.collection("Organizations").doc(documentID).collection("Tasks").doc(taskId).update({
                Description: description,
                CreationDate: creationDate,
                Priority: priority,
                Difficulty: difficulty,
                Assignee: assignee,
                EstimatedTime: estimatedTime,
                SprintNumber: editedSprintNumber,
                StoryPointNumber: storyPointNumber,
            });
            promises.push(p3);

            comment = comment + changedData;
            Activity.addActivity("EDITED", comment, taskId, date, time, documentID);

            Promise.all(promises).then(() => {
                    result = { data: "OK" };
                    console.log("Edited Task Successfully");
                    return response.status(200).send(result);
                })
                .catch((error) => {
                    result = { data: error };
                    console.error("Error Editing Task", error);
                    return response.status(500).send(result);
                });
        });
        return Promise.resolve(editTaskPromise);
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