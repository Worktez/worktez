/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { addNote } = require("./tark/addNote");
const { getMyNotesList } = require("./tark/getMyNotes");
// const { deleteNote } = require("./tark/deleteNote");

fastify.post("/addNote", (req, res) => {
    addNote(req, res);
});

fastify.post("/getMyNotesList", (req, res) => {
    getMyNotesList(req, res);
});

// fastify.post("/deleteNote", (req, res) => {
//     deleteNote(req, res);
// });

exports.quickNotes = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
            if (err) throw err;
            requestHandler(req, res);
        });
    });
});