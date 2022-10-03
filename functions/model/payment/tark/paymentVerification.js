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
const { updateSubscription } = require("../../subscriptions/lib");
exports.paymentVerification = function(request, response) {
    try {
        const orderId = request.body.data.OrderId;
        const rzpPaymentId = request.body.data.PaymentId;
        const signature = request.body.data.Signature;
        const id = request.body.data.Id; // Subscription Id
        const type = request.body.data.Type;
        const paymentId = request.body.data.PId;

        console.log("orderId: " + orderId);
        console.log("rzpPaymentId: " + rzpPaymentId);
        console.log("signature: " + signature);
        console.log("Id: " + id);
        console.log("type", type);
        console.log("PaymentId", paymentId);

        // Test Credentials
        const keySecret = "EjWL1pPedHeT4Z1C4laM3u1b";

        console.log("hit 1");
        let generatedSignature = "";
        generatedSignature = crypto.createHmac("sha256", keySecret).update((orderId + "|" + rzpPaymentId).toString()).digest("hex");

        console.log("generated signature ", generatedSignature);

        if (generatedSignature === signature) {
            const result = { data: "Payment verified successfully", status: 200 };
            console.log("Payment successful");
                const date = new Date(currentDate);
                date.setDate(date.getDate() + 30);
                setPaymentStatus(id, paymentId);
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