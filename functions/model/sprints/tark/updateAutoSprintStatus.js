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

const { currentDate, currentTime, createSprintName, addDays } = require("../../application/lib");
const { getOrgUseAppKey } = require("../../organization/lib");
const { migrateTasks } = require("../../tasks/tark/migrateTasks");
const { getTeamUseTeamId, updateTeamDetails } = require("../../teams/lib");
const { setSprint, updateSprint, getSprint, setSprintActivity } = require("../lib");

exports.updateAutoSprintStatus = function(appKey, teamId) {
  let orgDomain;
  let orgId;
  let result;
  let inputJson;
  let teamName;
  let oldSprintNumber;
  let newSprintNumber;
  let status = 200;
  const updateSprintPromise = getOrgUseAppKey(appKey).then((orgDoc) => {
    orgDomain = orgDoc.OrganizationDomain;
    orgId = orgDoc.OrganizationId;

    // Marking the Current Sprint as completed
    const updateTeamSprintStatus = getTeamUseTeamId(orgDomain, teamId).then((teamDoc) => {
      teamName = teamDoc.TeamName;
      const currentSprintName = "S" + teamDoc.CurrentSprintId;
      oldSprintNumber = teamDoc.CurrentSprintId;
      newSprintNumber = teamDoc.CurrentSprintId +1;
      const newSprintIdString = createSprintName(teamDoc.CurrentSprintId+1);
      const newSprintId = parseInt(teamDoc.CurrentSprintId+1);
      const startDate = currentDate;
      const endDate = addDays(teamDoc.SchedulerDetails.SprintDuration);
      const sprintStatus = "";

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

      // Creating a new Sprint
      const createSprint = getSprint(orgDomain, teamName, newSprintIdString).then((sprint) => {
        if (sprint == undefined) {
          setSprint(orgDomain, teamName, newSprintIdString, orgId, teamId, newSprintId, sprintStatus, 0, 0, 0, 0, startDate, endDate);
        } else {
          const inputJson = {
            EndDate: endDate,
            StartDate: startDate,
            Status: sprintStatus,
            OrganizationId: orgId,
          };
          let value;
          if (sprintStatus == "Under Progress") {
            const startStoryPointNumber = sprint.StartStoryPoint;
            value = "MidStoryPoint";
            inputJson[value] = startStoryPointNumber;
          } else if (sprintStatus == "Completed") {
            const startStoryPointNumber = sprint.StartStoryPoint;
            value = "MidStoryPoint";
            inputJson[value] = startStoryPointNumber;
            value = "EndStoryPoint";
            inputJson[value] = startStoryPointNumber;
          }
          const message = "Updated Sprint Status As Completed";

          let sprintActivityCounter = sprint.SprintActivityCounter;
          if (sprintActivityCounter) {
            sprintActivityCounter = sprintActivityCounter + 1;
            inputJson["SprintActivityCounter"] = sprintActivityCounter;
          } else {
            sprintActivityCounter = 1;
            inputJson["SprintActivityCounter"] = sprintActivityCounter;
          }
          setSprintActivity(orgDomain, teamName, newSprintIdString, sprintActivityCounter, message, currentDate, currentTime, "SPRINT_SCHEDULER");
          updateSprint(inputJson, orgDomain, teamName, newSprintIdString);
        }
      }).catch((error) => {
        status = 500;
        console.log("Error:", error);
      });

      inputJson = {
        CurrentSprintId: newSprintId,
      };
      const updateTeamCurrentSprint = updateTeamDetails(inputJson, orgDomain, teamName);

      const promises = [getSprintPromise, createSprint, updateTeamCurrentSprint];
      return Promise.all(promises);
    }).catch((error) => {
      console.log("Error:", error);
    });
    console.log("Sprint updated successfully");
    result = { status: status, data: "OK" };
    return Promise.resolve(updateTeamSprintStatus);
  });
  return Promise.resolve(updateSprintPromise).then(() => {
    result = { data: "Sprint Updated Successfully" };
    console.log("Sprint final Updated Successfully");
    migrateTasks(orgDomain, teamId, teamName, oldSprintNumber, newSprintNumber, orgId);
    return result;
  }).catch((error) => {
    result = { data: error };
    console.error("Error Updating Sprint", error);
    return result;
  });
};