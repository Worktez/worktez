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
/* eslint-disable no-undef */
/* eslint-disable max-len */
const {getPatchData, setPatch} = require("../lib");

exports.patchModerator = function(request, response) {
  const Patch = request.body.data.Patch;
  const patchName = request.body.data.PatchName;
  const patchDescription = request.body.data.PatchDescription;
  const CreationDate = request.body.data.CreationDate;
  const UpdatedOn = request.body.data.UpdatedOn;
  const LastUsedByOrg = request.body.data.LastUsedByOrg;
  const LastUsedByUid = request.body.data.LastUsedByUid;

  const promise = getPatchData(Patch).then((patch) => {
    if (patch == undefined) {
      setPatch(Patch, patchName, patchDescription, CreationDate, UpdatedOn, LastUsedByOrg, LastUsedByUid);
    }
  });

  return Promise.resolve(promise).then(() => {
    result = {data: "Patch document created successfully"};
    console.log("Patch document created successfully");
    return response.status(200).send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error in creating Patch document", error);
    return response.status(500).send(result);
  });
};
