/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if


const { functions, cors } = require("../application/lib");

const { uploadFileToTask } = require("./uploadFileToTask");
const { getFilesInTask } = require("./getFilesInTask");
const { deleteFilesInTask } = require("./deleteFilesInTask");
const { uploadLogoFile } = require("./uploadLogoFile");


exports.librarian = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const mode = request.body.data.mode;

        if (mode == "UploadFileToTask") {
            return uploadFileToTask(request, response);
        } else if (mode == "GetFilesInTask") {
            return getFilesInTask(request, response);
        } else if (mode == "DeleteFilesInTask") {
            return deleteFilesInTask(request, response);
        } else if (mode == "UploadLogoFile") {
            return uploadLogoFile(request, response);
        }
    });
});