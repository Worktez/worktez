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

const { getAllUserRewards } = require("../lib");

exports.getUserRewardsList = function(request, response) {
  const uid = request.body.data.Uid;

  let status = 200;
  const resultData = [];
  let result;

  getAllUserRewards(uid).then((snapshot) => {
    if (snapshot == undefined) {
      result = { data: { status: "Not Found", data: "No Rewards Listed" } };
    } else {
      snapshot.forEach((element) => {
        const data = element.data();
        resultData.push(data);
      });
      result = { data: { status: "Ok", data: resultData } };
    }
    return response.status(status).send(result);
  }).catch((error) => {
    status = 500;
    console.log("Error: ", error);
    result = { data: { status: "Error", data: "No Rewards Listed" } };
    return response.status(status).send(result);
  });
};