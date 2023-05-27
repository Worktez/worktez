/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const {functions, cors, fastify, requestHandler} = require("../application/lib");
const {addRoadmap} = require("./tark/addRoadmap");
const {editRoadmap} = require("./tark/editRoadmap");
const {deleteRoadmap} = require("./tark/deleteRoadmap");

/**
 * Description
 * @param {any} "/addRoadmap"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addRoadmap", (req, res) => {
  addRoadmap(req, res);
});

/**
 * Description
 * @param {any} "/editRoadmap"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/editRoadmap", (req, res) => {
  editRoadmap(req, res);
});

/**
 * Description
 * @param {any} "/deleteRoadmap"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/deleteRoadmap", (req, res) => {
  deleteRoadmap(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.roadmap = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});
