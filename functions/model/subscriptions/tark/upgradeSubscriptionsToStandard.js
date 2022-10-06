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

const { standardSubscription } = require("../../application/lib");
const { generateRazorpayOrder } = require("../../payment/tark/generateRazorpayOrder");
const { getSubscriptions } = require("../lib");

// No more used

exports.upgradeSubscriptionsToStandard = function(request, response) {
    const uid = request.body.data.Uid;
    let order;
    const subscriptionId = request.body.data.SubscriptionId;
    let status = 200;
    let result;
    console.log("Started Upgrade Subscription");

    const p = getSubscriptions("", subscriptionId).then((subData) => {
        if (subData.SubsctiptionType != " ") {
            const subscriptionData = standardSubscription;
            let paymentId= subData.PaymentId;
            paymentId++;
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
