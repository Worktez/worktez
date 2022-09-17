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

//  /**
//  * Description
//  * @param {any} amount
//  * @param {any} userUid
//  * @param {any} subscriptionId
//  * @param {any} paymentId
//  * @param {any} userEmailAddress
//  * @param {any} paymentTime
//  * @param {any} paymentDate
//  * @return {any}
//  */
// exports.setPayment = function(amount, userUid, subscriptionId, paymentId, userEmailAddress, paymentTime, paymentDate) {
//     const addPaymentPromise = db.collection("Subscriptions").doc(orgDomain).collection("Payment").set({
//         UserEmailAddress: userEmailAddress,
//         Amount: amount,
//         PaymentId: paymentId,
//         PaymentCounter: 0,
//         PaymentTime: paymentTime,
//         PaymentDate: paymentDate,
//         SubscriptionId: subscriptionId,
//         UserUid: userUid,
//     });
//     return Promise.resolve(addPaymentPromise);
// };

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

// eslint-disable-next-line require-jsdoc

 /**
  * Description
  * @param {any} Uid
  * @param {any} order
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

 /**
  * Description
  * @param {any} Id
  * @param {any} order
  * @return {any}
  */
  exports.setEcommerceRazorDetails = function(Id, order) {
    const p1 = db.collection("Orders").doc(Id).update({
        RazorPayOrderDetails: order,
    });
   return Promise.resolve(p1);
};

// exports.setPaymentStatus = function(orderId, id) {
//     console.log("orderid", orderId);
//     console.log("uid", id);
//     let data;

//     const p1 = db.collection("Subscriptions").doc(id).collection("Payment").doc(paymentId).get().then((doc)=>{
//         data = doc.data();
//         data.RazorPayOrderDetails.amount_paid = data.RazorPayOrderDetails.amount_due;
//         data.RazorPayOrderDetails.amount_due = 0;
//         data.RazorPayOrderDetails.status = "paid";
//     });
//     Promise.resolve(p1).then(()=>{
//         const promise = db.collection("Subscriptions").doc(subscriptionId).collection("Payment").doc(paymentId).update({
//             PaymentStatus: "Complete",
//             RazorPayOrderDetails: data.RazorPayOrderDetails,
//         });
//         mailer(data.UserUid, "Payment_Complete", paymentId);
//         return Promise.resolve(promise);
//     });
// };

// exports.setEcommercePaymentStatus = function(id) {
//     console.log("reg id", id);
//     let data;

//     const p1 = db.collection("Orders").doc(id).get().then((doc)=>{
//         data = doc.data();
//         data.RazorPayOrderDetails.amount_paid = data.RazorPayOrderDetails.amount_due;
//         data.RazorPayOrderDetails.amount_due = 0;
//         data.RazorPayOrderDetails.status = "paid";
//     });
//     Promise.resolve(p1).then(()=>{
//         const promise = db.collection("Orders").doc(id).update({
//             PaymentStatus: "Complete",
//             RazorPayOrderDetails: data.RazorPayOrderDetails,
//         });
//         mailer(data.UserUid, "Payment_Complete", id);
//         return Promise.resolve(promise);
//     });
// };

// exports.gerOrderData = function(paymentId) {
//     const promise = db.collection("Subscriptions").doc(orgDomain).collection("Payment").doc(paymentId).get().then((doc)=>{
//         if (doc.exists) return doc.data();
//         else return;
//     });
//    return Promise.resolve(promise);
// };