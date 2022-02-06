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

  fastify.post("/editPatch", (req, res) => {
    editPatch(req, res);
  });

  fastify.post("/patch1", (req, res) => {
    patch1(req, res);
  });

  fastify.post("/patch2", (req, res) => {
    patch2(req, res);
  });

  fastify.post("/patch3", (req, res) => {
    patch3(req, res);
  });

  fastify.post("/patch4", (req, res) => {
    patch4(req, res);
  });

  fastify.post("/patch5", (req, res) => {
    patch5(req, res);
  });

  fastify.post("/patch6", (req, res) => {
    patch6(req, res);
  });

  fastify.post("/patch7", (req, res) => {
    patch7(req, res);
  });

  fastify.post("/patch8", (req, res) => {
    patch8(req, res);
  });

  fastify.post("/patch9", (req, res) => {
    patch9(req, res);
  });

  fastify.post("/patch10", (req, res) => {
    patch10(req, res);
  });

  fastify.post("/patchModerator", (req, res) => {
    patchModerator(req, res);
  });

  fastify.post("/setPatches", (req, res) => {
    setPatches(req, res);
  });

  exports.patch = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      fastify.ready((err) => {
        if (err) throw err;
            requestHandler(req, res);
        });
        // const mode = request.body.data.mode;

        // if (mode == "create") {
        //     return createOrg(request, response);
        // } else if (mode == "getOrgData") {
        //     return getOrgData(request, response);
        // }
    });
});
    // cors(request, response, () => {
    //     const mode = request.body.data.mode;

    //     if (mode == "patch1") {
    //         // To fix counters of all sprints
    //         return patch1(request, response);
    //     } else if (mode == "patch2") {
    //         // To add a new field and value to all tasks
    //         return patch2(request, response);
    //     } else if (mode == "patch3") {
    //         // To change a particular field in relevent tasks
    //         return patch3(request, response);
    //     } else if (mode == "patch4") {
    //         // To update the uid for previous activities
    //         return patch4(request, response);
    //     } else if (mode == "patch5") {
    //         // To update the userDoc for all Users to change Organization structure
    //         return patch5(request, response);
    //     } else if (mode == "patch6") {
    //         // To update the Sprints collections with new field values
    //         return patch6(request, response);
    //     } else if (mode == "patch7") {
    //         // To add a new field to the organization
    //         return patch7(request, response);
    //     } else if (mode == "patch9") {
    //         // To add a new field to the organization
    //         return patch9(request, response);
    //     } else if (mode == "patchModerator") {
    //         return patchModerator(request, response);
    //     } else if (mode == "edit") {
    //         return editPatch(request, response);
    //     }
    // });