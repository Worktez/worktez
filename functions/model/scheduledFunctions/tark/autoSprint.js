/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * Author: Sanjay Krishna S R <sanjaykrishna1203@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const { createSprintName } = require("../../application/lib");
const { sprintReminderMailer } = require("../../mailer/lib");
const { getAllOrgs } = require("../../organization/lib");
const { getSprint } = require("../../sprints/lib");
const { updateAutoSprintStatus } = require("../../sprints/tark/updateAutoSprintStatus");
const { getAllTeams } = require("../../teams/lib");

exports.autoSprint = function() {
  return getAllOrgs()
      .then(function(data) {
        const orgPromises = [];

        data.forEach(function(element) {
          const orgDomain = element.OrganizationDomain;
          const teamPromises = [];

          const teamsPromise = getAllTeams(orgDomain).then(function(doc) {
            doc.forEach(function(tData) {
              const teamData = tData.data();
              let endDate;
              const date = new Date();

              if (teamData.SchedulerDetails.AutoSprint == true) {
                teamPromises.push(
                    getSprint(orgDomain, teamData.TeamName, createSprintName(teamData.CurrentSprintId))
                        .then(function(sdata) {
                          endDate = new Date(sdata.EndDate);

                          console.log(date, endDate);
                          if (date > endDate) {
                            console.log("Executing Scheduler for", element.orgDomain, teamData.TeamId);
                            return updateAutoSprintStatus(element.AppKey, teamData.TeamId);
                          }
                        })
                );
              }

              if (teamData.SchedulerDetails.TimelyEmail == true) {
                const diffTime = Math.abs(endDate - date);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays<=5) {
                  sprintReminderMailer(orgDomain, teamData.TeamName, teamData.createSprintName(teamData.currentSprintId));
                }
                console.log("Sending Timely Emails", teamData.Id);
              }
            });
          });

          orgPromises.push(teamsPromise);
        });

        return Promise.all(orgPromises);
      })
      .catch(function(error) {
        console.error("Error:", error);
      });
};