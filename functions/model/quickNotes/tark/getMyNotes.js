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

const { getNotes } = require("../lib");

exports.getMyNotesList = function(request, response) {
  const uid = request.body.data.Uid;

  let status = 200;

  getNotes(uid).then((noteData) => {
    if (noteData) {
      const result = { data: {status: "OK", data: noteData} };
      return response.status(status).send(result);
    }
  }).catch((err) => {
    status = 500;
    console.error(err);
    return response.status(status).send(err);
  });
};