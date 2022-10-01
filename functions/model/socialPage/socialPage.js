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
const { addPost } = require("./tark/addPost");
const { addPostComment } = require("./tark/addPostComment");
const { getPosts } = require("./tark/getPosts");
const { addReaction } = require("./tark/addReaction");
const { removeReaction } = require("./tark/removeReaction");
const { getComments } = require("./tark/getComments");
const { deletePost } = require("./tark/deletePost");
const { deleteComment } = require("./tark/deleteComment");
const { getReactions } = require("./tark/getReactions");
/**
 * Description
 * @param {any} "/addPost"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addPost", (req, res) => {
    addPost(req, res);
});

/**
 * Description
 * @param {any} "/addPostComment"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addPostComment", (req, res) => {
    addPostComment(req, res);
});

/**
 * Description
 * @param {any} "/getAllPosts"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getAllPosts", (req, res) => {
    getPosts(req, res);
});

/**
 * Description
 * @param {any} "/deletePost"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
 fastify.post("/deletePost", (req, res) => {
    deletePost(req, res);
});

/**
 * Description
 * @param {any} "/deletePost"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
 fastify.post("/deleteComment", (req, res) => {
    deleteComment(req, res);
});

/**
 * Description
 * @param {any} "/addReaction"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addReaction", (req, res) => {
    addReaction(req, res);
});

/**
 * Description
 * @param {any} "/addReaction"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
 fastify.post("/removeReaction", (req, res) => {
    removeReaction(req, res);
});

/**
 * Description
 * @param {any} "/getComments"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
 fastify.post("/getComments", (req, res) => {
    getComments(req, res);
});

/**
 * Description
 * @param {any} "/getReactions"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
 fastify.post("/getReactions", (req, res) => {
    getReactions(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.socialPage = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
            if (err) throw err;
            requestHandler(req, res);
        });
    });
});