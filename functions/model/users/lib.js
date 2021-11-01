/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { db } = require("../application/lib");

exports.setUser = function(Uid, PhotoURL, DisplayName, Email, PhoneNumber, ProviderId, Username, AppKey = "", TeamId = "", AboutMe = "", AppTheme = "theme-light") {
    const userData = db.collection("Users").doc(Uid).set({
        SelectedOrgAppKey: AppKey,
        SelectedTeamId: TeamId,
        uid: Uid,
        photoURL: PhotoURL,
        displayName: DisplayName,
        email: Email,
        phoneNumber: PhoneNumber,
        providerId: ProviderId,
        Username: Username,
        AboutMe: AboutMe,
        AppTheme: AppTheme,
        GithubProfile: "",
        LinkedInProfile: "",
        DateOfJoining: "",
        Skills: "",
        Education: "",
        Experience: "",
        Projects: "",
        Website: "",
    });
    return Promise.resolve(userData);
};

exports.updateUser = function(inputJson, Uid) {
    const promise = db.collection("Users").doc(Uid).update(inputJson);

    return Promise.resolve(promise);
};

exports.getUser = function(Uid, username) {
    let query = db.collection("Users");

    if (username != "") {
        query = query.where("Username", "==", username);
    }

    if (Uid != "") {
        query = query.where("uid", "==", Uid);
    }

    const promise = query.get().then((doc) => {
        let data;
        doc.forEach((element) => {
            if (element.exists) {
                data = element.data();
            }
        });
        return data;
    });

    return Promise.resolve(promise);
};

exports.getAllPhotos = function(emails) {
    const data=[];
    const promise = db.collection("Users").where("email", "in", emails).get().then((doc) => {
        doc.forEach((user) => {
            data.push(user.data().photoURL);
        });
        return data;
    });
    return Promise.resolve(promise);
};

exports.getUserUseEmail = function(email) {
    const promise = db.collection("Users").where("email", "==", email).get().then((doc) => {
        let data;
        doc.forEach((user) => {
            data = user.data();
        });
        return data;
    });

    return Promise.resolve(promise);
};

exports.getAllUsers = function() {
    const promise = db.collection("Users").get().then((users) => {
        return users;
    });

    return Promise.resolve(promise);
};

exports.setMyOrgCollection = function(Uid, orgDomain, orgAppKey, teams = [], defaultTeam = "") {
    const setMyOrgPromise = db.collection("Users").doc(Uid).collection("MyOrganizations").doc(orgDomain).set({
        Uid: Uid,
        OrgAppKey: orgAppKey,
        Teams: teams,
        DefaultTeam: defaultTeam,
        OrgDomain: orgDomain,
    });
    return Promise.resolve(setMyOrgPromise);
};

exports.getMyOrgCollectionDoc = function(Uid, orgDomain) {
    const getMyOrgPromise = db.collection("Users").doc(Uid).collection("MyOrganizations").doc(orgDomain).get().then((doc) => {
        if (doc.exists) {
            return doc.data();
        } else {
            return;
        }
    });
    return Promise.resolve(getMyOrgPromise);
};

exports.updateMyOrgCollection = function(inputJson, Uid, orgDomain) {
    const promise = db.collection("Users").doc(Uid).collection("MyOrganizations").doc(orgDomain).update(inputJson);

    return Promise.resolve(promise);
};

exports.getMyOrgCollection = function(uid) {
    const getMyOrgPromise = db.collection("Users").doc(uid).collection("MyOrganizations").get();
    return Promise.resolve(getMyOrgPromise);
};

exports.getMyTeamCollection = function(uid, orgAppKey) {
    const promise = db.collection("Users").doc(uid).collection("MyOrganizations").where("OrgAppKey", "==", orgAppKey).get().then((doc) => {
        let data;
        doc.forEach((user) => {
            data = user.data();
        });
        return data.Teams;
    });
    return Promise.resolve(promise);
};