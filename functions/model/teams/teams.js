/* eslint-disable linebreak-style */
/* eslint-disable max-len */

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


const {functions, cors, fastify, requestHandler} = require("../application/lib");
const {createTeam} = require("./tark/createTeam");
const {addMember} = require("./tark/addMember");
const {removeMember} = require("./tark/removeMember");
const {updateTeam} = require("./tark/updateTeam");
const {getTeamData} = require("./tark/getTeamData");
const {deleteTeam} = require("./tark/deleteTeam");
const {getLabelByScope} = require("./tark/getTeamLabels");
const {deleteLabel} = require("./tark/deleteLabel");
const {editLabel} = require("./tark/editLabel");
const {addLabel} = require("./tark/addLabel");
const {addProjLink} = require("./tark/addProjLink");
const {createDefaultLabels} = require("./tark/createDefaultLabels");
const {getLabelsInScopes} = require("./tark/getTeamLabelsInScope");

/**
 * Description
 * @param {any} "/addMember"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addMember", (req, res) => {
  addMember(req, res);
});

/**
 * Description
 * @param {any} "/createTeam"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/createTeam", (req, res) => {
  createTeam(req, res);
});

/**
 * Description
 * @param {any} "/deleteTeam"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/deleteTeam", (req, res) => {
  deleteTeam(req, res);
});

/**
 * Description
 * @param {any} "/getTeamData"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getTeamData", (req, res) => {
  getTeamData(req, res);
});

/**
 * Description
 * @param {any} "/removeMember"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/removeMember", (req, res) => {
  removeMember(req, res);
});

/**
 * Description
 * @param {any} "/updateTeam"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/updateTeam", (req, res) => {
  updateTeam(req, res);
});

fastify.post("/addProjLink", (req, res) => {
  addProjLink(req, res);
});

/**
 * Description
 * @param {any} "/deleteLabel"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/deleteLabel", (req, res) => {
  deleteLabel(req, res);
});

/**
 * Description
 * @param {any} "/addLabel"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addLabel", (req, res) => {
  addLabel(req, res);
});

/**
 * Description
 * @param {any} "/getLabelByScope"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getLabelByScope", (req, res) => {
  getLabelByScope(req, res);
});

/**
 * Description
 * @param {any} "/getLabelByScope"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getLabelsInScopes", (req, res) => {
  getLabelsInScopes(req, res);
});

/**
 * Description
 * @param {any} "/editLabel"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/editLabel", (req, res) => {
  editLabel(req, res);
});

/**
 * Description
 * @param {any} "/createDefaultLabel"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/createDefaultLabels", (req, res) => {
  createDefaultLabels(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.teams = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});
