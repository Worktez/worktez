/* eslint-disable max-len */
const admin = require("firebase-admin");


const db = admin.firestore();

exports.sendVerificationEmail = function(teamName, teamManagerEmail, teamDescription, userEmail, organizationDomain) {
  const sendEmailPromise = db.collection("mail").add({
    to: userEmail,
    message: {
      subject: teamManagerEmail + " invited you to Join " + teamName,
      html: "<div style=\"width: 70%; margin: auto;  text-align: center;\"><h1 style=\"color: #5A20F0; font-size: 36px;\">Welcome to Worktrolly</h1><div style=\"color: #000; background-color: #d5d9e6; border: 1px solid; \"><div style=\"padding: 30px;\"><h2 style=\"font-size: 26px;\">" + teamName +
              "</h2><h2 style=\"padding-bottom: 10px\">" + teamDescription +
              "</h2><a href=\"http://localhost:4200/verifyUser/" + organizationDomain + "/" + teamName + "/" + userEmail +"\" style=\"background-color: #5A20F0; color: white; text-decoration:none; padding: 15px; margin-bottom: 5px;\">Join Team</a></div></div></div>",
    },
  });
  return Promise.resolve(sendEmailPromise).then(() => {
    console.log("Verification Email Sent Successfully!");
    return 0;
  })
      .catch((error) => {
        console.error("Error in Sending Verification Email: ", error);
      });
};
