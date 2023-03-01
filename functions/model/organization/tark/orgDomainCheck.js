/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Swapnil Bankar <swapnilbankar1010@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const { getApplicationData } = require("../../application/lib");

exports.orgDomainCheck = function(request, response) {
  let status = 200;
  let resultData = "";
  const orgDomain = request.body.data.OrganizationDomain;

  getApplicationData().then((orgDoc) => {
    for (let i = 0; i < orgDoc.OrgDomains.length; i++) {
      console.log(orgDoc.OrgDomains[i]);
      if (orgDoc.OrgDomains[i] == orgDomain) {
        resultData = "orgDomain Already taken";
        break;
      } else {
        resultData = "orgDomain Available";
      }
    }
    const result = { data: resultData};
    return response.status(status).send(result);
  }).catch((err) => {
    status = 500;
    resultData = "orgDomain Already taken";
    console.error("Error : " + err);
    const result = { data: resultData };
    return response.status(status).send(result);
  });
};