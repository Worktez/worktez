/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
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

const { db } = require("../application/lib");
exports.setSchedular = function(schedularDocId, type, orgAppKey, assignee, teamId, orgDomain, sprintStatus, newSprintIdString, startDate, endDate) {
    console.log("inside lib of scheduledFunctions")
    console.log(type)
    if (type == "SprintAutoCompletion") {
        const inputJson = {
            Type: type,
            OrgAppKey: orgAppKey,
            TeamId: teamId,
            OrgDomain: orgDomain,
            Assignee: assignee,
            SprintStatus: sprintStatus,
            SprintName: newSprintIdString,
            StartDate: startDate,
            EndDate: endDate
        };
        const setSchedularDoc = db.collection("SchedularOrg").doc(schedularDocId).set(inputJson);
        return Promise.resolve(setSchedularDoc);
    }
    else {
        const inputJson = {
            Type: type,
            OrgAppKey: orgAppKey,
            TeamId: teamId,
            OrgDomain: orgDomain,
            Assignee: assignee,
        };
        const setSchedularDoc = db.collection("SchedularOrg").doc(schedularDocId).set(inputJson);
        return Promise.resolve(setSchedularDoc);
    }
    
   
    
};

exports.getSchedular = function(schedularDocId) {
    const getSchedularPromise = db.collection("SchedularOrg").doc(schedularDocId).get().then((doc) => {
        return doc.data();
    });
    return Promise.resolve(getSchedularPromise);
};

exports.getAllSchedular = function() {
    const query = db.collection("SchedularOrg");
    const getAllScheduledPromises = query.get();

    return Promise.resolve(getAllScheduledPromises);
};
