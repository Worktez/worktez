/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getOrgUseAppKey } = require("../../organization/lib");
const { getTeamUseTeamId } = require("../../teams/lib");
const { updateSprint, getSprint } = require("../lib");


exports.updateAutoSprintStatus = function(appKey, teamId) {

    let orgDomain;
    let result;
    let status = 200;
    let today = new Date();
    var currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();;

    const updateSprintPromise = getOrgUseAppKey(appKey).then((orgDoc) => {
        orgDomain = orgDoc.OrganizationDomain;

        const updateTeamSprintStatus = getTeamUseTeamId(orgDomain, teamId).then((teamDoc) => {
            const teamName = teamDoc.TeamName;
            const currentSprintName = 'S' + teamDoc.CurrentSprintId;

            let updateSprintStatusInputJson;
            const getSprintPromise = getSprint(orgDomain, teamName, currentSprintName).then((sprintDoc) => {
                console.log(currentDate);
                console.log(sprintDoc.EndDate);
                if (currentDate >= sprintDoc.EndDate) {
                    updateSprintStatusInputJson = {
                        Status: "Completed"
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
        return result;
    }).catch((error) => {
        result = { data: error };
        console.error("Error Updating Sprint", error);
        return result;
    });
};