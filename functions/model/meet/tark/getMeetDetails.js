/* eslint-disable linebreak-style */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Aditya Khedekar <aditya3034@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const {getMeetDetails} = require("../lib");

exports.getMeetDetails = function(request, response) {
    const uid = request.body.data.Uid;

    let status = 200;

    const getMeetDetailsPromise = getMeetDetails(uid).then((meetData) => {
        if (meetData) {
              result = { data: {status: "OK", data: meetData} };
        }
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const promises = [getMeetDetailsPromise]
    Promise.all(promises).then(() => {
            console.log("Got Task Sucessfully");
            return response.status(status).send(result);
        })
        .catch((error) => {
            console.error("Error Getting Tasks", error);
            return response.status(status).send(result);
        });
};
