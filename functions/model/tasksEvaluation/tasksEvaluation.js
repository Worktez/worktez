/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { readTasksEvaluationData } = require("./tark/readTasksEvalulationData");

  fastify.post("/readTasksEvaluationData", (req, res) => {
    readTasksEvaluationData(req, res);
  });

  exports.tasksEvaluation = functions.https.onRequest((req, res) => {
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
        // if (mode == "readTasksEvaluationData") {
        //     return readTasksEvaluationData(request, response);
        // }
