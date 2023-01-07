/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
/* eslint-disable max-len */
const {getAllReleaseData} = require("../lib");
const {setRelease} = require("../lib");

/**
 * Description
 * @param {any} request
 * @param {any} response
 */
exports.addRelease = function(request, response) {
  let result;
  let status = 200;
  const description = request.body.data.Description;
  const releaseName = request.body.data.ReleaseName;
  const tagName = request.body.data.TagName;
  const targetBranch = request.body.data.TargetBranch;
  const ifDraft = request.body.data.IfDraft;
  const preRelease = request.body.data.PreRelease;
  const generateRelease = request.body.data.GenerateRelease;
  const releaseDate = request.body.data.ReleaseDate;
  const teamId = request.body.data.TeamId;
  const orgDomain = request.body.data.OrgDomain;
  const title = request.body.data.Title;

  const promise = getAllReleaseData(orgDomain).then((data) => {
    this.releaseData = data;
    const releaseId = "R" + (this.releaseData.length +1);

    setRelease(description, releaseName, tagName, targetBranch, ifDraft, preRelease, generateRelease, teamId, releaseId, orgDomain, releaseDate, title).catch(
        (error) => {
          result = {data: error};
          status = 500;
          console.error("Error", error);
        });
    Promise.resolve(promise).then(() => {
      console.log("Release added Successfully");
      result = {data: "Release added Successfully"};
      return response.status(status).send(result);
    }).catch((error) => {
      console.error("Error adding release", error);
      return response.status(status).send(result);
    });
  });
};
