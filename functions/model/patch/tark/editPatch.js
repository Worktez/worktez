/***********************************************************
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
/* eslint-disable linebreak-style */

const {updatePatchData, getPatchData} = require("../lib");

exports.editPatch = function(request, response) {
  const name = request.body.data.Name;
  const description = request.body.data.Description;
  const patchId = request.body.data.Id;
  const updatedOn = request.body.data.UpdatedOn;
  let status = 200;

  const editPatchPromise = getPatchData(patchId).then((patch) => {
    if (patch != undefined) {
      const updatePatchJson = {
        Name: name,
        Description: description,
        UpdatedOn: updatedOn,
      };
      updatePatchData(patchId, updatePatchJson);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error: ", error);
  });
  const Promises = [editPatchPromise];
  return Promise.all(Promises).then(() => {
    return response.status(status).json({data: "success"});
  })
      .catch((error) => {
        console.error("Error Editing Patch: ", error);
      });
};
