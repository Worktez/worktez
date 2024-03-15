/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

/**
 * Description
 * @param {any} "../application/lib"
 * @returns {any}
 */
const { db, currentDate, currentTime } = require("../application/lib");

/**
 * Description
 * @param {any} Uid
 * @param {any} PhotoURL
 * @param {any} DisplayName
 * @param {any} Email
 * @param {any} PhoneNumber
 * @param {any} ProviderId
 * @param {any} Username
 * @param {any} AppKey=""
 * @param {any} TeamId=""
 * @param {any} AboutMe=""
 * @param {any} AppTheme="theme-light"
 * @return {any}
 */
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
    Skills: [],
    NotesOrder: [],
    Website: "",
    Notification: 0,
    EducationCounter: 0,
    ExperienceCounter: 0,
    ProjectCounter: 0,
    TotalPhotoCounter: 0,
    NoteCounter: 0,
    UserPostsCounter: 0,
    UserReactionCounter: 0,
    UserCommentCounter: 0,
    UserRewardsCounter: 0,
    CompletedTaskCounter: 0,
  });
  return Promise.resolve(userData);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} Uid
 * @return {any}
 */
exports.updateUser = function(inputJson, Uid) {
  const promise = db.collection("Users").doc(Uid).update(inputJson);
  return Promise.resolve(promise);
};

/**
 * Description
 * @param {any} Uid
 * @param {any} username
 * @return {any}
 */
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

/**
 * Description
 * @param {any} emails
 * @return {any}
 */
exports.getAllPhotos = function(emails) {
  const data = [];
  const promise = db.collection("Users").where("email", "in", emails).get().then((doc) => {
    doc.forEach((user) => {
      data.push(user.data().photoURL);
    });
    return data;
  });
  return Promise.resolve(promise);
};

/**
 * Description
 * @param {any} emails
 * @return {any}
 */
exports.getAllUsersInEmail = function(emails) {
  const data = [];
  const promise = db.collection("Users").where("email", "in", emails).get().then((doc) => {
    doc.forEach((user) => {
      const userBasic = (({ uid, displayName, email, Username, AboutMe, photoURL }) => ({ uid, displayName, email, Username, AboutMe, photoURL }))(user.data());
      data.push(userBasic);
    });
    return data;
  });
  return Promise.resolve(promise);
};

/**
 * Description
 * @param {any} uids
 * @return {any}
 */
exports.getAllUsersInUids = function(uids) {
  const data = [];
  const promise = db.collection("Users").where("uid", "in", uids).get().then((doc) => {
    doc.forEach((user) => {
      const userBasic = (({ uid, displayName, email, Username, AboutMe, photoURL }) => ({ uid, displayName, email, Username, AboutMe, photoURL }))(user.data());
      data.push(userBasic);
    });
    return data;
  });
  return Promise.resolve(promise);
};

/**
 * Description
 * @param {any} email
 * @return {any}
 */
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

/**
 * Description
 * @return {any}
 */
exports.getAllUsers = function() {
  const promise = db.collection("Users").get().then((users) => {
    return users;
  });

  return Promise.resolve(promise);
};

/**
 * Description
 * @param {any} Uid
 * @param {any} orgDomain
 * @param {any} orgAppKey
 * @param {any} teams=[]
 * @param {any} defaultTeam=""
 * @return {any}
 */
exports.setMyOrgCollection = function(Uid, orgDomain, orgAppKey, teams = [], defaultTeam = "") {
  const setMyOrgPromise = db.collection("Users").doc(Uid).collection("MyOrganizations").doc(orgDomain).set({
    Uid: Uid,
    OrgAppKey: orgAppKey,
    Teams: teams,
    DefaultTeam: defaultTeam,
    OrgDomain: orgDomain,
    ActiveNotifications: 0,
    Status: "Active",
  });
  return Promise.resolve(setMyOrgPromise);
};

/**
 * Description
 * @param {any} Uid
 * @param {any} orgDomain
 * @return {any}
 */
exports.getMyOrgCollectionDoc = function(Uid, orgDomain) {
  const getMyOrgPromise = db.collection("Users").doc(Uid).collection("MyOrganizations").doc(orgDomain).get().then((doc) => {
    return doc.data();
  });
  return Promise.resolve(getMyOrgPromise);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} Uid
 * @param {any} orgDomain
 * @return {any}
 */
exports.updateMyOrgCollection = function(inputJson, Uid, orgDomain) {
  const promise = db.collection("Users").doc(Uid).collection("MyOrganizations").doc(orgDomain).update(inputJson);
  return Promise.resolve(promise);
};

/**
 * Description
 * @param {any} uid
 * @return {any}
 */
exports.getMyOrgCollection = function(uid) {
  const getMyOrgPromise = db.collection("Users").doc(uid).collection("MyOrganizations").get();
  return Promise.resolve(getMyOrgPromise);
};

/**
 * Description
 * @param {any} uid
 * @param {any} orgAppKey
 * @return {any}
 */
exports.getMyTeamCollection = function(uid, orgAppKey) {
  const promise = db.collection("Users").doc(uid).collection("MyOrganizations").where("OrgAppKey", "==", orgAppKey).get().then((doc) => {
    let data;
    doc.forEach((user) => {
      data = user.data();
    });
    if (data != undefined) {
      return data.Teams;
    }

    return undefined;
  });
  return Promise.resolve(promise);
};

