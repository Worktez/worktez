/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

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
const { patch1 } = require("./tark/patch1");
const { patch2 } = require("./tark/patch2");
const { patch3 } = require("./tark/patch3");
const { patch4 } = require("./tark/patch4");
const { patch5 } = require("./tark/patch5");
const { patchModerator } = require("./tark/patchModerator");
const { editPatch } = require("./tark/editPatch");
const { setPatches } = require("./tark/setPatches");
const { patch6 } = require("./tark/patch6");
const { patch7 } = require("./tark/patch7");
const { patch8 } = require("./tark/patch8");
const { patch9 } = require("./tark/patch9");
const { patch10 } = require("./tark/patch10");

/**
 * Description
 * @param {any} "/editPatch"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/editPatch", (req, res) => {
  editPatch(req, res);
});

/**
 * Description
 * @param {any} "/patch1"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/patch1", (req, res) => {
  patch1(req, res);
});

/**
 * Description
 * @param {any} "/patch2"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/patch2", (req, res) => {
  patch2(req, res);
});

/**
 * Description
 * @param {any} "/patch3"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/patch3", (req, res) => {
  patch3(req, res);
});

/**
 * Description
 * @param {any} "/patch4"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/patch4", (req, res) => {
  patch4(req, res);
});

/**
 * Description
 * @param {any} "/patch5"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/patch5", (req, res) => {
  patch5(req, res);
});

/**
 * Description
 * @param {any} "/patch6"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/patch6", (req, res) => {
  patch6(req, res);
});

/**
 * Description
 * @param {any} "/patch7"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/patch7", (req, res) => {
  patch7(req, res);
});

/**
 * Description
 * @param {any} "/patch8"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/patch8", (req, res) => {
  patch8(req, res);
});

/**
 * Description
 * @param {any} "/patch9"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/patch9", (req, res) => {
  patch9(req, res);
});

/**
 * Description
 * @param {any} "/patch10"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/patch10", (req, res) => {
  patch10(req, res);
});

/**
 * Description
 * @param {any} "/patchModerator"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/patchModerator", (req, res) => {
  patchModerator(req, res);
});

/**
 * Description
 * @param {any} "/setPatches"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/setPatches", (req, res) => {
  setPatches(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.patch = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});
