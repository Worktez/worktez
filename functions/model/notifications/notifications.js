/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
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


const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { getNotificationsList } = require("../notifications/tark/getNotificationsList");
const { emptyNotificationCount } = require("../notifications/tark/emptyNotificationCount");

/**
 * Description
 * @param {any} "/getNotifications"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getNotifications", (req, res) => {
  getNotificationsList(req, res);
});

  fastify.post("/emptyNotifications", (req, res) => {
    console.log("inside controller")
    emptyNotificationCount(req, res);
  });

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.notifications = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      fastify.ready((err) => {
        if (err) throw err;
            requestHandler(req, res);
        });
    });
});