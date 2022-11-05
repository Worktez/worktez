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

const { addUserNote } = require("../lib");
const { getUser, updateUser } = require("../../users/lib");

exports.addNote = function(request, response) {
  const uid = request.body.data.Uid;
  const title = request.body.data.Title;
  const note = request.body.data.Note;
  const lastUpdatedDate = request.body.data.LastUpdatedDate;
  const lastUpdatedTime = request.body.data.LastUpdatedTime;

  let result;
  let status = 200;


  const promise1 = getUser(uid, "").then((userData) => {
    let docId = "";
    if (userData) {
      let notecounter=userData.NoteCounter;
      notecounter = notecounter+1;
      docId= "q" + notecounter;

      const updateUserInputJson = {
        NoteCounter: notecounter,
      };
      updateUser(updateUserInputJson, uid);

      addUserNote(uid, title, note, docId, lastUpdatedDate, lastUpdatedTime).then((notesData) => {
        console.log("note added Successfully");
      }).catch((error) => {
        result = { data: error };
        status = 500;
        console.error("Error", error);
      });
    }
  });

  const Promises = [promise1];
  return Promise.all(Promises).then(() => {
    result = { data: "User Note Added successfully" };
    return response.status(status).send(result);
  }).catch((error) => {
    result = { data: error };
    console.error("Error adding Note", error);
    return response.status(status).send(result);
  });
};