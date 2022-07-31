/* eslint-disable max-len */
const {functions, cors, fastify, requestHandler} = require("../application/lib");
const {scheduleMeet} = require("./tark/scheduleMeet");
const {addAttendee} = require("./tark/addAttendee");

/**
 * Description
 * @param {any} "/scheduleMeet"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/scheduleMeet", (req, res) => {
  scheduleMeet(req, res);
});

/**
 * Description
 * @param {any} "/addAttendee"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addAttendee", (req, res) => {
  addAttendee(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.meet = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});
