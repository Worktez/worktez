/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
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
const { getFilesInUser } = require("./tark/getFilesInUser");
const { getFilesInOrganization } = require("./tark/getFilesInOrganizationLogo");

/**
 * Description
 * @param {any} "/deleteFilesInTask"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/deleteFilesInTask", (req, res) => {
    deleteFilesInTask(req, res);
});

/**
 * Description
 * @param {any} "/deleteFilesInOrg"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/deleteFilesInOrg", (req, res) => {
    deleteFilesInOrg(req, res);
});

/**
 * Description
 * @param {any} "/uploadFileToContributorsDocuments"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/uploadFileToContributorsDocuments", (req, res) => {
    uploadFileToContributorsDocuments(req, res);
});

/**
 * Description
 * @param {any} "/getFilesInOrgDocument"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getFilesInOrgDocument", (req, res) => {
    getFilesInOrgDocument(req, res);
});

/**
 * Description
 * @param {any} "/getFilesInTask"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getFilesInTask", (req, res) => {
    getFilesInTask(req, res);
});

/**
 * Description
 * @param {any} "/uploadFileToOrgDocuments"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/uploadFileToOrgDocuments", (req, res) => {
    uploadFileToOrgDocuments(req, res);
});

/**
 * Description
 * @param {any} "/uploadFileToTask"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/uploadFileToTask", (req, res) => {
    uploadFileToTask(req, res);
});

/**
 * Description
 * @param {any} "/uploadLogoFile"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/uploadLogoFile", (req, res) => {
    uploadLogoFile(req, res);
});

/**
 * Description
 * @param {any} "/uploadUserProfilePic"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/uploadUserProfilePic", (req, res) => {
    uploadProfilePicToUserDoc(req, res);
});

/**
 * Description
 * @param {any} "/uploadPostImages"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
 fastify.post("/uploadPostImages", (req, res) => {
    uploadPostImagesDoc(req, res);
});

/**
 * Description
 * @param {any} "/uploadUserProfilePic"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
 fastify.post("/getFilesInUser", (req, res) => {
    getFilesInUser(req, res);
});

/**
 * Description
 * @param {any} "/getFilesInOrganization"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
 fastify.post("/getFilesInOrganization", (req, res) => {
    getFilesInOrganization(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.librarian = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
            if (err) throw err;
            requestHandler(req, res);
        });
    });
});