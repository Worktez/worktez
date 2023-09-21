/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

const { getAllTasks, getTask, updateTask } = require("../lib");
const { updateSprintData } = require("../../sprints/tark/updateSprint");
const { updateSprintEvaluationGraphData } = require("../../performanceChart/tark/updateSprintEvaluationGraph");
const { updateSprintBurndownChartData } = require("../../performanceChart/tark/updateSprintBurndownChart");
const { createSprintName } = require("../../application/lib");

exports.migrateTasks = function(orgDomain, teamId, TeamName, oldSprintNumber, newSprintNumber, orgId) {
  console.log(orgDomain, teamId, TeamName, oldSprintNumber, newSprintNumber, orgId);

  return getAllTasks(orgDomain, teamId, oldSprintNumber, "", "", "", "Incomplete")
      .then(function(taskDoc) {
        taskDoc.forEach((element) => {
          return new Promise(function(resolve, reject) {
            const taskData = element.data();

            getTask(taskData.Id, orgDomain)
                .then(function(taskDoc) {
                  const project = taskDoc.Project;
                  teamId = taskDoc.TeamId;
                  const editedSprintName = createSprintName(newSprintNumber);
                  const previousSprintName = createSprintName(oldSprintNumber);

                  updateSprintData(teamId, project, orgDomain, previousSprintName, taskData.StoryPointNumber, taskData.StoryPointNumber, newSprintNumber, orgId, editedSprintName, newSprintNumber)
                      .then(function() {
                        const promises = [
                          updateSprintEvaluationGraphData(orgDomain, teamId, editedSprintName),
                          updateSprintEvaluationGraphData(orgDomain, teamId, previousSprintName),
                          updateSprintBurndownChartData(orgDomain, teamId, editedSprintName),
                          updateSprintBurndownChartData(orgDomain, teamId, previousSprintName),
                        ];

                        Promise.all(promises)
                            .then(function() {
                              const updateTaskJson = {
                                SprintNumber: newSprintNumber,
                              };
                              console.log("Updating ", taskData.Id);
                              updateTask(updateTaskJson, orgDomain, taskData.Id)
                                  .then(resolve)
                                  .catch(reject);
                            })
                            .catch(reject);
                      })
                      .catch(reject);
                })
                .catch(reject);
          });
        });
      })
      .catch(function(error) {
        console.error("Error:", error);
      });
};
