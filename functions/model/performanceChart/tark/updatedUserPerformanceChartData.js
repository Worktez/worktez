/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

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

const { setOrganizationsChart } = require("../lib");
const { getAllTasks } = require("../../tasks/lib");

exports.updatedUserPerformanceChartData =function(orgDomain, assignee, sprintRange, teamId, teamName) {
  const inputJson = {};
  const responseData = [];

  getAllTasks(orgDomain, teamId, "", assignee, "", "", "Completed", "", sprintRange["SprintRange1"], sprintRange["SprintRange2"]).then((snapshot) => {
    let i; let storyPoint; let data;
    for (i = sprintRange["SprintRange1"]; i <= sprintRange["SprintRange2"]; i++) {
      storyPoint = 0;
      snapshot.docs.forEach((taskDoc) => {
        data = taskDoc.data();
        if (data.SprintNumber == i) {
          storyPoint += data.StoryPointNumber;
        }
      });
      responseData.push(["S" + i, storyPoint]);
      inputJson["S"+i]=storyPoint;
    }
    setOrganizationsChart(orgDomain, teamName, assignee, inputJson);
  });

  // getUserUseEmail(assignee).then((data) => {
  //     const uid = data.uid;
  //     getAllTasks(orgDomain, "", "", assignee, "", "", "Completed", "", sprintRange["SprintRange1"], sprintRange["SprintRange2"]).then((snapshot) => {
  //         let i; let storyPoint; let data;
  //         for (i = sprintRange["SprintRange1"]; i <= sprintRange["SprintRange2"]; i++) {
  //             storyPoint = 0;
  //             snapshot.docs.forEach((taskDoc) => {
  //                 data = taskDoc.data();
  //                 if (data.SprintNumber == i) {
  //                     storyPoint += data.StoryPointNumber;
  //                 }
  //             });
  //             responseData.push(["S" + i, storyPoint]);
  //             inputJson["S"+i]=storyPoint;
  //         }
  //         setUserChart(orgDomain, uid, inputJson);
  //     }).catch((error) => {
  //         console.log("Error:", error);
  //     });
  // }).catch((error) => {
  //     console.log("Error:", error);
  // });
};