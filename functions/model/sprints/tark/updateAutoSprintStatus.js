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

const { currentDate, currentTime } = require("../../application/lib");
const { getOrgUseAppKey } = require("../../organization/lib");
const { getTeamUseTeamId } = require("../../teams/lib");
const { updateSprint, getSprint, setSprintActivity } = require("../lib");


exports.updateAutoSprintStatus = function(appKey, teamId) {
  let orgDomain;
  let result;
  const updateSprintPromise = getOrgUseAppKey(appKey).then((orgDoc) => {
    orgDomain = orgDoc.OrganizationDomain;

    const updateTeamSprintStatus = getTeamUseTeamId(orgDomain, teamId).then((teamDoc) => {
      const teamName = teamDoc.TeamName;
      const currentSprintName = "S" + teamDoc.CurrentSprintId;

      let updateSprintStatusInputJson;
      const getSprintPromise = getSprint(orgDomain, teamName, currentSprintName).then((sprintDoc) => {
        if (currentDate >= sprintDoc.EndDate) {
          updateSprintStatusInputJson = {
            Status: "Completed",
          };
          const message = "Updated Sprint Status As Completed";
          let sprintActivityCounter = sprintDoc.SprintActivityCounter;
          if (sprintActivityCounter) {
            sprintActivityCounter = sprintActivityCounter + 1;
            updateSprintStatusInputJson["SprintActivityCounter"] = sprintActivityCounter;
          } else {
            sprintActivityCounter = 1;
            updateSprintStatusInputJson["SprintActivityCounter"] = sprintActivityCounter;
          }
          setSprintActivity(orgDomain, teamName, currentSprintName, sprintActivityCounter, message, currentDate, currentTime);
          updateSprint(updateSprintStatusInputJson, orgDomain, teamName, currentSprintName);
        }
      });
      return Promise.resolve(getSprintPromise);
    }).catch((error) => {
      console.log("Error:", error);
    });
    console.log("Sprint updated successfully");
    result = { data: "OK" };
    return Promise.resolve(updateTeamSprintStatus);
  });
  return Promise.resolve(updateSprintPromise).then(() => {
    result = { data: "Sprint Updated Successfully" };
    console.log("Sprint Updated Successfully");
    return result;
  }).catch((error) => {
    result = { data: error };
    console.error("Error Updating Sprint", error);
    return result;
  });
};