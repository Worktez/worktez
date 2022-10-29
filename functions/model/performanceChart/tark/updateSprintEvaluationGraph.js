/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
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

const { createSprintName } = require("../../application/lib");
const { getAllSprints, getSprint } = require("../../sprints/lib");
const { getTeamUseTeamId } = require("../../teams/lib");
const { updateChart, setOrganizationsChart, getOrganizationsChartDetails } = require("../lib");

exports.updateSprintEvaluationGraphData = function(orgDomain, teamId, sprintId) {
    let storyPointArray = [];
    const inputJson = {};
    const p1 = getTeamUseTeamId(orgDomain, teamId).then((data)=>{
        const teamName = data.TeamName;
        const p = getSprint(orgDomain, teamName, sprintId).then((sprintDoc) => {
            storyPointArray = [parseInt(sprintDoc.StartStoryPoint), parseInt(sprintDoc.MidStoryPoint), parseInt(sprintDoc.EndStoryPoint)];
            inputJson[sprintId] = storyPointArray;
            const promise = getOrganizationsChartDetails(orgDomain, teamName, "SprintEvaluationGraph").then((data) => {
                if (data != undefined) {
                    updateChart(orgDomain, teamName, "SprintEvaluationGraph", inputJson);
                } else {
                    setOrganizationsChart(orgDomain, teamName, "SprintEvaluationGraph", inputJson);
                }
                return null;
            }).catch((err) => {
                console.log(err);
            });
            return Promise.resolve(promise);
        });
        return Promise.resolve(p);
    });
    Promise.resolve(p1);
};

// exports.updateSprintEvaluationGraphData = function(orgDomain, teamId, sprintRange) {
//         let fullSprintName;
//         let teamName;
//         let storyPointArray=[];
//         const inputJson = {};

//         const p = getTeamUseTeamId(orgDomain, teamId).then((team) => {
//             teamName = team.TeamName;
//             if (sprintRange["SprintRange1"]<=0) {
//                 sprintRange["SprintRange1"] = 1;
//             }
//             const p = getAllSprints(orgDomain, teamName, sprintRange["SprintRange1"], sprintRange["SprintRange2"]).then((sprints) => {
//                 sprints.forEach((sprintDoc) => {
//                     fullSprintName = createSprintName(sprintDoc.SprintNumber);
//                     storyPointArray = [parseInt(sprintDoc.StartStoryPoint), parseInt(sprintDoc.MidStoryPoint), parseInt(sprintDoc.EndStoryPoint)];
//                     inputJson[fullSprintName] = storyPointArray;
//                 });

//                 const p = getOrganizationsChartDetails(orgDomain, teamId, "SprintEvaluationGraph").then((data) => {
//                     if (data != undefined) {
//                         updateChart(orgDomain, teamName, "SprintEvaluationGraph", inputJson);
//                     } else {
//                         setOrganizationsChart(orgDomain, teamName, "SprintEvaluationGraph", inputJson);
//                     }
//                     return null;
//                 }).catch((err) => {
//                     console.log(err);
//                 });
//                 return Promise.resolve(p);
//             }).catch((err) => {
//                 console.log(err);
//             });
//             return Promise.resolve(p);
//         }).catch((error) => {
//             console.log(error);
//         });
//         return Promise.resolve(p);
// };