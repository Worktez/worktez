/* eslint-disable no-var */
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

exports.patch1 = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const orgDomain = request.body.data.OrgDomain;
        const teamId = request.body.data.TeamId;

        let teamName;
        let totalSprints;
        let fullSprintId;
        let totalTeamTask = 0;

        const promise1 = db.collection("Organizations").doc(orgDomain).collection("Teams").where("TeamId", "==", teamId).get().then((team) => {
            team.forEach((doc) => {
                totalSprints = doc.data().CurrentSprintId;
                teamName = doc.data().TeamName;
            });
            console.log("Executing Promise1 of Patch1");
            for (i = -2; i<=totalSprints; i++) {
                if (i!=0) {
                    fullSprintId = createSprintId(i);
                    sprintCounters(i, orgDomain, teamId, teamName, fullSprintId);
                }
            }
        });

        const promise2 = db.collection("Organizations").doc(orgDomain).collection("Tasks").where("TeamId", "==", teamId).get().then((team) => {
            team.forEach((doc) => {
                totalTeamTask += 1;
                console.log("Executing Promise2 of Patch1");
            });
            const p2 = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).update({
                TotalTeamTasks: totalTeamTask,
            });
            return Promise.resolve(p2);
        });

        const Promises = [promise1, promise2];
        Promise.all(Promises).then(() => {
            result = { data: "OK! Patch1 executed" };
            console.log("Counters updated");
            return response.status(200).send(result);
        }).catch(function(error) {
            result = { data: error };
            console.error("Patch error in updating counters", error);
            return response.status(500).send(result);
        });
    });
});

function sprintCounters(i, orgDomain, teamId, teamName, fullSprintId) {
    var a = [0, 0, 0];
    db.collection("Organizations").doc(orgDomain).collection("Tasks").where("TeamId", "==", teamId).get().then((tasks) => {
        tasks.forEach((doc) => {
            if (doc.data().SprintNumber == i) {
                a[0] +=1;
                if (doc.data().Status == "Completed") {
                    a[1] += 1;
                } else a[2] += 1;
            }
        });
        const p1 = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).collection("Sprints").doc(fullSprintId).update({
            TotalNumberOfTask: a[0],
            TotalCompletedTask: a[1],
            TotalUnCompletedTask: a[2],
        });
        return Promise.resolve(p1);
    });
}

function createSprintId(sprintNumber) {
    if (sprintNumber === -1) {
        return "Backlog";
    } else if (sprintNumber === -2) {
        return "Deleted";
    } else {
        return ("S" + sprintNumber);
    }
}