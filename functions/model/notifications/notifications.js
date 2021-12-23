/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if


const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { getNotificationsList } = require("../notifications/tark/getNotificationsList");
  
  fastify.post("/getNotifications", (req, res) => {
    getNotificationsList(req, res);
  });

exports.notifications = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

      fastify.ready((err) => {
        if (err) throw err;
            requestHandler(req, res);
        });
        // const mode = request.body.data.mode;

        // if (mode == "getNotifications") {
        //     return getNotificationsList(request, response);
        // }
    });
});