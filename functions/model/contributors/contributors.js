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
const { addContributor } = require("./tark/addContributor");
const { getContributorsList } = require("./tark/getContributorsList");

/**
 * Description
 * @param {any} "/getContributorsData"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getContributorsData", (req, res) => {
    getContributorsList(req, res);
});

/**
 * Description
 * @param {any} "/addContributor"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addContributor", (req, res) => {
    addContributor(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.contributors = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
            if (err) throw err;
                requestHandler(req, res);
        });
    });
});