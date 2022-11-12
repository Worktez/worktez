/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Abhishek Mishra <am1426620@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const {getOrgMember, getOrgUseAppKey} = require("../lib");

exports.getMemberDetails = function(request, response) {
  const orgAppKey = request.body.data.OrgAppKey;
  const email = request.body.data.Email;
  let result;
  let status = 200;

  const promise1 = getOrgUseAppKey(orgAppKey).then((orgData) => {
    const p1 = getOrgMember(orgData.OrganizationDomain, email).then((memberDoc) => {
      if (memberDoc == undefined) {
        result = {data: {status: "ERROR", memberData: undefined}};
      } else {
        result = {data: {status: "OK", memberData: memberDoc}};
      }
    });
    return Promise.resolve(p1);
  })
      .catch((error) => {
        status = 500;
        console.log("Error:", error);
      });
  return Promise.resolve(promise1).then(() => {
    console.log("Fetched Member Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Fetching Member", error);
    return response.status(status).send(result);
  });
};
