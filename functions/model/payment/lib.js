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

const { db } = require("../application/lib");
const { currentTime, currentDate } = require("../application/lib");

const base62 = {
    charset: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        .split(""),
    encode: (integer) => {
        if (integer === 0) {
            return 0;
        }
        let s = [];
        while (integer > 0) {
            s = [base62.charset[integer % 62], ...s];
            integer = Math.floor(integer / 62);
        }
        return s.join("");
    },
};

exports.generateBase62Constant = function() {
    const dateLocal = new Date();
    const miliSec = dateLocal.getTime();
    return base62.encode(miliSec);
};

exports.generatePaymentId = function() {
    const dateLocal = new Date();
    const miliSec = dateLocal.getTime();
    return "Pay" + base62.encode(miliSec);
};


 /**
  * Description
  * @param {any} uid
  * @param {any} order
  * @param {any} paymentId
  * @param {any} subscriptionId
  * @param {any} currentDate
  * @param {any} currentTime
  * @return {any}
  */
exports.setRazorpayOrderDetails = function(uid, order, paymentId, subscriptionId, currentDate, currentTime) {
    const p1 = db.collection("Subscriptions").doc(subscriptionId).collection("Payment").doc(paymentId).set({
        RazorPayOrderDetails: order,
        PaymentStatus: "Created",
        OrderCreationDate: currentDate,
        OrderCreationTime: currentTime,
        Uid: uid,
        PaymentCreationDate: "",
        PaymentCreationTime: "",
    });
   return Promise.resolve(p1);
};


exports.setPaymentStatus = function(subscriptionId, paymentId) {
    let data;

    const p1 = db.collection("Subscriptions").doc(subscriptionId).collection("Payment").doc(paymentId).get().then((doc)=>{
        data = doc.data();
        data.RazorPayOrderDetails.amount_paid = data.RazorPayOrderDetails.amount_due;
        data.RazorPayOrderDetails.amount_due = 0;
        data.RazorPayOrderDetails.status = "paid";
    });
    Promise.resolve(p1).then(()=>{
        const promise = db.collection("Subscriptions").doc(subscriptionId).collection("Payment").doc(paymentId).update({
            PaymentStatus: "Complete",
            PaymentCreationDate: currentDate,
            PaymentCreationTime: currentTime,
            RazorPayOrderDetails: data.RazorPayOrderDetails,
        });
        return Promise.resolve(promise);
    });
};
