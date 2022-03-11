/* eslint-disable linebreak-style */

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

/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { createTeam } = require("./tark/createTeam");
const { addMember } = require("./tark/addMember");
const { removeMember } = require("./tark/removeMember");
const { updateTeam } = require("./tark/updateTeam");
const { getTeamData } = require("./tark/getTeamData");
const { deleteTeam } = require("./tark/deleteTeam");
const { setDefaultLabelProperties } = require("./tark/setDefaultLabels");

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
  console.log("calling gettingTeamData api");
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

/**
 * Description
 * @param {any} "/setLabelProperties"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
 fastify.post("/setLabelProperties", (req, res) => {
  setDefaultLabelProperties(req, res);
});

/**
 * Description
 * @param {any} "/setLabelProperties"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
 fastify.post("/seDefaultLabels", (req, res) => {
  setDefaultLabels(req, res);
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
