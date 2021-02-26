/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

const admin = require("firebase-admin");

const db = admin.firestore();

function generateBase64String(string) {
    return Buffer.from(string).toString("base64");
}

exports.createNewOrganization = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const data = request.body.data;
        const date = new Date();
        const organizationId = generateBase64String(date);
        const appKey = generateBase64String(date.getMilliseconds() + organizationId);

        const organizationName = data.OrganizationName;
        const organizationDomain = data.OrganizationDomain;
        const organizationEmail = data.OrganizationEmail;
        const organizationDescription = data.OrganizationDescription;
        const organizationLogoURL = data.OrganizationLogoURL;
        const securityPhrase = generateBase64String(organizationId + appKey + organizationName + date.getMilliseconds() + date.getDay());

        const promise1 = db.collection("Organizations").doc(organizationDomain).get().then((doc) => {
            if (doc.exists) {
                return 0;
            } else {
                const orgData = db.collection("Organizations").doc(organizationDomain).set({
                    OrganizationId: organizationId,
                    AppKey: appKey,
                    SecurityPhase: securityPhrase,
                    OrganizationName: organizationName,
                    OrganizationDomain: organizationDomain,
                    OrganizationEmail: organizationEmail,
                    OrganizationDescription: organizationDescription,
                    OrganizationLogoURL: organizationLogoURL,
                });
                return Promise.resolve(orgData);
            }
        });
        const promise2 = db.collection("Organizations").doc(organizationDomain).collection("RawData").doc("AppDetails").get().then((doc) => {
            if (doc.exists) {
                return 0;
            } else {
                const P1 = db.collection("Organizations").doc(organizationDomain).collection("RawData").doc("AppDetails").set({
                    CurrentSprintId: 0,
                    TotalNumberOfTask: 0,
                    TotalCompletedTask: 0,
                    TotalUnCompletedTask: 0,
                    TotalNumberOfOrganizations: -1,
                });
                const P2 = db.collection("RawData").doc("AppDetails").get().then((doc) => {
                    const totalNumberOfOrganizations = doc.data().TotalNumberOfOrganizations;
                    const orgData = db.collection("RawData").doc("AppDetails").update({
                        TotalNumberOfOrganizations: totalNumberOfOrganizations + 1,
                    });
                    return Promise.resolve(orgData);
                });
                return Promise.all([P1, P2]);
            }
        });
        let result;
        const promises = [promise1, promise2];
        return Promise.all(promises).then(() => {
                result = { data: "Created Organization Successfully" };
                console.log("Created Organization Successfully");
                return response.status(200).send(result);
            })
            .catch((error) => {
                result = { data: error };
                console.error("Error Creating Organization", error);
                return response.status(500).send(result);
            });
    });
});

exports.createNewTeamWithLabels = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const data = request.body.data;
        console.log(data);
        const organizationDomain = data.OrganizationDomain;
        const teamName = data.TeamName;
        const teamId = data.TeamId;
        const teamDescription = data.TeamDescription;
        const teamManagerEmail = data.TeamManagerEmail;
        const teamMembers = data.TeamMembers;
        const taskLabels = data.TaskLabels;
        const statusLabels = data.StatusLabels;
        const priorityLabels = data.PriorityLabels;
        const difficultyLabels = data.DifficultyLabels;

        const promise1 = db.collection("Organizations").doc(organizationDomain).collection("Teams").doc(teamName).get().then((doc) => {
            if (doc.exists) {
                const teamData = db.collection("Organizations").doc(organizationDomain).collection("Teams").doc(teamName).set({
                    TeamDescription: teamDescription,
                    TeamManagerEmail: teamManagerEmail,
                    TeamMembers: teamMembers,
                    TaskLabels: taskLabels,
                    StatusLabels: statusLabels,
                    PriorityLabels: priorityLabels,
                    DifficultyLabels: difficultyLabels,
                });
                return Promise.resolve(teamData);
            } else {
                const teamData = db.collection("Organizations").doc(organizationDomain).collection("Teams").doc(teamName).set({
                    TeamName: teamName,
                    TeamId: teamId,
                    TeamDescription: teamDescription,
                    TeamManagerEmail: teamManagerEmail,
                    TeamMembers: teamMembers,
                    TaskLabels: taskLabels,
                    StatusLabels: statusLabels,
                    PriorityLabels: priorityLabels,
                    DifficultyLabels: difficultyLabels,
                });
                return Promise.resolve(teamData);
            }
        });
        let result;
        return Promise.resolve(promise1).then(() => {
                result = { data: "Created Team with Labels Successfully" };
                console.log("Created Team with Labels Successfully");
                return response.status(200).send(result);
            })
            .catch((error) => {
                result = { data: error };
                console.error("Error Creating Team", error);
                return response.status(500).send(result);
            });
    });
});