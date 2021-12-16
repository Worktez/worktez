/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors, fastify, requestHandler } = require("../application/lib");

const { createOrg } = require("./tark/createOrg");
const { getOrgData } = require("./tark/getOrganizationData");

fastify.post("/", (req, res) => {
    // createNewUser(req, res);
    // status:ok ,200, api is running
    return response.status(200).send("API is running");
  });
  
  fastify.post("/createOrg", (req, res) => {
    createOrg(req, res);
  });
  
  fastify.post("/getOrgData", (req, res) => {
    getOrgData(req, res);
  });

// exports.organization = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         const mode = request.body.data.mode;

//         if (mode == "create") {
//             return createOrg(request, response);
//         } else if (mode == "getOrgData") {
//             return getOrgData(request, response);
//         }
//     });
// });