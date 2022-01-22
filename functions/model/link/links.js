/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if


const { functions, cors, fastify, requestHandler } = require("../application/lib");

const { getLinkDetails } = require("./tark/getLinkDetails");
const { setLinkDetails } = require("./tark/setLinkDetails");


fastify.post("/getLinkDetails", (req, res) => {
    getLinkDetails(req, res);
});

fastify.post("/setLinkDetails", (req, res) => {
    setLinkDetails(req, res);
});

exports.links = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
          requestHandler(req, res);
      });
  });
});

