/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if


const { functions, cors } = require("../application/lib");

const { createNewTask } = require("./createTask");
const { deleteTask } = require("./deleteTask");
const { editTask } = require("./editTask");
const { logWork } = require("./logwork");
const { addComment } = require("./addComment");
const { getTaskDetails } = require("./getTaskDetails");
const { uploadFileToTask } = require("./uploadFileToTask");
const { getFilesInTask } = require("./getFilesInTask");
const { deleteFilesInTask } = require("./deleteFilesInTask");
const { getTasks } = require("./getTasks");
const { getLinkDetails } = require("./getLinkDetails");
const { setLinkDetails } = require("./setLinkDetails");

exports.tasks = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const mode = request.body.data.mode;

        if (mode == "create") {
            return createNewTask(request, response);
        } else if (mode == "edit") {
            return editTask(request, response);
        } else if (mode == "log") {
            return logWork(request, response);
        } else if (mode == "delete") {
            return deleteTask(request, response);
        } else if (mode == "comment") {
            return addComment(request, response);
        } else if (mode == "getTaskDetails") {
            return getTaskDetails(request, response);
        } else if (mode == "getLink") {
            return getLinkDetails(request, response);
        } else if (mode == "setLink") {
            return setLinkDetails(request, response);
        } else if (mode == "UploadFileToTask") {
            return uploadFileToTask(request, response);
        } else if (mode == "GetFilesInTask") {
            return getFilesInTask(request, response);
        } else if (mode == "DeleteFilesInTask") {
            return deleteFilesInTask(request, response);
        } else if (mode == "getAllTasks") {
            return getTasks(request, response);
        }
    });
});