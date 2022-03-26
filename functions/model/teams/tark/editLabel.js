/* eslint-disable linebreak-style */
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

/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const {getLabelById, updateLabel} =require("../lib");

exports.editLabel = function(request, response) {
  const displayName = request.body.data.DisplayName;
  const iconName = request.body.data.IconName;
  const colorCode = request.body.data.ColorCode;
  const orgDomain = request.body.data.OrgDomain;
  const teamName = request.body.data.TeamName;
  const docId = request.body.data.Id;

  let result;
  let status = 200;

  const promise = getLabelById(orgDomain, teamName, docId).then((labelData) => {
    if (labelData == undefined) {
      result = {data: {status: "Label does not exist"}};
    } else {
      const inputJson = {
        DisplayName: displayName,
        IconName: iconName,
        ColorCode: colorCode,
      };
      updateLabel(inputJson, orgDomain, teamName, docId);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });


  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Label edited Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = {data: error};
        console.error("Error editing Label", error);
        return response.status(status).send(result);
      });
};
