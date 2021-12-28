/* eslint-disable linebreak-style */
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
const { getLinkDetails } = require("./tark/getLinkDetails");
const { setLinkDetails } = require("./tark/setLinkDetails");
const { getTasksForDashboard } = require("./tark/getTasksForDashboard");


fastify.post("/comment", (req, res) => {
  addComment(req, res);
});

fastify.post("/create", (req, res) => {
  createNewTask(req, res);
});

fastify.post("/deleteTask", (req, res) => {
  deleteTask(req, res);
});

fastify.post("/editTask", (req, res) => {
  editTask(req, res);
});

fastify.post("/getLink", (req, res) => {
  getLinkDetails(req, res);
});

fastify.post("/getTaskDetails", (req, res) => {
  getTaskDetails(req, res);
});

fastify.post("/getAllTasks", (req, res) => {
  getTasks(req, res);
});

fastify.post("/getTasksForDashboard", (req, res) => {
  getTasksForDashboard(req, res);
});

fastify.post("/log", (req, res) => {
  logWork(req, res);
});

fastify.post("/setLink", (req, res) => {
  setLinkDetails(req, res);
});

exports.tasks = functions.https.onRequest((req, res) => {
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
        // const mode = request.body.data.mode;

        // if (mode == "create") {
        //     return createNewTask(request, response);
        // } else if (mode == "edit") {
        //     return editTask(request, response);
        // } else if (mode == "log") {
        //     return logWork(request, response);
        // } else if (mode == "delete") {
        //     return deleteTask(request, response);
        // } else if (mode == "comment") {
        //     return addComment(request, response);
        // } else if (mode == "getTaskDetails") {
        //     return getTaskDetails(request, response);
        // } else if (mode == "getLink") {
        //     return getLinkDetails(request, response);
        // } else if (mode == "setLink") {
        //     return setLinkDetails(request, response);
        // } else if (mode == "getAllTasks") {
        //     return getTasks(request, response);
        // } else if (mode == "getTasksForDashboard") {
        //     return getTasksForDashboard(request, response);
        // }
