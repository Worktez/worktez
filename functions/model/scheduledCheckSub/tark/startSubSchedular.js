/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
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
const { getSubscriptions } = require("../../subscriptions/lib");
const { checkSubscription } = require("../../subscriptions/tark/checkSubscription");


exports.startSubSchedular = function () {

    const p = getSubscriptions("", "").then((sched) => {
        if (sched) {
            sched.forEach(subDoc => {
                const orgAppKey = subDoc.OrgAppKey;
                const subscriptionId = subDoc.SubscriptionId
                checkSubscription(orgAppKey, subscriptionId);
            });
        }
    });
    return Promise.resolve(p);
}