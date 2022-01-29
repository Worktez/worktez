/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { db } = require("../application/lib");

exports.setTeam = function(orgDomain, teamName, teamDescription, teamAdmin, teamManagerEmail, teamMembers, type, statusLabels, priorityLabels, difficultyLabels, orgId, teamId, teamStatus) {
    const setTeam = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).set({
        TeamName: teamName,
        TeamDescription: teamDescription,
        TeamAdmin: teamAdmin,
        TeamManagerEmail: teamManagerEmail,
        TeamMembers: teamMembers,
        Type: type,
        StatusLabels: statusLabels,
        PriorityLabels: priorityLabels,
        DifficultyLabels: difficultyLabels,
        TotalTeamTasks: 0,
        OrganizationId: orgId,
        TeamId: teamId,
        TeamStatus: teamStatus,
        CurrentSprintId: 0,
    });
    return Promise.resolve(setTeam);
};

exports.updateTeamDetails = function(inputJson, orgDomain, teamName) {
    const updateTeam = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).update(inputJson);
    return Promise.resolve(updateTeam);
};

exports.getTeam = function(orgDomain, teamName) {
    const getTeamPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").doc(teamName).get().then((doc) => {
        if (doc.exists) return doc.data();
        else return;
    });
    return Promise.resolve(getTeamPromise);
};

exports.getTeamUseTeamId = function(orgDomain, teamId) {
    console.log(orgDomain, teamId);
    const getTeamPromise = db.collection("Organizations").doc(orgDomain).collection("Teams").where("TeamId", "==", teamId).get().then((doc) => {
        let data;
        doc.forEach((team) => {
            data = team.data();
        });
        return data;
    });
    return Promise.resolve(getTeamPromise);
};
