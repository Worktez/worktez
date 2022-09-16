/* eslint-disable linebreak-style */
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

 const { Subscription } = require("rxjs");
const { db } = require("../application/lib");
 
/**
 * Description
 * @param {any} subscriptionId
 * @return {any}
 */
 exports.setSubscription = function(subscriptionData, orgDomain, uid, orgAppKey, subscriptionId, graceNotifications, expiresOn) {
  console.log(orgDomain, uid, orgId, subscriptionId, graceNotifications, expiresOn);
  console.log("subscriptionData:", subscriptionData, orgDomain,);
    const setSubscriptionDoc = db.collection("Subscriptions").doc(orgDomain).set({
      SubscriptionId: subscriptionId,
      Uid: uid,
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
    });
    return Promise.resolve(setSubscriptionDoc);
  };

  /**
 * Description
 * @param {any} orgDomain
 * @return {any}
 */
  exports. getSubscriptionDetails = function(orgDomain) {
    const getSubscriptionPromise = db.collection("Subscriptions").doc(orgDomain).get().then((doc) => {
      if(doc.exists) return doc.data();
      else return;
    });
    return Promise.resolve(getSubscriptionPromise);
  }
  
  