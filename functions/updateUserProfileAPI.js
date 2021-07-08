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

exports.updateUserProfile = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const uid = request.body.data.Uid;
        const displayName = request.body.data.DisplayName;
        const aboutMe = request.body.data.AboutMe;
        const phoneNumber = request.body.data.PhoneNumber;
        const linkedInProfile = request.body.data.LinkedInProfile;
        const githubProfile = request.body.data.GithubProfile;
        let result;

        db.collection("Users").doc(uid).update({
            displayName: displayName,
            AboutMe: aboutMe,
            phoneNumber: phoneNumber,
            LinkedInProfile: linkedInProfile,
            GithubProfile: githubProfile
        }).then(() => {
            result = { data: "User Profile updated successfully" };
            console.log("Successful");
            return response.status(200).send(result);
        }).catch((error) => {
            result = { data: error };
            console.error("Error", error);
            return response.status(500).send(result);
        });
    });
});

exports.updateTheme = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const uid = request.body.data.Uid;
        const appTheme = request.body.data.AppTheme;
        let result;

        db.collection("Users").doc(uid).update({
            AppTheme: appTheme,
        }).then(() => {
            result = { data: "User theme updated successfully" };
            console.log("Successful");
            return response.status(200).send(result);
        }).catch((error) => {
            result = { data: error };
            console.error("Error", error);
            return response.status(500).send(result);
        });
    });
});