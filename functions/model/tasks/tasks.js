/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors } = require("../application/lib");

const { createTask } = require("./createTask");

exports.tasks = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const mode = request.body.data.mode;

        if (mode == "create") {
            return createTask(request, response);
        }
    });
});