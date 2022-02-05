/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const { functions, cors, fastify, requestHandler } = require("../application/lib");

const { uploadFileToTask } = require("./tark/uploadFileToTask");
const { getFilesInTask } = require("./tark/getFilesInTask");
const { deleteFilesInTask } = require("./tark/deleteFilesInTask");
const { uploadLogoFile } = require("./tark/uploadLogoFile");
const { uploadFileToOrgDocuments } = require("./tark/uploadFileToOrgDocuments");
const { getFilesInOrgDocument } = require("./tark/getFilesInOrgDocuments");
const { uploadFileToContributorsDocuments } = require("./tark/uploadFileToContributorsDocuments");
const { uploadProfilePicToUserDoc } = require("./tark/uploadUserProfilePic");
const { deleteFilesInOrg } = require("./tark/deleteFilesInOrg");

fastify.post("/deleteFilesInTask", (req, res) => {
    deleteFilesInTask(req, res);
});

fastify.post("/deleteFilesInOrg", (req, res) => {
    deleteFilesInOrg(req, res);
});

fastify.post("/uploadFileToContributorsDocuments", (req, res) => {
    uploadFileToContributorsDocuments(req, res);
});

fastify.post("/getFilesInOrgDocument", (req, res) => {
    getFilesInOrgDocument(req, res);
});

fastify.post("/getFilesInTask", (req, res) => {
    getFilesInTask(req, res);
});

fastify.post("/uploadFileToOrgDocuments", (req, res) => {
    uploadFileToOrgDocuments(req, res);
});

fastify.post("/uploadFileToTask", (req, res) => {
    uploadFileToTask(req, res);
});

fastify.post("/uploadLogoFile", (req, res) => {
    uploadLogoFile(req, res);
});

fastify.post("/uploadUserProfilePic", (req, res) => {
    uploadProfilePicToUserDoc(req, res);
});

exports.librarian = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
            if (err) throw err;
            requestHandler(req, res);
        });
        // const mode = request.body.data.mode;

        // if (mode == "UploadFileToTask") {
        //     return uploadFileToTask(request, response);
        // } else if (mode == "GetFilesInTask") {
        //     return getFilesInTask(request, response);
        // } else if (mode == "DeleteFilesInTask") {
        //     return deleteFilesInTask(request, response);
        // } else if (mode == "UploadLogoFile") {
        //     return uploadLogoFile(request, response);
        // } else if (mode == "UploadFileToOrgDocuments") {
        //     return uploadFileToOrgDocuments(request, response);
        // } else if (mode == "GetFilesInOrgDocument") {
        //     return getFilesInOrgDocument(request, response);
        // }
    });
});