/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
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
const { scheduleMeet } = require("./tark/scheduleMeet");
const { getMeetDetails } = require("./tark/getMeetDetails");
const { deleteMeet } = require("./tark/deleteMeet");
const { ignoreMeet } = require("./tark/ignoreMeet");

/**
 * Description
 * @param {any} "/scheduleMeet"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/scheduleMeet", (req, res) => {
  scheduleMeet(req, res);
});

/**
 * Description
 * @param {any} "/getMeetDetails"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getMeetDetails", (req, res) => {
  getMeetDetails(req, res);
});

/**
 * Description
 * @param {any} "/deleteMeet"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/deleteMeet", (req, res) => {
  deleteMeet(req, res);
});

/**
 * Description
 * @param {any} "/ignoreMeet"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/ignoreMeet", (req, res) => {
  ignoreMeet(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.meet = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});

