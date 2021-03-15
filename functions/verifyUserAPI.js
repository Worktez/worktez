/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

const admin = require("firebase-admin");

const db = admin.firestore();

exports.verifyUser = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const organizationDomain = request.body.data.OrganizationDomain;
        const teamName = request.body.data.TeamName;
        const userEmail = request.body.data.UserEmail;

        let organizationId = "";
        let userID = "";


        db.collection("Organizations").doc(organizationDomain).collection("Teams").doc(teamName).get().then((doc) => {
            const teamMembers = doc.data().TeamMembers;
            if (teamMembers.indexOf(userEmail) != -1) {
                db.collection("Organizations").doc(organizationDomain).get().then((doc) => {
                    organizationId = doc.data().OrganizationId;
                    const p11 = db.collection("Users").where("email", "==", userEmail).get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            userID = doc.data().uid;
                            const p111 = db.collection("Users").doc(userID).update({
                                OrganizationId: organizationId,
                            });
                            return Promise.resolve(p111);
                        });
                    });
                    return Promise.resolve(p11);
                });
                const result = { data: "User Verified Successfully" };
                console.log("User Verified Successfully");
                return response.status(200).send(result);
            } else {
                const result = { data: "Can't verify user" };
                console.log("Can't verify user");
                return response.status(500).send(result);
            }
        }).catch((error) => {
            const result = { data: error };
            console.error("Error ", error);
            return response.status(500).send(result);
        });
    });
});