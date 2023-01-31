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

const { addUserNote, getNotes, reorderQuickNotes } = require("../lib");
const { getUser, updateUser } = require("../../users/lib");
const { element } = require("protractor");

exports.reorderNotes = function(request, response) {
  const uid = request.body.data.Uid;
  const notesOrder = request.body.data.NotesOrder;
  console.log("reached here", uid, notesOrder);
 

  let result;
  let status = 200;
  const updateUserInputJson = {
    NotesOrder : notesOrder
  }
  
  const promise1 =  updateUser(updateUserInputJson, uid).then(() => {
    console.log("Notes order rearranged");
  }).catch((error) => {
    status = 500;
    console.error("Error", error);
  });
  
    
    
  

  const Promises = [promise1];
  return Promise.all(Promises).then(() => {
    console.log("reodering this");
    result = { data: "User Note Added successfully" };
    return response.status(status).send(result);
  }).catch((error) => {
    result = { data: error };
    console.error("Error adding Note", error);
    return response.status(status).send(result);
  });
};