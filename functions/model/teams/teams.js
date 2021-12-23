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

  
  fastify.post("/add-member", (req, res) => {
    addMember(req, res);
  });
  
  fastify.post("/createTeam", (req, res) => {
    createTeam(req, res);
  });
  
  fastify.post("/deleteTeam", (req, res) => {
    deleteTeam(req, res);
  });
  
  fastify.post("/getTeamData", (req, res) => {
    console.log("calling gettingTeamData api")
    getTeamData(req, res);
  });

  fastify.post("/remove-member", (req, res) => {
    removeMember(req, res);
  });
  
  fastify.post("/updateTeam", (req, res) => {
    updateTeam(req, res);
  });
  

  exports.teams = functions.https.onRequest((req, res) => {
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
        //     return createTeam(request, response);
        // } else if (mode == "update") {
        //     return updateTeam(request, response);
        // } else if (mode == "add-member") {
        //     return addMember(request, response);
        // } else if (mode == "remove-member") {
        //     return removeMember(request, response);
        // } else if (mode == "getTeamData") {
        //     return getTeamData(request, response);
        // } else if (mode == "delete") {
        //     return deleteTeam(request, response);
        // }
