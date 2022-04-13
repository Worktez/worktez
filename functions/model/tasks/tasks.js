/* eslint-disable linebreak-style */
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

/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if


const { functions, cors, fastify, requestHandler } = require("../application/lib");

const { createNewTask } = require("./tark/createTask");
const { deleteTask } = require("./tark/deleteTask");
const { editTask } = require("./tark/editTask");
const { logWork } = require("./tark/logwork");
const { addComment } = require("./tark/addComment");
const { getTaskDetails } = require("./tark/getTaskDetails");
const { getTasks } = require("./tark/getTasks");
const { getTasksForDashboard } = require("./tark/getTasksForDashboard");
const { addWatcher } = require("./tark/addWatcher");
const { addPrLink } = require("./tark/addPrLink");


/**
 * Description
 * @param {any} "/comment"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/comment", (req, res) => {
  addComment(req, res);
});

/**
 * Description
 * @param {any} "/createNewTask"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/createNewTask", (req, res) => {
  createNewTask(req, res);
});

/**
 * Description
 * @param {any} "/deleteTask"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/deleteTask", (req, res) => {
  deleteTask(req, res);
});

/**
 * Description
 * @param {any} "/editTask"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/editTask", (req, res) => {
  editTask(req, res);
});

/**
 * Description
 * @param {any} "/addPrLink"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addPrLink", (req, res) => {
  addPrLink(req, res);
});
/**
 * Description
 * @param {any} "/getTaskDetails"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getTaskDetails", (req, res) => {
  getTaskDetails(req, res);
});

/**
 * Description
 * @param {any} "/getAllTasks"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getAllTasks", (req, res) => {
  getTasks(req, res);
});

/**
 * Description
 * @param {any} "/getTasksForDashboard"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getTasksForDashboard", (req, res) => {
  getTasksForDashboard(req, res);
});

/**
 * Description
 * @param {any} "/log"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/log", (req, res) => {
  logWork(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */

 fastify.post("/addWatcher", (req, res) => {
  addWatcher(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */

exports.tasks = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
          requestHandler(req, res);
      });
  });
});
