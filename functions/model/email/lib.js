/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// const admin = require("firebase-admin");
// const db = admin.firestore();

const { db } = require("../application/lib");

exports.sendMail = function(userEmail, teamManagerEmail, teamName, teamDescription, organizationDomain) {
    const sendEmailPromise = db.collection("mail").add({
        to: userEmail,
        message: {
            subject: teamManagerEmail + " invited you to Join " + teamName,
            html: "<div style=\"width: 70%; margin: auto;  text-align: center;\"><h1 style=\"color: #dc3226; font-size: 36px;\">Welcome to Worktrolly</h1><div style=\"color: #000; background-color: #d5d9e6; border: 1px solid; \"><div style=\"padding: 30px;\"><h2 style=\"font-size: 26px;\">" + teamName +
                "</h2><h2 style=\"padding-bottom: 10px\">" + teamDescription +
                "</h2><a href=\"https://worktrolly.web.app/verifyUser/" + organizationDomain + "/" + teamName + "/" + userEmail + "\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px; margin-bottom: 5px;\">Join Team</a></div></div></div>",
        },
    });
    return Promise.resolve(sendEmailPromise);
};