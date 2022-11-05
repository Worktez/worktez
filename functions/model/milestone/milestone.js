/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Sanjay Krishna <sanjaykrishna1203@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { addMilestone } = require("../milestone/tark/addMilestone");
const { getAllMilestones } = require("../milestone/tark/getAllMilestones");
const { getMilestone } = require("../milestone/tark/getMilestone");
const { editMilestone } = require("../milestone/tark/editMilestone");
const { addTaskToMilestone } = require("../milestone/tark/addTask");

/**
 * Description
 * @param {any} "/addMilestone"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addMilestone", (req, res) => {
  addMilestone(req, res);
});

/**
 * Description
 * @param {any} "/getMilestone"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getMilestone", (req, res) => {
  getMilestone(req, res);
});

/**
 * Description
 * @param {any} "/getAllMilestones"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getAllMilestones", (req, res) => {
  getAllMilestones(req, res);
});

/**
 * Description
 * @param {any} "/editMilestone"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/editMilestone", (req, res) => {
  editMilestone(req, res);
});

/**
 * Description
 * @param {any} "/addTask"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addTask", (req, res) => {
  addTaskToMilestone(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.milestone = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});