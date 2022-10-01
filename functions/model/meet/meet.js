/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
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
const {scheduleMeetAtWorktez} = require("./tark/scheduleMeetAtworktez");
// const {addAttendeeAtWorktez} = require("./tark/addAttendeeAtworktez");
const { getMeetDetails } = require("./tark/getMeetDetails");

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
 * @param {any} "/scheduleMeetAtWorktez"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/scheduleMeetAtWorktez", (req, res) => {
  scheduleMeetAtWorktez(req, res);
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
exports.meet = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});
