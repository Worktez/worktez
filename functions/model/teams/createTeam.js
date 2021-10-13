/* eslint-disable linebreak-style */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const admin = require("firebase-admin");
const { setTeam, getTeam } = require("./lib");
const { getOrg, updateOrg } = require("../organization/lib");
const { setSprint } = require("../sprints/lib");
const { myOrganizations} = require("../users/myOrganizations");


exports.createTeam = function(request, response) {
    const teamId = request.body.data.TeamId;
    const teamDescription = request.body.data.TeamDescription;
    const teamAdmin = request.body.data.TeamAdmin;
    const teamManagerEmail = request.body.data.TeamManagerEmail;
    const teamMembers = request.body.data.TeamMembers;
    const type = request.body.data.Type;
    let statusLabels = request.body.data.StatusLabels;
    let priorityLabels = request.body.data.PriorityLabels;
    let difficultyLabels = request.body.data.DifficultyLabels;
    const uid = request.body.data.Uid;
    const orgAppKey = request.body.data.OrganizationAppKey;
    const orgDomain = request.body.data.OrganizationDomain;
    const teamName = request.body.data.TeamName;
    let orgId;

    let status = 200;
    let result = { data: "Error in Creating Team" };

    const promise1 = getOrg(orgDomain).then((orgDoc) => {
        if (orgDoc != undefined) {
            orgId = orgDoc.OrganizationId;
            console.log(orgId);

            const inputJson = {
                TeamsId: admin.firestore.FieldValue.arrayUnion(teamId),
            };
            updateOrg(orgDomain, inputJson);
        }

        const prom2 = getTeam(orgDomain, teamName).then((team) => {
            if (team == undefined) {
                console.log(orgId);
                statusLabels = addSortingValueToLabels(statusLabels, "StatusLabels");
                priorityLabels = addSortingValueToLabels(priorityLabels, "PriorityLabels");
                difficultyLabels = addSortingValueToLabels(difficultyLabels, "DifficultyLabels");
                setTeam(orgDomain, teamName, teamDescription, teamAdmin, teamManagerEmail, teamMembers, type, statusLabels, priorityLabels, difficultyLabels, orgId, teamId);
                myOrganizations(uid, orgDomain, orgAppKey, teamId);
            } else {
                status = 500;
                result = { data: "Error: Team Exists! Use update team" };
                console.log("Error: Team Exists! Use update team");
            }
        }).catch((error) => {
            status = 500;
            console.log("Error:", error);
        });
        return Promise.resolve(prom2);
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const promise2 = getOrg(orgDomain).then((orgDoc) => {
        orgId = orgDoc.OrganizationId;
        setSprint(orgDomain, teamName, "Deleted", orgId, teamId, -2, "-");

        setSprint(orgDomain, teamName, "Backlog", orgId, teamId, -1, "-");
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const Promises = [promise1, promise2];
    return Promise.all(Promises).then(() => {
            if (status != 500) {
                result = { data: "Team Created Successfully" };
                console.log("Team Created Successfully");
            }
            return response.status(status).send(result);
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error Creating Team", error);
            return response.status(status).send(result);
        });
};

function addSortingValueToLabels(labels, labelsType) {
    if (labelsType == "PriorityLabels" || labelsType == "DifficultyLabels") {
        labels.forEach((label, index) => {
            if (label == "High") {
                labels[index] = "2@@" + labels[index]; 
            } else if (label == "Medium") {
                labels[index] = "1@@" + labels[index];
            } else if (label == "Low") {
                labels[index] = "0@@" + labels[index];
            }
        });
    } else {
        labels.forEach((label, index) => {
            if (label == "Ready to start") {
                labels[index] = "1@@" + labels[index]; 
            } else if (label == "Ice Box") {
                labels[index] = "0@@" + labels[index];
            } else if (label == "Under Progress") {
                labels[index] = "2@@" + labels[index];
            } else if (label == "Blocked") {
                labels[index] = "3@@" + labels[index];
            } else if (label == "Completed") {
                labels[index] = "4@@" + labels[index];
            }
        });
    }
    return labels;
}
