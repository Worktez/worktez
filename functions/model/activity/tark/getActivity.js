/* eslint-disable linebreak-style */

/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

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

const { getAction } = require("../lib");

exports.getActivity = function(request, response) {
  const status = 200;
  let actionType = request.body.data.ActionType;
  const taskId = request.body.data.TaskId;
  const orgDomain = request.body.data.OrgDomain;
  const resultData = [];

  if (actionType == "All") {
    actionType = "";
  }

  const promise1 = getAction(orgDomain, taskId, actionType).then((snapshot) => {
    snapshot.forEach((element) => {
      resultData.unshift(element.data());
    });
  });

  return Promise.resolve(promise1).then(() => {
    const result = { data: { status: "Ok", data: resultData } };
    return response.status(status).send(result);
  })
      .catch((error) => {
        console.error(error);
        const result = { data: { status: "Error", data: undefined } };
        return response.status(status).send(result);
      });
};