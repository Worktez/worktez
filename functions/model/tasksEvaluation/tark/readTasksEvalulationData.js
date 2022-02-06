/* eslint-disable linebreak-style */
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

/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { db } = require("../../application/lib");

exports.readTasksEvaluationData = function(request, response) {
    const orgDomain = request.body.data.OrganizationDomain;
    const teamId = request.body.data.TeamId;
    const sprintNumber = request.body.data.SprintNumber;
    const pageToLoad = request.body.data.PageToLoad;
    const lastInResultTaskId = request.body.data.LastInResultTaskId;
    const firstInResultTaskId = request.body.data.FirstInResultTaskId;
    const startAt = request.body.data.StartAt;
    const tasks = [];
    let status = 200;
    let disableNext = false;
    let disablePrev = false;
    let promise;
    let query = db.collection("Organizations").doc(orgDomain).collection("Tasks").where("TeamId", "==", teamId).orderBy("Id", "desc");

    if (sprintNumber) {
        query = query.where("SprintNumber", "==", sprintNumber);
    }

    if (pageToLoad == "initial") {
        query = query.limit(20);
    } else if (pageToLoad == "next") {
        query = query.startAfter(lastInResultTaskId).limit(20);
    } else if (pageToLoad == "previous") {
        query = query.startAt(startAt).endBefore(firstInResultTaskId).limit(20);
    }

    promise = query.get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            tasks.push(doc.data());
        });
        let p1;
        if (pageToLoad == "next") {
            p1 = db.collection("Organizations").doc(orgDomain).collection("Tasks").where("TeamId", "==", teamId).orderBy("Id", "desc").startAfter(tasks[tasks.length - 1].Id).get().then((docs) => {
                if (docs.empty) {
                    disableNext = true;
                }
            });
        } else if (pageToLoad == "previous") {
            p1 = db.collection("Organizations").doc(orgDomain).collection("Tasks").where("TeamId", "==", teamId).orderBy("Id", "desc").endBefore(tasks[0].Id).get().then((docs) => {
                if (docs.empty) {
                    disablePrev = true;
                }
            });
        }
        return Promise.resolve(p1);
    }).catch((error) => {
        console.log(error);
        status = 500;
    });

    return Promise.resolve(promise).then(() => {
        result = { data: {Tasks: tasks, DisableNext: disableNext, DisablePrev: disablePrev} };
        console.log("Read Task Evaluation Page Data Successfully");
        return response.status(status).send(result);
    }).catch((err) => {
        result = { data: err };
        console.log("Error occured");
        return response.status(status).send(result);
    });
};