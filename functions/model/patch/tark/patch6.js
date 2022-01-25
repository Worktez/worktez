/* eslint-disable linebreak-style */
/* eslint-disable no-var */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { createSprintName } = require("../../application/lib");
const { getOrg } = require("../../organization/lib");
const { getSprints, updateSprint } = require("../../sprints/lib");
const { updatePatchData } = require("../lib");

exports.patch6 = function(request, response) {
    const orgDomain = request.body.data.OrgDomain;
    const newfield = request.body.data.newField;
    const newFieldValue = request.body.data.NewFieldValue;
    const newFieldValueType = request.body.data.NewFieldValueType;
    const uid = request.body.data.Uid;
    const promise1 = getOrg(orgDomain).then((orgData) => {
        if (orgData != undefined) {
            const teamNames = orgData.TeamsName;
            teamNames.forEach((teamName) => {
                getSprints(orgDomain, teamName).then((sprint) => {
                    sprint.forEach((element) => {
                        const sprintName = createSprintName(element.SprintNumber);
                        data = {};
                        if (newFieldValueType == "Array") {
                          data[newfield] = [];
                        } else if (newFieldValueType == "String") {
                          data[newfield] = newFieldValue;
                        } else if (newFieldValueType == "Number") {
                          data[newfield] = Number(newFieldValue);
                        }
                        updateSprint(data, orgDomain, teamName, sprintName);
                    });
                });
            });
        }
    });
    const Promises = [promise1];
    Promise.all(Promises).then(() => {
        result = { data: "OK! Patch6 executed" };
        updatePatchData("Patch6", { LastUsedByUid: uid, LastUsedByOrg: orgDomain });
        console.log("Patch6 executed successfully");
        return response.status(200).send(result);
    }).catch(function(error) {
        result = { data: error };
        console.error("Patch6 error in updating all tasks", error);
        return response.status(500).send(result);
    });
};