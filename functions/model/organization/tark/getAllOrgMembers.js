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

const {getAllMembers} = require("../lib");

exports.getAllOrgMembers = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  let result;
  const members = [];
  let status = 200;

  const p1 = getAllMembers(orgDomain).then((snapshot) => {
    if (snapshot == undefined) {
      result = {data: {status: "ERROR", membersData: undefined}};
    } else {
      snapshot.forEach((element) => {
        const data = element.data();
        members.push(data);
      });
      result = {data: {status: "OK", membersData: members}};
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });
  return Promise.resolve(p1).then(() => {
    console.log("Fetched All Members Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Fetching All Members", error);
    return response.status(status).send(result);
  });
};