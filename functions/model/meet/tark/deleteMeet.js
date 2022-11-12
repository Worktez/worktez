/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Muskan Singh <singhmuskan2603@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/


const {getUserMeetDetailsById, updateUserMeetDetails} = require("../lib");

exports.deleteMeet = function(request, response) {
  const docId = request.body.data.Id;
  const uid = request.body.data.Uid;
  let result;
  const status = 200;
  console.log(docId, uid, "checkkkkkkkkkkkk");
  const promise = getUserMeetDetailsById(uid, docId).then((MeetData) => {
    console.log(MeetData);
    if (MeetData == undefined) {
      result = {data: {status: "Meet does not exist"}};
    } else {
      const updateMeetDetailsToJson = {
        Status: "DELETED",
      };
      updateUserMeetDetails(uid, docId, updateMeetDetailsToJson);
      console.log("meet details check");
    }
  }).catch((error) => {
    // eslint-disable-next-line no-const-assign
    status = 500;
    console.log("Error:", error);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Meet Deleted Successfully");
    return response.status.send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error Deleting", error);
    return response.status(status).send(result);
  });
};