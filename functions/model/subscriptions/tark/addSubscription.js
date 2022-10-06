/* eslint-disable linebreak-style */
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

/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const {generateBase64String, milliSeconds} = require("../../application/lib");
const { setSubscription } = require("../lib");

exports.addSubscription = function(orgAppKey, uid, subscriptionData, orgDomain) {
    const subscriptionId = generateBase64String( milliSeconds+orgAppKey);
    const graceNotifications = 5;
    const expiresOn="No limit";
    const promise = setSubscription(subscriptionData, orgDomain, uid, orgAppKey, subscriptionId, graceNotifications, expiresOn);
    return Promise.resolve(promise);
};