/**
 * Description
 * @param {any} uid
 * @param {any} instituteName
 * @param {any} degree
 * @param {any} start
 * @param {any} end
 * @return {any}
 */
exports.addUserEducation = function(uid, instituteName, degree, start, end) {
  const addEducationPromise = db.collection("Users").doc(uid).collection("Education").doc().set({
    Start: start,
    End: end,
    InstituteName: instituteName,
    Degree: degree,
  });
  return Promise.resolve(addEducationPromise);
};

/**
 * Description
 * @param {any} uid
 * @param {any} educationDoc
 * @param {any} inputJson
 * @return {any}
 */
exports.updateUserEducation = function(uid, educationDoc, inputJson) {
  const updateEducationPromise = db.collection("Users").doc(uid).collection("Education").doc(educationDoc).update(inputJson);
  return Promise.resolve(updateEducationPromise);
};

/**
 * Description
 * @param {any} uid
 * @return {any}
 */
exports.getAllUserEducation = function(uid) {
  const getEducationPromise = db.collection("Users").doc(uid).collection("Education").get().then((educations) => {
    return educations;
  });
  return Promise.resolve(getEducationPromise);
};

/**
 * Description
 * @param {any} uid
 * @param {any} organizationName
 * @param {any} position
 * @param {any} start
 * @param {any} end
 * @return {any}
 */
exports.addUserExperience = function(uid, organizationName, position, start, end) {
  const addExperiencePromise = db.collection("Users").doc(uid).collection("Experience").doc().set({
    Start: start,
    End: end,
    OrganizationName: organizationName,
    Position: position,
  });
  return Promise.resolve(addExperiencePromise);
};

/**
 * Description
 * @param {any} uid
 * @param {any} experienceDoc
 * @param {any} inputJson
 * @return {any}
 */
exports.updateUserExperience = function(uid, experienceDoc, inputJson) {
  const updateExperiencePromise = db.collection("Users").doc(uid).collection("Experience").doc(experienceDoc).update(inputJson);
  return Promise.resolve(updateExperiencePromise);
};

/**
 * Description
 * @param {any} uid
 * @return {any}
 */
exports.getAllUserExperience = function(uid) {
  const getExperiencePromise = db.collection("Users").doc(uid).collection("Experience").get().then((experiences) => {
    return experiences;
  });
  return Promise.resolve(getExperiencePromise);
};

/**
 * Description
 * @param {any} uid
 * @param {any} projectName
 * @param {any} description
 * @param {any} start
 * @param {any} end
 * @return {any}
 */
exports.addUserProject = function(uid, projectName, description, start, end) {
  const addProjectPromise = db.collection("Users").doc(uid).collection("Project").doc().set({
    Start: start,
    End: end,
    ProjectName: projectName,
    Description: description,
  });
  return Promise.resolve(addProjectPromise);
};

/**
 * Description
 * @param {any} uid
 * @param {any} projectDoc
 * @param {any} inputJson
 * @return {any}
 */
exports.updateUserProject = function(uid, projectDoc, inputJson) {
  const updateProjectPromise = db.collection("Users").doc(uid).collection("Project").doc(projectDoc).update(inputJson);
  return Promise.resolve(updateProjectPromise);
};

/**
 * Description
 * @param {any} uid
 * @return {any}
 */
exports.getAllUserProject = function(uid) {
  const getProjectPromise = db.collection("Users").doc(uid).collection("Project").get().then((projects) => {
    return projects;
  });
  return Promise.resolve(getProjectPromise);
};

/**
 * Description
 * @param {any} uid
 * @param {any} rewardId
 * @return {any}
 */

exports.addUserRewards = (uid, rewardName, rewardeeName, logo, rewardId, digitalAssetId, orgDomain, description) => {
  const addUserRewardsPromise = db.collection("Users").doc(uid).collection("Rewards").doc(rewardId).set({
    AchievementDate: currentDate,
    AchievementTime: currentTime,
    AchievementId: rewardId,
    DigitalAssetId: digitalAssetId,
    RewardName: rewardName,
    RewardeeName: rewardeeName,
    Logo: logo,
    // ExpiryDate: expiryDate,
    // ExpiryTime: expiryTime,
    OrgDomain: orgDomain,
    Description: description,
  });
  return Promise.resolve(addUserRewardsPromise);
};


/**
 * Description
 * @param {any} uid
 */

exports.getAllUserRewards = (uid) => {
  const getAllUserRewardsPromise = db.collection("Users").doc(uid).collection("Rewards").get().then((doc)=> {
    let data;
    const rewards =[];
    doc.forEach((user) => {
      data = user.data();
      rewards.push(data);
    });
    if (rewards != undefined) {
      return rewards;
    }
    return undefined;
  });
  return Promise.resolve(getAllUserRewardsPromise);
};

exports.getMyTeamCollection = function(uid, orgAppKey) {
  const promise = db.collection("Users").doc(uid).collection("MyOrganizations").where("OrgAppKey", "==", orgAppKey).get().then((doc) => {
    let data;
    doc.forEach((user) => {
      data = user.data();
    });
    if (data != undefined) {
      return data.Teams;
    }

    return undefined;
  });
  return Promise.resolve(promise);
};
