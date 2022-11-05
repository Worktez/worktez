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

const { updateUser } = require("../lib");

exports.updateTheme = function(request, response) {
  const uid = request.body.data.Uid;
  const appTheme = request.body.data.AppTheme;
  let result;

  const updateUserInputJson = {
    AppTheme: appTheme,
  };
  updateUser(updateUserInputJson, uid).then(() => {
    result = { data: "User theme updated successfully" };
    return response.status(200).send(result);
  }).catch((error) => {
    result = { data: error };
    console.error("Error", error);
    return response.status(500).send(result);
  });
};