/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { getActivity } = require("./tark/getActivity");

  
  fastify.post("/addActivity", (req, res) => {
    addActivity(req, res);
  });
  
  fastify.post("/getActivity", (req, res) => {
    getActivity(req, res);
  });

exports.activity = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

      fastify.ready((err) => {
        if (err) throw err;
            requestHandler(req, res);
        });
        // const mode = request.body.data.mode;

        // if (mode == "getActivity") {
        //     return getActivity(request, response);
        // }
    });
});