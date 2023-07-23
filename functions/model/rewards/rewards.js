/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Aditya Khedekar <aditya3034@gmail.com>
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

const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { addDigitalAssets } = require("./tark/addDigitalAssets");


/**
 * Description
 * @param {any} "/addDigitalAssets"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addDigitalAssets", (req, res) => {
  addDigitalAssets(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */

exports.rewards = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});