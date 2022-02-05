/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
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

fastify.post("/addNote", (req, res) => {
    addNote(req, res);
});

fastify.post("/getMyNotesList", (req, res) => {
    getMyNotesList(req, res);
});

fastify.post("/deleteNote", (req, res) => {
    deleteNote(req, res);
});

fastify.post("/editNote", (req, res) => {
    editNote(req, res);
});

exports.quickNotes = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
            if (err) throw err;
            requestHandler(req, res);
        });
    });
});