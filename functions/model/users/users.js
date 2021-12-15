/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { updateUser } = require("./updateUser");
const { updateTheme } = require("./updateTheme");
const { verifyUser } = require("./verifyUser");
const { checkAvailableUsername } = require("./checkAvailableUsername");
const { getMyOrgList } = require("./getMyOrgList");
const { getMyTeamsList } = require("./getMyTeamsList");
const { setMyOrganization } = require("./setMyOrganization");
const { updateSelectedTeam } = require("./updateSelectedTeam");
const { getUserByEmail } = require("./getUserByEmail");
const { getPhotoURLList } = require("./getPhotoURLList");
const { getMyOrgCollectionDocs } = require("./getMyOrgCollectionDoc");
const { createNewUser } = require("./microservices/createNewUser");
const { getUserAppSettings } = require("./microservices/getUserAppSettings");


fastify.post("/", (req, res) => {
  createNewUser(req, res);
});

fastify.post("/getUserAppSettings", (req, res) => {
  getUserAppSettings(req, res);
});


exports.users = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
        if (err) throw err;
            requestHandler(req, res);
        });
    });
});

// exports.users = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         const mode = request.body.data.mode;

//         if (mode == "create") {
//             return createNewUser(request, response);
//         } else if (mode == "update") {
//             return updateUser(request, response);
//         } else if (mode == "update-theme") {
//             return updateTheme(request, response);
//         } else if (mode == "verify") {
//             return verifyUser(request, response);
//         } else if (mode == "getUserAppSettings") {
//             return getUserAppSettings(request, response);
//         } else if (mode == "getUserByEmail") {
//             return getUserByEmail(request, response);
//         } else if (mode == "CheckAvailableUsername") {
//             return checkAvailableUsername(request, response);
//         } else if (mode == "getMyOrgList") {
//             return getMyOrgList(request, response);
//         } else if (mode == "getMyTeamsList") {
//             return getMyTeamsList(request, response);
//         } else if (mode == "setMyOrganization") {
//             return setMyOrganization(request, response);
//         } else if (mode == "updateSelectedTeam") {
//             return updateSelectedTeam(request, response);
//         } else if (mode == "getPhotoURLList") {
//             return getPhotoURLList(request, response);
//         } else if (mode == "getMyOrgCollectionDocs") {
//             return getMyOrgCollectionDocs(request, response);
//         }
//     });
// });