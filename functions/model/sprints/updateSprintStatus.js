/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getOrgUseAppKey } = require("../organization/lib");
const { getTeamUseTeamId } = require("../teams/lib");
const { updateSprint, getSprint } = require("./lib");


exports.updateSprintStatus = function(request, response) {
    const sprintStatus = request.body.data.SprintStatus;
    const currentSprintName = request.body.data.CurrentSprintName;
    const appKey = request.body.data.AppKey;
    const teamId = request.body.data.TeamId;
    let orgDomain;
    let result;
    let status = 200;

    const updateSprintPromise = getOrgUseAppKey(appKey).then((orgDoc) => {
        orgDomain = orgDoc.OrganizationDomain;

        const updateTeamSprintStatus = getTeamUseTeamId(orgDomain, teamId).then((teamDoc) => {
            const teamName = teamDoc.TeamName;

            let updateSprintStatusInputJson;
            const getSprintPromise = getSprint(orgDomain, teamName, currentSprintName).then((sprintDoc) => {
                if (sprintStatus == "Under Progress") {
                    const startStoryPointNumber = sprintDoc.StartStoryPoint;
                    updateSprintStatusInputJson = {
                        Status: sprintStatus,
                        MidStoryPoint: startStoryPointNumber,
                    };
                    updateSprint(updateSprintStatusInputJson, orgDomain, teamName, currentSprintName);
                } else if (sprintStatus == "Completed") {
                    updateSprintStatusInputJson = {
                        Status: sprintStatus,
                        EndStoryPoint: sprintDoc.CompletedStoryPoint,
                    };
                    updateSprint(updateSprintStatusInputJson, orgDomain, teamName, currentSprintName);
                }
            });
            return Promise.resolve(getSprintPromise);
        }).catch((error) => {
            status = 500;
            console.log("Error:", error);
        });
        console.log("Sprint updated successfully");
        result = { data: "OK" };
        return Promise.resolve(updateTeamSprintStatus);
    });
    return Promise.resolve(updateSprintPromise).then(() => {
        result = { data: "Sprint Updated Successfully" };
        console.log("Sprint Updated Successfully");
        return response.status(status).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error Updating Sprint", error);
        return response.status(status).send(result);
    });
};