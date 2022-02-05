/***********************************************************
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
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { getPerformanceChartData } = require("./tark/getPerformanceChartData");
const { getUserPerformanceChartData } = require("./tark/getUserPerformanceChartData");
const { getSprintEvaluationGraph } = require("./tark/getSprintEvaluationGraph");

fastify.post("/performanceChartData", (req, res) => {
  getPerformanceChartData(req, res);
});

fastify.post("/userPerformanceChartData", (req, res) => {
  getUserPerformanceChartData(req, res);
});

fastify.post("/sprintEvaluationGraph", (req, res) => {
  getSprintEvaluationGraph(req, res);
});

exports.performanceChart = functions.https.onRequest((req, res) => {
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

    //     if (mode == "performanceChartData") {
    //         return getPerformanceChartData(request, response);
    //     } else if (mode == "sprintEvaluationGraph") {
    //         return getSprintEvaluationGraph(request, response);
    //     } else if (mode == "userPerformanceChartData") {
    //         return getUserPerformanceChartData(request, response);
    //     }
    // });
