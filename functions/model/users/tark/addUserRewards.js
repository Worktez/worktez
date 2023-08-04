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
const { getUser, updateUser, addUserRewards } = require("../lib");

exports.addUserRewards = (req, res) => {
  const uid = req.body.data.Uid;
  const digitalAssetId = req.body.data.DigitalAssetId;
  const expiryDate = req.body.data.ExpiryDate;
  const expiryTime = req.body.data.ExpiryTime;
  const orgDomain = req.body.data.OrgDomain;

  let status = 200;


  const promise1 = getUser(uid, "").then((userData) => {
    let userRewardsCounter = userData.UserRewardsCounter;
    userRewardsCounter = userRewardsCounter + 1;
    const inputPostJson = {
      UserRewardsCounter: userRewardsCounter,
    };
    const rewardId = "R" + userRewardsCounter;
    updateUser(inputPostJson, uid);
    addUserRewards(uid, rewardId, digitalAssetId, expiryDate, expiryTime, orgDomain);
  }).catch((error) => {
    console.log("Error:", error);
  });

  let result;
  const promises = [promise1];
  return Promise.all(promises).then(() => {
    const arr = ["Added Digital Asset Successfully"];
    result = { data: arr };
    console.log("Added Digital Asset Successfully");
    return res.status(status).send(result);
  })
      .catch((error) => {
        status = 500;
        result = { data: error };
        console.error("Error Adding Digital Asset", error);
        return res.status(status).send(result);
      });
};