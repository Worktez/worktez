/* eslint-disable linebreak-style */
/* eslint-disable valid-jsdoc */
/* eslint-disable no-undef */
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
 const { functions, cors, fastify, requestHandler } = require("../application/lib"); 
const { startSubSchedular } = require("./tark/startSubSchedular");


/**
 * Description
 * @param {any} "121***"
 * @returns {any}
 */
    exports.scheduledSubFn = functions.pubsub.schedule("1 21 * * *").onRun((context) => {
        context.startSubSchedular();
    });

/**
 * Description
 * @param {any} "/startSubScheduler"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
 fastify.post("/startSubSchedular", (req, res) => {
    startSubSchedular();
    return res.status(200).send("Success");
  });    

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
 exports.scheduledSubFnManually = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      fastify.ready((err) => {
        if (err) throw err;
        requestHandler(req, res);
      });
    });
  });

