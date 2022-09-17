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
 const {getSubscriptionDetails} = require("./tark/getSubscriptionDetails");
 const {upgradeSubscriptionsToStandard} = require("./tark/upgradeSubscriptionsToStandard")

 /**
  * Description
  * @param {any} "/getSubscriptionDetails"
  * @param {any} req
  * @param {any} res
  * @returns {any}
  */
  fastify.post("/getSubscriptionDetails", (req, res) => {
    getSubscriptionDetails(req, res);
 });

 /**
  * Description
  * @param {any} "/upgradeSubscriptionsToStandard"
  * @param {any} req
  * @param {any} res
  * @returns {any}
  */
  fastify.post("/upgradeSubscriptionsToStandard", (req, res) => {
    upgradeSubscriptionsToStandard(req, res);
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
 exports.subscriptions = functions.https.onRequest((req, res) => {
   cors(req, res, () => {
     fastify.ready((err) => {
       if (err) throw err;
       requestHandler(req, res);
     });
   });
 });