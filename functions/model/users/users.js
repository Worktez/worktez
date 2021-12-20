/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { updateUser } = require("./tark/updateUser");
const { updateTheme } = require("./tark/updateTheme");
const { verifyUser } = require("./tark/verifyUser");
const { checkAvailableUsername } = require("./tark/checkAvailableUsername");
const { getMyOrgList } = require("./tark/getMyOrgList");
const { getMyTeamsList } = require("./tark/getMyTeamsList");
const { setMyOrganization } = require("./tark/setMyOrganization");
const { updateSelectedTeam } = require("./tark/updateSelectedTeam");
const { getUserByEmail } = require("./tark/getUserByEmail");
const { getPhotoURLList } = require("./tark/getPhotoURLList");
const { getMyOrgCollectionDocs } = require("./tark/getMyOrgCollectionDoc");
const { createNewUser } = require("./tark/createNewUser");
const { getUserAppSettings } = require("./tark/getUserAppSettings");


// fastify.post("/", (req, res) => {
//   // createNewUser(req, res);
//   // status:ok ,200, api is running
//   return response.status(200).send("API is running");
// });

fastify.post("/createNewUser", (req, res) => {
  console.log("coming to create new user")
  createNewUser(req, res);
});

fastify.post("/getUserAppSettings", (req, res) => {
  console.log("coming here")
  getUserAppSettings(req, res);
});

fastify.post("/checkAvailableUsername", (req, res) => {
  checkAvailableUsername(req, res);
});

fastify.post("/getMyOrgCollectionDocs", (req, res) => {
  getMyOrgCollectionDocs(req, res);
});

fastify.post("/getMyOrgList", (req, res) => {
  getMyOrgList(req, res);
});

fastify.post("/getMyTeamsList", (req, res) => {
  getMyTeamsList(req, res);
});

fastify.post("/getPhotoURLList", (req, res) => {
  getPhotoURLList(req, res);
});

fastify.post("/getUserByEmail", (req, res) => {
  getUserByEmail(req, res);
});

fastify.post("/setMyOrganization", (req, res) => {
  setMyOrganization(req, res);
});

fastify.post("/updateSelectedTeam", (req, res) => {
  updateSelectedTeam(req, res);
});

fastify.post("/updateUser", (req, res) => {
  updateUser(req, res);
});

fastify.post("/update-theme", (req, res) => {
  updateTheme(req, res);
});

fastify.post("/verifyUser", (req, res) => {
  verifyUser(req, res);
});




exports.users = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
        if (err) throw err;
            requestHandler(req, res);
        });
    });
});

exports.users = functions.https.onRequest((req, res) => {
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

        // if (mode == "create") {
        //     return createNewUser(request, response);
        // } else if (mode == "update") {
        //     return updateUser(request, response);
        // } else if (mode == "update-theme") {
        //     return updateTheme(request, response);
        // } else if (mode == "verify") {
        //     return verifyUser(request, response);
        // } else if (mode == "getUserAppSettings") {
        //     return getUserAppSettings(request, response);
        // } else if (mode == "getUserByEmail") {
        //     return getUserByEmail(request, response);
        // } else if (mode == "CheckAvailableUsername") {
        //     return checkAvailableUsername(request, response);
        // } else if (mode == "getMyOrgList") {
        //     return getMyOrgList(request, response);
        // } else if (mode == "getMyTeamsList") {
        //     return getMyTeamsList(request, response);
        // } else if (mode == "setMyOrganization") {
        //     return setMyOrganization(request, response);
        // } else if (mode == "updateSelectedTeam") {
        //     return updateSelectedTeam(request, response);
        // } else if (mode == "getPhotoURLList") {
        //     return getPhotoURLList(request, response);
        // } else if (mode == "getMyOrgCollectionDocs") {
        //     return getMyOrgCollectionDocs(request, response);
        // }
