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

const { createOrg } = require("./tark/createOrg");
const { getOrgData } = require("./tark/getOrganizationData");
const { updateProfilePic } = require("./tark/updateOrg");
const { getMemberDetails } = require("./tark/getMember");
const { getAllOrgMembers } = require("./tark/getAllOrgMembers");
const { editRole } = require("./tark/changeMemberRole");
const { removeOrgMember } = require("./tark/removeOrgMember");

/**
 * Description
 * @param {any} "/createOrg"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/createOrg", (req, res) => {
  createOrg(req, res);
});

/**
 * Description
 * @param {any} "/updateOrg"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/updateOrgLogo", (req, res) => {
  updateProfilePic(req, res);
});

/**
 * Description
 * @param {any} "/getOrgData"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getOrgData", (req, res) => {
  getOrgData(req, res);
});

/**
 * Description
 * @param {any} "/getMemberDetails"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getMemberDetails", (req, res) => {
  getMemberDetails(req, res);
});

/**
 * Description
 * @param {any} "/getMemberDetails"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getAllOrgMembers", (req, res) => {
  getAllOrgMembers(req, res);
});

/**
 * Description
 * @param {any} "/changeMemberRole"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/changeMemberRole", (req, res) => {
  editRole(req, res);
});

/**
 * Description
 * @param {any} "/removeOrgMember"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/removeOrgMember", (req, res) => {
  removeOrgMember(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.organization = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});