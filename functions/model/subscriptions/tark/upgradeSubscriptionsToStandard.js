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

const { standardSubscription } = require("../../application/lib");
const { generateRazorpayOrder } = require("../../payment/tark/generateRazorpayOrder");
const { getSubscriptions, updateSubscription } = require("../lib");

exports.upgradeSubscriptionsToStandard = function(request, response) {
  const uid = request.body.data.Uid;
  let order;
  const subscriptionId = request.body.data.SubscriptionId;
  let status = 200;
  let result;

  const p = getSubscriptions("", subscriptionId).then((subData) => {
    if (subData.SubsctiptionType != " ") {
      let paymentId;
      const subscriptionData = standardSubscription;
      if (subData.PaymentId != "0") {
        let paymentIdString = subData.PaymentId;
        paymentIdString = paymentIdString.slice(1, paymentIdString.length());
        paymentId = paymentIdString + 1;
      } else {
        paymentId = 1;
      }
      paymentId++;
      const inputJson = {
        PaymentId: paymentId,
        SubscriptionType: subscriptionData.subscriptionType,
        GraceNotifications: 5,
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
        SubscritionStatus: "Active",
      };
      updateSubscription(inputJson, subscriptionId);
      const p1 = generateRazorpayOrder(uid, paymentId, subscriptionId, subscriptionData.amount).then((data)=>{
        return data;
      });
      Promise.resolve(p1).then((data)=>{
        order = data;
        return data;
      }).catch((err)=>{
        status = 500;
        console.log("Error resolving", err);
        result = { data: "Error Creating Order"};
        return "Error";
      });
    } else {
      console.log("Already upgraded");
      result = { data: "Already Upgraded"};
    }
    return order;
  }).catch((err)=>{
    console.log("Err", err);
    result = {data: "Error"};
    return "error";
  });


  Promise.resolve(p).then(() => {
    result = { data: { status: "OK", data: order } };
    console.log("Upgraded Subscription ");
    return response.status(status).send(result);
  })
      .catch((error) => {
        console.error("Error Getting Tasks", error);
        result = { data: { status: "Error", data: undefined } };
        return response.status(status).send(result);
      });
};
