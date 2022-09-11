/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
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
 const {createSubscriptionId} = require("./tark/createSubscriptionId");
 
 /**
  * Description
  * @param {any} "/createSubscriptionId"
  * @param {any} req
  * @param {any} res
  * @returns {any}
  */
 fastify.post("/createSubscriptionId", (req, res) => {
    createSubscriptionId(req, res);
 });
  
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