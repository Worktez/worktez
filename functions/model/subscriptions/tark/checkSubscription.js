/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author: Aditya Khedekar <aditya3034@gmail.com>
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
const { basicSubscription, currentDate, standardSubscription } = require("../../application/lib");
const { getSubscriptions, updateSubscription } = require("../lib");

exports.checkSubscription = function (orgAppKey, subscriptionId) {
  const promise1 = getSubscriptions(orgAppKey, subscriptionId).then((subData) => {
    const noOfTeams = subData[0].NoOfTeams;
    const noOfMembers = subData[0].NoOfMembers;
    const expiresOn = subData[0].ExpiresOn;
    const CurrentDate = currentDate;
    const graceNotifications = subData[0].GraceNotifications;
    const basicSubCheck = [
      noOfTeams <= basicSubscription.noOfTeams,
      noOfMembers <= basicSubscription.noOfMembers,
      CurrentDate < expiresOn
    ]
    const standardSubCheck = [
      noOfTeams <= standardSubscription.noOfTeams,
      noOfMembers <= basicSubscription.noOfMembers,
      CurrentDate < expiresOn
    ]
    let subCheck = [basicSubCheck, standardSubCheck]

    if (subData[0].SubscriptionType == "Basic") {
      subCheck = subCheck[0];
    } else if (subData[0].SubscriptionType == "Standard") {
      subCheck = subCheck[1];
    }
    if (subCheck.includes(false)) {
      const appDetailsUpdateJson = {
        GraceNotifications: graceNotifications - 1,
      };
      updateSubscription(appDetailsUpdateJson, subscriptionId);

    }
    if (graceNotifications <= 0) {
      const appDetailsUpdateJson = {
        SubscriptionStatus: "Inactive",
      }
      updateSubscription(appDetailsUpdateJson, subscriptionId);
    }



  });
  return Promise.resolve(promise1);
}