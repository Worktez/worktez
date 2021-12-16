/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { createTeam } = require("./tark/createTeam");
const { addMember } = require("./tark/addMember");
const { removeMember } = require("./tark/removeMember");
const { updateTeam } = require("./tark/updateTeam");
const { getTeamData } = require("./tark/getTeamData");
const { deleteTeam } = require("./tark/deleteTeam");


fastify.post("/", (req, res) => {
    // createNewUser(req, res);
    // status:ok ,200, api is running
    return response.status(200).send("API is running");
  });
  
  fastify.post("/addMember", (req, res) => {
    addMember(req, res);
  });
  
  fastify.post("/createTeam", (req, res) => {
    createTeam(req, res);
  });
  
  fastify.post("/deleteTeam", (req, res) => {
    deleteTeam(req, res);
  });
  
  fastify.post("/getTeamData", (req, res) => {
    getTeamData(req, res);
  });

  fastify.post("/removeMember", (req, res) => {
    removeMember(req, res);
  });
  
  fastify.post("/updateTeam", (req, res) => {
    updateTeam(req, res);
  });
  

// exports.teams = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         const mode = request.body.data.mode;
//         if (mode == "create") {
//             return createTeam(request, response);
//         } else if (mode == "update") {
//             return updateTeam(request, response);
//         } else if (mode == "add-member") {
//             return addMember(request, response);
//         } else if (mode == "remove-member") {
//             return removeMember(request, response);
//         } else if (mode == "getTeamData") {
//             return getTeamData(request, response);
//         } else if (mode == "delete") {
//             return deleteTeam(request, response);
//         }
//     });
// });