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
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
const { getTeam, updateTeamDetails } = require("../../teams/lib");
const { updatePatchData } = require("../lib");
const { getOrg } = require("../../organization/lib");

exports.patch8 = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const newfield = request.body.data.newField;
  const newFieldValue = request.body.data.NewFieldValue;
  const newFieldValueType = request.body.data.NewFieldValueType;
  const uid = request.body.data.Uid;
  const promise1 = getOrg(orgDomain).then((orgData) => {
    if (orgData != undefined) {
      const teamNames = orgData.TeamsName;
      teamNames.forEach((teamName) => {
        getTeam(orgDomain, teamName).then((team) => {
          console.log(team.teamName);
          data = {};
          if (newFieldValueType == "Array") {
            data[newfield] = [];
          } else if (newFieldValueType == "String") {
            data[newfield] = newFieldValue;
          } else if (newFieldValueType == "Number") {
            data[newfield] = Number(newFieldValue);
          }
          updateTeamDetails(data, orgDomain, teamName);
        });
      });
    }
});
    const Promises = [promise1];
    Promise.all(Promises).then(() => {
      result = {data: "OK! Patch8 executed"};
      updatePatchData("Patch8", {LastUsedByUid: uid, LastUsedByOrg: orgDomain});
      console.log("Patch8 executed successfully");
      return response.status(200).send(result);
    }).catch(function(error) {
      result = {data: error};
      console.error("Patch8 error in updating all tasks", error);
      return response.status(500).send(result);
  });
};
