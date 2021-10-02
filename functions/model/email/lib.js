/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// const admin = require("firebase-admin");
// const db = admin.firestore();

const { db } = require("../application/lib");

exports.sendMail = function(userEmail, subjectMessage, htmlMessage) {
    const sendEmailPromise = db.collection("mail").add({
        to: userEmail,
        message: {
            subject: subjectMessage,
            html: htmlMessage,
        },
    });
    return Promise.resolve(sendEmailPromise);
};