/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Simran Nigam <nigamsimran14@gmail.com>
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
const {createFilter} = require("./tark/createFilter");
const { getFilter } = require("./tark/getFilter");
const {editFilter} = require("./tark/editFilter");
const {deleteFilter} = require("./tark/deleteFilter");

/**
 * Description
 * @param {any} "/createFilter"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/createFilter", (req, res) => {
  createFilter(req, res);
});

/**
 * Description
 * @param {any} "/getFilter"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getFilter", (req, res) => {
  getFilter(req, res);
});

/**
 * Description
 * @param {any} "/editFilter"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/editFilter", (req, res) => {
  editFilter(req, res);
});

/**
 * Description
 * @param {any} "/deleteFilter"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/deleteFilter", (req, res) => {
  deleteFilter(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.filters = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});


