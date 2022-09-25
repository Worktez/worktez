/* eslint-disable linebreak-style */
/* eslint-disable valid-jsdoc */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
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

 const { db } = require("../application/lib");

 

/**
 * Description
 * @param {any} schedularDocId
 * @return {any}
 */
 exports.getSubSchedular = function(schedularSubDocId) {
    const getSchedularSubPromise = db.collection("SchedularSubOrg").doc(schedularSubDocId).doc(subscriptionId).get().then((doc) => {
        return doc.data();
    });
    return Promise.resolve(getSchedularSubPromise);
};


/**
 * Description
 * @param {any} orgAppKey
 * @param {any} subscriptionId
 * @return {any}
 */
 exports.getAllSubscriptions = function(orgAppKey, subscriptionId) {
     let query = db.collection("SchedularSubOrg");
     if (subscriptionId != "") {
         query = query.where("SubscriptionId", "==", subscriptionId);
        }
        if (orgAppKey != "") {
            query = query.where("OrgAppKey", "==", orgAppKey);
        }
        console.log("check2","hahaha",orgAppKey);
  const getAllSubscriptionPromises = query.get();

  return Promise.resolve(getAllSubscriptionPromises);
};