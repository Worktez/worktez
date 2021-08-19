/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// const admin = require("firebase-admin");

const { sendMail } = require("./lib");

exports.sendVerificationEmail = function(teamName, teamManagerEmail, teamDescription, userEmail, organizationDomain) {
    return sendMail(userEmail, teamManagerEmail, teamName, teamDescription, organizationDomain).then(() => {
            console.log("Verification Email Sent Successfully!");
            return 0;
        })
        .catch((error) => {
            console.error("Error in Sending Verification Email: ", error);
        });
};