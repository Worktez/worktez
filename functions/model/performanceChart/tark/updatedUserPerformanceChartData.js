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

const { setOrganizationsChart, updateChart, getOrganizationsChartDetails } = require("../lib");
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
    const promise = getOrganizationsChartDetails(orgDomain, teamName, assignee).then((data) => {
      if (data != undefined) {
        updateChart(orgDomain, teamName, assignee, inputJson);
      } else {
        setOrganizationsChart(orgDomain, teamName, assignee, inputJson);
      }
      return null;
    }).catch((err) => {
      console.log(err);
    });
    return Promise.resolve(promise);
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