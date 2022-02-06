/* eslint-disable linebreak-style */
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

/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getAllPhotos } = require("../lib");

exports.getPhotoURLList = function(request, response) {
    const email = request.body.data.Email;
    const photoList=[];
    let status = 200;
    let result;

    const promise = getAllPhotos(email).then((doc) => {
        doc.forEach((url) => {
            photoList.push(url);
        });
    }).catch((error) => {
        status = 500;
        console.error("Error:", error);
    });

    const promises = [promise];
    Promise.all(promises).then(() => {
        result = { data: { status: "OK", data: photoList } };
        return response.status(status).send(result);
    })
    .catch((error) => {
        console.error("Error Creating list", error);
        result = { data: { status: "Error", data: undefined } };
        return response.status(status).send(result);
    });
};
