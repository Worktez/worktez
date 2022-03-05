/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
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

const { db } = require("../application/lib");

/**
 * Description
 * @return {any}
 */
exports.getContributors = function() {
    const query = db.collection("Contributors");

    const promise = query.get().then((docs) => {
        const contributors = [];
        docs.forEach((element) => {
            if (element.exists) {
                contributors.push(element.data());
            }
        });
        return contributors;
    });

    return Promise.resolve(promise);
};

/**
 * Description
 * @param {any} docId
 * @param {any} email
 * @param {any} about
 * @param {any} photoUrl
 * @param {any} title
 * @param {any} name
 * @return {any}
 */
exports.setContributors = function(docId, email, about, photoUrl, title, name) {
    console.log(about);
    const P1 = db.collection("Contributors").doc(docId).set({
        Email: email,
        About: about,
        PhotoUrl: photoUrl,
        Title: title,
        Name: name,
        ContributorId: docId,
    });
    return Promise.resolve(P1);
};