/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable-next-line no-dupe-else-if */
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
const { createNewSprint } = require("../sprints/tark/createNewSprint");
const { updateSprintStatus } = require("../sprints/tark/updateSprintStatus");
const { getSprintDetails } = require("../sprints/tark/getSprintDetails");


/**
 * Description
 * @param {any} "/createNewSprint"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/createNewSprint", (req, res) => {
  createNewSprint(req, res);
});

/**
 * Description
 * @param {any} "/getSprintDetails"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getSprintDetails", (req, res) => {
  getSprintDetails(req, res);
});

/**
 * Description
 * @param {any} "/updateSprintStatus"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/updateSprintStatus", (req, res) => {
  updateSprintStatus(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.sprints = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
          requestHandler(req, res);
      });
  });
});
