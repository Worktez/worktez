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

const { getLinkDetails } = require("./tark/getLinkDetails");
const { setLinkDetails } = require("./tark/setLinkDetails");


fastify.post("/getLink", (req, res) => {
  getLinkDetails(req, res);
});

fastify.post("/setLink", (req, res) => {
  setLinkDetails(req, res);
});

exports.linker = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
          requestHandler(req, res);
      });
  });
});
