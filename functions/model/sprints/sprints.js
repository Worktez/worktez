/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { createNewSprint } = require("../sprints/tark/createNewSprint");
const { updateSprintStatus } = require("../sprints/tark/updateSprintStatus");
const { getSprintDetails } = require("../sprints/tark/getSprintDetails");


fastify.post("/", (req, res) => {
    // createNewUser(req, res);
    // status:ok ,200, api is running
    return response.status(200).send("API is running");
  });
  
  fastify.post("/createNewSprint", (req, res) => {
    createNewSprint(req, res);
  });
  
  fastify.post("/getSprintDetails", (req, res) => {
    getSprintDetails(req, res);
  });

  fastify.post("/updateSprintStatus", (req, res) => {
    updateSprintStatus(req, res);
  });

// exports.sprints = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         const mode = request.body.data.mode;
//         if (mode == "create") {
//             return createNewSprint(request, response);
//         } else if (mode == "update") {
//             return updateSprintStatus(request, response);
//         } else if (mode == "getSprintDetails") {
//             return getSprintDetails(request, response);
//         }
//     });
// });