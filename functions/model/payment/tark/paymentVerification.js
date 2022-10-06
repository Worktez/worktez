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
// const { setPaymentStatus } = require("../lib");
const crypto = require("crypto");
const { setPaymentStatus } = require("../lib");
const { standardSubscription, currentDate } = require("../../application/lib");
const { updateSubscription, getSubscriptions } = require("../../subscriptions/lib");
const { keySecret } = require("../../../paymentKeys");
exports.paymentVerification = function(request, response) {
    try {
        const orderId = request.body.data.OrderId;
        const rzpPaymentId = request.body.data.PaymentId;
        const signature = request.body.data.Signature;
        const id = request.body.data.Id; // Subscription Id
        const type = request.body.data.Type;
        const paymentId = request.body.data.PId;
        const secretKey = keySecret;
        let generatedSignature = "";
        generatedSignature = crypto.createHmac("sha256", secretKey).update((orderId + "|" + rzpPaymentId).toString()).digest("hex");

        if (generatedSignature === signature) {
            const result = { data: "Payment verified successfully", status: 200 };
            console.log("Payment successful");
            getSubscriptions("", id).then((data)=>{
                let date;
                if (data.ExpiresOn == "No limit") {
                    date = new Date(currentDate);
                } else {
                    date = new Date(data.ExpiresOn);
                }

                date.setDate(date.getDate() + 30);
                setPaymentStatus(id, paymentId);
                console.log("Date", date);
                if (type == "StandardUpgrade") {
                    const inputJson =
                    {
                        NoOfMembers: standardSubscription.noOfMembers,
                        NoOfTeams: standardSubscription.noOfTeams,
                        PaymentId: paymentId,
                        SubscriptionType: standardSubscription.subscriptionType,
                        Amount: standardSubscription.amount,
                        ExpiresOn: date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
                    };
                    updateSubscription(inputJson, id);
                }

            return response.status(200).send(result);
            });
        } else {
            console.log("payment failed");
            const result = { data: "Payment Incomplete" };
            return response.status(500).send(result);
        }
    } catch (err) {
        console.log("Error", err);
        const result = { data: "Payment Incomplete" };
        return response.status(500).send(result);
    }
};