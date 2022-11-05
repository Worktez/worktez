/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Twinkle Chatterjee <ctwinkle2812@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const { updateOrg } = require("../lib");

exports.updateProfilePic = function(request, response) {
  const OrganizationLogoURL = request.body.data.PhotoURL;
  const orgDomain = request.body.data.OrgDomain;

  let result;

  const updateOrgInputJson = {
    OrganizationLogoURL: OrganizationLogoURL,
  };
  updateOrg(orgDomain, updateOrgInputJson).then(() => {
    result = { data: "Organisation Display Picture updated successfully" };
    console.log("Successful");
    return response.status(200).send(result);
  }).catch((error) => {
    result = { data: error };
    console.error("Error", error);
    return response.status(500).send(result);
  });
};
