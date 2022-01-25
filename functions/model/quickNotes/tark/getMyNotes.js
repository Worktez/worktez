/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
const { getNotes } = require("../lib");

exports.getMyNotesList = function(request, response) {
    const uid = request.body.data.Uid;

    let status = 200;

    getNotes(uid).then((noteData) => {
       if (noteData) {
          result = { data: {status: "OK", data: noteData} };
          return response.status(status).send(result);
       }
    }).catch((err) => {
        status = 500;
        console.error(err);
        return response.status(status).send(err);
    });
};