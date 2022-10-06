/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
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
 * @param {any} subscriptionData
 * @param {any} orgDomain
 * @param {any} uid
 * @param {any} orgAppKey
 * @param {any} subscriptionId
 * @param {any} graceNotifications
 * @param {any} expiresOn
 * @return {any}
 */
exports.setSubscription = function(subscriptionData, orgDomain, uid, orgAppKey, subscriptionId, graceNotifications, expiresOn) {
  const setSubscriptionDoc = db.collection("Subscriptions").doc(subscriptionId).set({
    SubscriptionId: subscriptionId,
    SubscriptionType: subscriptionData.subscriptionType,
    Uid: uid,
    PaymentId: 0,
    OrgAppKey: orgAppKey,
    OrgDomain: orgDomain,
    ExpiresOn: expiresOn,
    GraceNotifications: graceNotifications,
    NoOfTeams: subscriptionData.noOfTeams,
    NoOfMembers: subscriptionData.noOfMembers,
    EmailsAndNotifications: subscriptionData.emailsAndNotifications,
    QuickNotes: subscriptionData.quickNotes,
    TechTag: subscriptionData.techTag,
    Meetings: subscriptionData.meetings,
    PDashboard: subscriptionData.pDashboard,
    PReport: subscriptionData.pReport,
    DocPerTask: subscriptionData.docPerTask,
    Amount: subscriptionData.amount,
    CurrencyType: subscriptionData.currencyType,
    SubscriptionStatus: "Active",
  });
  return Promise.resolve(setSubscriptionDoc);
};

/**
 * Description
 * @param {any} inputJson
 * @param {any} subscriptionId
 * @return {any}
 */
exports.updateSubscription = function(inputJson, subscriptionId) {
  const updateSubscription = db.collection("Subscriptions").doc(subscriptionId).update(inputJson);
  return Promise.resolve(updateSubscription);
};

//   /**
//  * Description
//  * @param {any} orgDomain
//  * @return {any}
//  */
//   exports. getSubscriptionDetails = function(orgAppKey) {
//     const getSubscriptionPromise = db.collection("Subscriptions").doc(orgAppKey).get().then((doc) => {
//       if(doc.exists) return doc.data();
//       else return;
//     });
//     return Promise.resolve(getSubscriptionPromise);
//   }

/**
 * Description
 * @param {any} orgAppKey
 * @param {any} subscriptionId
 * @return {any}
 */
exports. getSubscriptions = function(orgAppKey, subscriptionId) {
  let query = db.collection("Subscriptions");
  if (orgAppKey != "") {
    query = query.where("OrgAppKey", "==", orgAppKey);
  }
  if (subscriptionId != "") {
    query = query.where("SubscriptionId", "==", subscriptionId);
  }

  const promise = query.get().then((doc) => {
    let data;
    doc.forEach((element) => {
      if (element.exists) {
        data = element.data();
      }
    });
    console.log("Data from sub", data);
    return data;
  });

  return Promise.resolve(promise);
  // const getSubscriptionPromise = db.collection("Subscriptions").doc(orgAppKey).get().then((doc) => {
  //   if(doc.exists) return doc.data();
  //   else return;
  // });
  // return Promise.resolve(getSubscriptionPromise);
};


