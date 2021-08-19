/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// const admin = require("firebase-admin");
// const db = admin.firestore();

const { db } = require("../application/lib");

exports.setUser = function(Uid, PhotoURL, DisplayName, Email, PhoneNumber, ProviderId, AppKey = "", TeamId = "", AboutMe = "", AppTheme = "theme-light") {
    const userData = db.collection("Users").doc(Uid).set({
        AppKey: AppKey,
        TeamId: TeamId,
        uid: Uid,
        photoURL: PhotoURL,
        displayName: DisplayName,
        email: Email,
        phoneNumber: PhoneNumber,
        providerId: ProviderId,
        AboutMe: AboutMe,
        AppTheme: AppTheme,
        GithubProfile: "",
        LinkedInProfile: "",
        DateOfJoining: "",
    });
    return Promise.resolve(userData);
};

exports.updateUser = function(inputJson, Uid) {
    const promise = db.collection("Users").doc(Uid).update(inputJson);

    return Promise.resolve(promise);
};

exports.getUser = function(Uid) {
    console.log("Uid : " + Uid);
    const promise = db.collection("Users").doc(Uid).get().then((doc) => {
        if (doc.exists) {
            return (doc.data());
        } else {
            return;
        }
    });

    return Promise.resolve(promise);
};

exports.getUserUseEmail = function(email) {
    const promise = db.collection("Users").where("email", "==", email).get().then((doc) => {
        let data;
        doc.forEach((user) => {
            data = user.data();
        });
        return data();
    });

    return Promise.resolve(promise);
};

exports.sendMail = function(userEmail, teamManagerEmail, teamName, teamDescription, organizationDomain) {
    const sendEmailPromise = db.collection("mail").add({
        to: userEmail,
        message: {
            subject: teamManagerEmail + " invited you to Join " + teamName,
            html: "<div style=\"width: 70%; margin: auto;  text-align: center;\"><h1 style=\"color: #5A20F0; font-size: 36px;\">Welcome to Worktrolly</h1><div style=\"color: #000; background-color: #d5d9e6; border: 1px solid; \"><div style=\"padding: 30px;\"><h2 style=\"font-size: 26px;\">" + teamName +
                "</h2><h2 style=\"padding-bottom: 10px\">" + teamDescription +
                "</h2><a href=\"https://worktrolly.web.app/verifyUser/" + organizationDomain + "/" + teamName + "/" + userEmail + "\" style=\"background-color: #5A20F0; color: white; text-decoration:none; padding: 15px; margin-bottom: 5px;\">Join Team</a></div></div></div>",
        },
    });
    return Promise.resolve(sendEmailPromise);
};