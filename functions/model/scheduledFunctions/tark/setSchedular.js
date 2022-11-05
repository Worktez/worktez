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

const { getApplicationData, updateApplication } = require("../../application/lib");
const { setSchedular, getAllSchedular } = require("../lib");

exports.setSchedularUnit = function(schedularInput, orgId) {
  getAllSchedular(schedularInput.SelectedOrgAppKey, orgId).then((snapshot)=>{
    if (snapshot.docs.length != 0) {
      console.log("SCheduled Jobs already exists");
    } else {
      getApplicationData().then((appData) => {
        const totalNumberOfSchedularOrg = appData.TotalNumberSchedularOrg + 1;
        const appDetailsUpdateJson = {
          TotalNumberSchedularOrg: totalNumberOfSchedularOrg,
        };
        const schedularDocId = "so" + totalNumberOfSchedularOrg;
        updateApplication(appDetailsUpdateJson);
        setSchedular(schedularDocId, schedularInput.SelectedOrgAppKey, orgId);
      }).catch((error) => {
        console.log("Error:", error);
      });
    }
  });
};