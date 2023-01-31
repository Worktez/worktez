/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

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
const { addNote } = require("./tark/addNote");
const { getMyNotesList } = require("./tark/getMyNotes");
const { deleteNote } = require("./tark/deleteNote");
const { editNote } = require("./tark/editNote");
const { reorderNotes } = require("./tark/reorderNotes");

/**
 * Description
 * @param {any} "/addNote"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addNote", (req, res) => {
  addNote(req, res);
});

/**
 * Description
 * @param {any} "/getMyNotesList"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getMyNotesList", (req, res) => {
  getMyNotesList(req, res);
});

/**
 * Description
 * @param {any} "/deleteNote"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/deleteNote", (req, res) => {
  deleteNote(req, res);
});

/**
 * Description
 * @param {any} "/editNote"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/editNote", (req, res) => {
  editNote(req, res);
});

/**
 * Description
 * @param {any} "/reorderNotes"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/reorderNotes", (req, res) => {
  reorderNotes(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.quickNotes = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});