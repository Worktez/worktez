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

const { getMyOrgCollectionDoc, setMyOrgCollection, updateMyOrgCollection } = require("../lib");

exports.updateTeamInOrganizations = function(uid, orgDomain, orgAppKey, teamId) {
  getMyOrgCollectionDoc(uid, orgDomain).then((orgDoc) => {
    if (orgDoc == undefined) {
      const teamIdArray = [teamId];
      setMyOrgCollection(uid, orgDomain, orgAppKey, teamIdArray, teamId);
    } else {
      const teams= orgDoc.Teams;
      teams.push(teamId);
      let defaultTeam;
      let updateJson = {
        Teams: teams,
      };
      if (teams.length == 1) {
        defaultTeam = teamId;
        updateJson = {
          Teams: teams,
          DefaultTeam: defaultTeam,
        };
      }
      updateMyOrgCollection(updateJson, uid, orgDomain);
      console.log("MyOrganizations Updated Successfully");
    }
  }).catch((error) => {
    console.log("Error: ", error);
  });
};