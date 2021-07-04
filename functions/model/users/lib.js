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
    });
    return Promise.resolve(userData);
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