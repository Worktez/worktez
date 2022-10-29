/* eslint-disable linebreak-style */
/** *********************************************************
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

/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
const {currentDate} = require("../../application/lib");
const {getOrgRawData} = require("../../organization/lib");
const {getSubscriptions, updateSubscription} = require("../lib");

exports.checkSubscription = function(orgDomain, orgAppKey, subscriptionId) {
  const p = getOrgRawData(orgDomain).then((orgData) => {
    const totalNumberOfTeams = orgData.TotalNumberOfTeams;
    const totalNumberOfMembers = orgData.TotalNumberOfMembers;
    const todaysDate = currentDate;

    const promise1 = getSubscriptions(orgAppKey, subscriptionId)
        .then((subData) => {
          const noOfTeams = subData[0].NoOfTeams;
          const noOfMembers = subData[0].NoOfMembers;
          const expiresOn = subData[0].ExpiresOn;
          const graceNotifications = subData[0].GraceNotifications;
          const subscriptionId = subData[0].SubscriptionId;

          const subCheck = [
            totalNumberOfTeams <= noOfTeams,
            totalNumberOfMembers <= noOfMembers,
            todaysDate <= expiresOn,
          ];

          if (subCheck.includes(false)) {
            const appDetailsUpdateJson = {
              GraceNotifications: graceNotifications - 1,
            };
            updateSubscription(appDetailsUpdateJson, subscriptionId);
          }
          if (graceNotifications <= 0) {
            const appDetailsUpdateJson = {
              SubscriptionStatus: "Inactive",
            };
            updateSubscription(appDetailsUpdateJson, subscriptionId);
          }
        });
    return Promise.resolve(promise1);
  });
  return Promise.resolve(p);
};
