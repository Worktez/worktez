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

const {generateBase64String, milliSeconds} = require("../../application/lib");
const { setSubscription } = require("../lib");

exports.addSubscription = function(orgAppKey, uid, subscriptionData, orgDomain) {
  const subscriptionId = generateBase64String( milliSeconds+orgAppKey);
  const graceNotifications = 5;
  const expiresOn="No limit";
  const promise = setSubscription(subscriptionData, orgDomain, uid, orgAppKey, subscriptionId, graceNotifications, expiresOn);
  return Promise.resolve(promise);
};

