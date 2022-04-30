/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
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
/* eslint-disable no-unused-vars */
// eslint-disable-next-line max-len
const {functions, cors, fastify, requestHandler} = require("../application/lib");
const {createFilter} = require("./tark/createFilter");
const {deleteFilter} = require("./tark/deleteFilter");
const {editFilter} = require("./tark/editFilter");
const {createFilterProperties} = require("./tark/createFilterProperties");
const {getFilterById} = require("./lib");

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
  getFilterById(req, res);
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
 * @param {any} "/createFilterProperties"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/createFilterProperties", (req, res) => {
  createFilterProperties(req, res);
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
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.filterPage = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});


