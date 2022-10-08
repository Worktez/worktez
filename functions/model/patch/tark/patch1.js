/* eslint-disable linebreak-style */
/* eslint-disable no-var */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const admin = require("firebase-admin");
const { updateSprint, setSprint } = require("../../sprints/lib");
const { getTeamUseTeamId, updateTeamDetails } = require("../../teams/lib");
const { updatePatchData } = require("../lib");

const db = admin.firestore();

exports.patch1 = function(request, response) {
    const orgDomain = request.body.data.OrgDomain;
    const teamId = request.body.data.TeamId;
    const uid = request.body.data.Uid;

    let teamName;
    let orgId;
    let totalSprints;
    let fullSprintId;
    let totalTeamTask = 0;

    const promise1 = getTeamUseTeamId(orgDomain, teamId).then((teamDoc) => {
        totalSprints = teamDoc.CurrentSprintId;
        teamName = teamDoc.TeamName;
        orgId = teamDoc.OrganizationId;
        for (i = -2; i <= totalSprints; i++) {
            if (i != 0) {
                fullSprintId = createSprintId(i);
                if (i < 0) {
                    // creates Backlog and Deleted with Default Values if don't exist
                    createBacklogAndDeleted(i, orgDomain, teamId, teamName, fullSprintId, orgId);
                }
                sprintCounters(i, orgDomain, teamId, teamName, fullSprintId);
            }
        }
    });

    const promise2 = db.collection("Organizations").doc(orgDomain).collection("Tasks").where("TeamId", "==", teamId).get().then((team) => {
        team.forEach(() => {
            totalTeamTask += 1;
            console.log("Executing Promise2 of Patch1");
        });

        updateTeamInputJson = {
            TotalTeamTasks: totalTeamTask,
        };
        updateTeamDetails(updateTeamInputJson, orgDomain, teamName);
    });

    const Promises = [promise1, promise2];
    Promise.all(Promises).then(() => {
        result = { data: "OK! Patch1 executed" };
        updatePatchData("Patch1", {LastUsedByUid: uid, LastUsedByOrg: orgDomain});
        console.log("Counters updated");
        return response.status(200).send(result);
    }).catch(function(error) {
        result = { data: error };
        console.error("Patch error in updating counters", error);
        return response.status(500).send(result);
    });
};

function sprintCounters(i, orgDomain, teamId, teamName, fullSprintId) {
    var a = [0, 0, 0];
    db.collection("Organizations").doc(orgDomain).collection("Tasks").where("TeamId", "==", teamId).get().then((tasks) => {
        tasks.forEach((doc) => {
            if (doc.data().SprintNumber == i) {
                a[0] += 1;
                if (doc.data().Status == "Completed") {
                    a[1] += 1;
                } else a[2] += 1;
            }
        });

        updateSprintInputJson = {
            TotalNumberOfTask: a[0],
            TotalCompletedTask: a[1],
            TotalUnCompletedTask: a[2],
        };

        const p1 = updateSprint(updateSprintInputJson, orgDomain, teamName, fullSprintId);
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

function createBacklogAndDeleted(i, orgDomain, teamId, teamName, fullSprintId, orgId) {
    const promise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).collection("Sprints").doc(fullSprintId).get().then((doc) => {
        if (doc.exists) {
            return 0;
        } else {
            setSprint(orgDomain, teamName, fullSprintId, orgId, teamId, i, "Not Started", 0, 0, "xxxx-xx-xx", "xxxx-xx-xx");
        }
    });
    return Promise.resolve(promise);
}