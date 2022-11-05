/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
 
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
const { getSubscriptions } = require("../../subscriptions/lib");
const { checkSubscription } = require("../../subscriptions/tark/checkSubscription");


exports.startSubSchedular = function() {
  const p = getSubscriptions("", "").then((sched) => {
    if (sched) {
      sched.forEach((subDoc) => {
        const orgAppKey = subDoc.OrgAppKey;
        const subscriptionId = subDoc.SubscriptionId;
        const orgDomain = subDoc.OrgDomain;
        checkSubscription(orgDomain, orgAppKey, subscriptionId);
      });
    }
  });
  return Promise.resolve(p);
};
