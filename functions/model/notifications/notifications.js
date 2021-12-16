/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if


const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { getNotificationsList } = require("../notifications/tark/getNotificationsList");

fastify.post("/", (req, res) => {
    // createNewUser(req, res);
    // status:ok ,200, api is running
    return response.status(200).send("API is running");
  });
  
  fastify.post("/getNotificationsList", (req, res) => {
    getNotificationsList(req, res);
  });

// exports.notifications = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         const mode = request.body.data.mode;

//         if (mode == "getNotifications") {
//             return getNotificationsList(request, response);
//         }
//     });
// });