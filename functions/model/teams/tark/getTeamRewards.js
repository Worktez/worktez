/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Aditya Khedekar <aditya3034@gmail.com>
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

const { getAllUsersInEmail, getAllUserRewards } = require("../../users/lib");

exports.getTeamRewards = function(request, response) {
  const teamMembers = request.body.data.TeamMembers;
  console.log(teamMembers);
  let status = 200;
  let result;
  getAllUsersInEmail(teamMembers).then((member) => {
    member.forEach((doc) => {
      const userUid = doc.uid;
      getAllUserRewards(userUid).then((reward)=>{
        if (reward) {
          result = { data: {status: "OK", data: reward} };
          return response.status(status).send(result);
        }
      });
    });
  }).catch((error) => {
    status = 500;
    result = { data: error };
    console.error("Error Getting Rewards", error);
    return response.status(status).json(result);
  });
};