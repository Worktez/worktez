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
const {scheduleMeet} = require("./tark/scheduleMeet");
const {addAttendee} = require("./tark/addAttendee");
// const {addAttendeeAtWorktez} = require("./tark/addAttendeeAtworktez");
const { getMeetDetails } = require("./tark/getMeetDetails");
const {deleteMeet} = require("./tark/deleteMeet");

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
 * @param {any} "/addAttendee"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addAttendee", (req, res) => {
  addAttendee(req, res);
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

// /**
//  * Description
//  * @param {any} "/addAttendeeAtWorktez"
//  * @param {any} req
//  * @param {any} res
//  * @returns {any}
//  */
// fastify.post("/addAttendeeAtWorktez", (req, res) => {
//   addAttendeeAtWorktez(req, res);
// });

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */

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


exports.meet = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});
