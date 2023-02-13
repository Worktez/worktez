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
const {deleteUserNote, getNote} = require("../lib");
const { getUser, updateUser } = require("../../users/lib");

exports.deleteNote = function(request, response) {
  const uid = request.body.data.Uid;
  const docId = request.body.data.DocId;

  let result;
  let status = 200;

  const promise = getUser(uid, "").then((doc) => {
    const notesOrder = doc.NotesOrder;
    notesOrder.splice(notesOrder.indexOf(docId), 1);
    const updateUserInputJson = {
      NotesOrder: notesOrder,
    };
    const p1 = getNote(uid, docId).then((noteData) => {
      if (noteData == undefined) {
        result = {data: {status: "Note doesn't exist"}};
      } else {
        const updateNoteToJson = {
          Status: "DELETED",
        };
        deleteUserNote(updateNoteToJson, uid, docId);
        updateUser(updateUserInputJson, uid);

        // const comment = "Removed ";
      }
    }).catch((error) => {
      status = 500;
      console.log("Error:", error);
    });

    return Promise.resolve(p1);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Note Deleted Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = {data: error};
        console.error("Error Deleting", error);
        return response.status(status).send(result);
      });
};
