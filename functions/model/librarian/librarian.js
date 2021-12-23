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
const { uploadFileToOrgDocuments } = require("./uploadFileToOrgDocuments");
const { getFilesInOrgDocument } = require("./getFilesInOrgDocuments");
const { uploadFileToContributorsDocuments } = require("./uploadFileToContributorsDocuments");


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
        } else if (mode == "UploadFileToOrgDocuments") {
            return uploadFileToOrgDocuments(request, response);
        } else if (mode == "GetFilesInOrgDocument") {
            return getFilesInOrgDocument(request, response);
        } else if (mode == "uploadFileToContributorsDocuments") {
            return uploadFileToContributorsDocuments(request, response);
        }
    });
});