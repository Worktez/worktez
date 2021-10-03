/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors } = require("../application/lib");
const { readTasksEvaluationData } = require("./readTasksEvalulationData");

exports.tasksEvaluation = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const mode = request.body.data.mode;
        if (mode == "readTasksEvaluationData") {
            return readTasksEvaluationData(request, response);
        }
    });
});