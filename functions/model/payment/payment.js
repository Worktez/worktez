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

 const {functions, cors, fastify, requestHandler} = require("../application/lib");
 const {addPaymentDetails} = require("./tark/addPaymentDetails");
 const {paymentVerification} = require("./tark/paymentVerification");
 const {generateRazorpayOrder} = require("./tark/generateRazorpayOrder");
 //  const {getPaymentDetails} = require("./tark/getPaymentDetails");

 /**
  * Description
  * @param {any} "/addPayment"
  * @param {any} req
  * @param {any} res
  * @returns {any}
  */
 fastify.post("/addPaymentDetails", (req, res) => {
    addPaymentDetails(req, res);
 });

 /**
  * Description
  * @param {any} "/paymentVerification"
  * @param {any} req
  * @param {any} res
  * @returns {any}
  */
  fastify.post("/paymentVerification", (req, res) => {
    paymentVerification(req, res);
 });

 /**
  * Description
  * @param {any} "/generateRazorpayOrder"
  * @param {any} req
  * @param {any} res
  * @returns {any}
  */
  fastify.post("/generateRazorpayOrder", (req, res) => {
    generateRazorpayOrder(req, res);
 });

//  /**
//  * Description
//  * @param {any} "/getPaymentDetails"
//  * @param {any} req
//  * @param {any} res
//  * @returns {any}
//  */
// fastify.post("/getPaymentDetails", (req, res) => {
//   getPaymentDetails(req, res);
// });

 /**
  * Description
  * @param {any} req
  * @param {any} res
  * @returns {any}
  */
 exports.payment = functions.https.onRequest((req, res) => {
   cors(req, res, () => {
     fastify.ready((err) => {
       if (err) throw err;
       requestHandler(req, res);
     });
   });
 });