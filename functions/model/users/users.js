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


const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { updateUser } = require("./tark/updateUser");
const { updateTheme } = require("./tark/updateTheme");
const { verifyUser } = require("./tark/verifyUser");
const { checkAvailableUsername } = require("./tark/checkAvailableUsername");
const { getMyOrgList } = require("./tark/getMyOrgList");
const { getMyTeamsList } = require("./tark/getMyTeamsList");
const { setMyOrganization } = require("./tark/setMyOrganization");
const { updateSelectedTeam } = require("./tark/updateSelectedTeam");
const { getUserByEmail } = require("./tark/getUserByEmail");
const { getPhotoURLList } = require("./tark/getPhotoURLList");
const { getMyOrgCollectionDocs } = require("./tark/getMyOrgCollectionDoc");
const { createNewUser } = require("./tark/createNewUser");
const { getUserAppSettings } = require("./tark/getUserAppSettings");
const { getEducationList } = require("./tark/getEducationList");
const { getExperienceList } = require("./tark/getExperienceList");
const { getProjectList } = require("./tark/getProjectList");
const { updateEducation } = require("./tark/updateEducation");
const { updateExperience } = require("./tark/updateExperience");
const { updateProject } = require("./tark/updateProject");
const { addEducation } = require("./tark/addEducation");
const { addExperience } = require("./tark/addExperience");
const { addProject } = require("./tark/addProject");
const { updateUserSkill } = require("./tark/updateSkills");
const { updateProfilePic } = require("./tark/updateProfilePic");
const { getUserByUid } = require("./tark/getUserByUid");
const { getUserByUsername } = require("./tark/getUserByUsername");
const { checkIfUserAlreadyAMember } = require("./tark/checkIfUserAlreadyAMember");


/**
 * Description
 * @param {any} "/createNewUser"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/createNewUser", (req, res) => {
  createNewUser(req, res);
});

/**
 * Description
 * @param {any} "/getUserAppSettings"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getUserAppSettings", (req, res) => {
  getUserAppSettings(req, res);
});

/**
 * Description
 * @param {any} "/checkAvailableUsername"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/checkAvailableUsername", (req, res) => {
  checkAvailableUsername(req, res);
});

/**
 * Description
 * @param {any} "/getMyOrgCollectionDocs"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getMyOrgCollectionDocs", (req, res) => {
  getMyOrgCollectionDocs(req, res);
});

/**
 * Description
 * @param {any} "/getMyOrgList"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getMyOrgList", (req, res) => {
  getMyOrgList(req, res);
});

/**
 * Description
 * @param {any} "/getMyTeamsList"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getMyTeamsList", (req, res) => {
  getMyTeamsList(req, res);
});

/**
 * Description
 * @param {any} "/getPhotoURLList"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getPhotoURLList", (req, res) => {
  getPhotoURLList(req, res);
});

/**
 * Description
 * @param {any} "/getUserByEmail"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getUserByEmail", (req, res) => {
  getUserByEmail(req, res);
});

/**
 * Description
 * @param {any} "/getUserByUid"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getUserByUid", (req, res) => {
  getUserByUid(req, res);
});

/**
 * Description
 * @param {any} "/setMyOrganization"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/setMyOrganization", (req, res) => {
  setMyOrganization(req, res);
});

/**
 * Description
 * @param {any} "/updateSelectedTeam"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/updateSelectedTeam", (req, res) => {
  updateSelectedTeam(req, res);
});

/**
 * Description
 * @param {any} "/updateUser"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/updateUser", (req, res) => {
  updateUser(req, res);
});

/**
 * Description
 * @param {any} "/updateTheme"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/updateTheme", (req, res) => {
  updateTheme(req, res);
});

/**
 * Description
 * @param {any} "/verify"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/verify", (req, res) => {
  verifyUser(req, res);
});

/**
 * Description
 * @param {any} "/addEducation"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addEducation", (req, res) => {
  addEducation(req, res);
});

/**
 * Description
 * @param {any} "/updateEducation"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/updateEducation", (req, res) => {
  updateEducation(req, res);
});

/**
 * Description
 * @param {any} "/getAllEducation"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getAllEducation", (req, res) => {
  getEducationList(req, res);
});

/**
 * Description
 * @param {any} "/addExperience"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addExperience", (req, res) => {
  addExperience(req, res);
});

/**
 * Description
 * @param {any} "/updateExperience"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/updateExperience", (req, res) => {
  updateExperience(req, res);
});

/**
 * Description
 * @param {any} "/getAllExperience"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getAllExperience", (req, res) => {
  getExperienceList(req, res);
});

/**
 * Description
 * @param {any} "/addProject"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addProject", (req, res) => {
  addProject(req, res);
});

/**
 * Description
 * @param {any} "/updateProject"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/updateProject", (req, res) => {
  updateProject(req, res);
});

/**
 * Description
 * @param {any} "/getAllProject"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getAllProject", (req, res) => {
  getProjectList(req, res);
});

/**
 * Description
 * @param {any} "/updateSkill"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/updateSkill", (req, res) => {
  updateUserSkill(req, res);
});

/**
 * Description
 * @param {any} "/updateProfilePic"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/updateProfilePic", (req, res) => {
  updateProfilePic(req, res);
});

/**
 * Description
 * @param {any} "/getUserByUsername"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getUserByUsername", (req, res) => {
  getUserByUsername(req, res);
});

/**
 * Description
 * @param {any} "/checkIfUserAlreadyAMember"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/checkIfUserAlreadyAMember", (req, res) => {
  checkIfUserAlreadyAMember(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.users = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});
