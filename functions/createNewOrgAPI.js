/* eslint-disable eol-last */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

const admin = require("firebase-admin");

const db = admin.firestore();
let organizationEmail;
exports.createNewOrganization = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const data = request.body.data;
        console.log(data);
        let totalNumberOfOrganizations;
        organizationEmail = data.Email;
        const promise1 = db.collection("Organizations").doc(organizationEmail).get().then((doc) => {
            if (doc.exists) {
                const orgData = db.collection("Organizations").doc(organizationEmail).update(data);
                return Promise.resolve(orgData);
            } else {
                const orgData = db.collection("Organizations").doc(organizationEmail).set(data);
                return Promise.resolve(orgData);
            }
        });
        const promise2 = db.collection("RawData").doc("AppDetails").get().then((doc) => {
            totalNumberOfOrganizations = doc.data().TotalNumberOfOrganizations;
            const orgData = db.collection("RawData").doc("AppDetails").update({
                TotalNumberOfOrganizations: totalNumberOfOrganizations + 1,
            });
            return Promise.resolve(orgData);
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


exports.createNewTeam = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const data = request.body.data;
        console.log(data);
        const team = data.Team;
        const teamMemberEmails = data.TeamMemberEmails;
        const promise1 = db.collection("Organizations").doc(data.OrganizationEmail).collection("Teams").doc(team.Name).get().then((doc) => {
            if (doc.exists) {
                const teamData = db.collection("Organizations").doc(data.OrganizationEmail).collection("Teams").doc(team.Name).update({
                    Team: team,
                    TeamMemberEmails: teamMemberEmails,
                });
                return Promise.resolve(teamData);
            } else {
                const teamData = db.collection("Organizations").doc(data.OrganizationEmail).collection("Teams").doc(team.Name).set({
                    Team: team,
                    TeamMemberEmails: teamMemberEmails,
                });
                return Promise.resolve(teamData);
            }
        });
        let result;
        return Promise.resolve(promise1).then(() => {
                result = { data: "Created Team Successfully" };
                console.log("Created Team Successfully");
                return response.status(200).send(result);
            })
            .catch((error) => {
                result = { data: error };
                console.error("Error Creating Team", error);
                return response.status(500).send(result);
            });
    });
});

exports.createOrganizationLabels = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const data = request.body.data;
        console.log(data);
        return response.status(200).send({ data: "Working" });
    });
});