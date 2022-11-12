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

const { createSprintName, currentDate, currentTime } = require("../../application/lib");
const { getSprint, setSprint, updateSprint, setSprintActivity } = require("../lib");
const { getOrgUseAppKey } = require("../../organization/lib");
const { getTeamUseTeamId, updateTeamDetails } = require("../../teams/lib");
const { updateSprintEvaluationGraphData } = require("../../performanceChart/tark/updateSprintEvaluationGraph");

exports.createNewSprint = function(request, response) {
  const appKey = request.body.data.AppKey;
  const sprintStatus = request.body.data.Status;
  const startDate = request.body.data.StartDate;
  const endDate = request.body.data.EndDate;
  const newSprintId = parseInt(request.body.data.NewSprintId);
  const newSprintIdString = createSprintName(newSprintId);
  const teamId = request.body.data.TeamId;
  const uid = request.body.data.Uid;
  let orgDomain;
  let orgId;
  let teamName;
  let inputJson;

  let status = 200;

  const promise = getOrgUseAppKey(appKey).then((orgDetail) => {
    orgDomain = orgDetail.OrganizationDomain;
    orgId = orgDetail.OrganizationId;

    const startSprint = getTeamUseTeamId(orgDomain, teamId).then((teamDetails) => {
      teamName = teamDetails.TeamName;

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
          setSprintActivity(orgDomain, teamName, newSprintIdString, sprintActivityCounter, message, currentDate, currentTime, uid);
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

      const promises = [createSprint, updateTeamCurrentSprint];
      return Promise.all(promises);
    });
    return Promise.resolve(startSprint);
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  const Promises = [promise];
  let result;
  return Promise.all(Promises).then(() => {
    updateSprintEvaluationGraphData(orgDomain, teamId, createSprintName(newSprintId));
    result = { data: "Sprint Created Successfully" };
    console.log("Sprint Created Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = { data: error };
        console.error("Error Creating Sprint", error);
        return response.status(status).send(result);
      });
};