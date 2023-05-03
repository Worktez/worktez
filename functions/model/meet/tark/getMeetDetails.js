/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * Author : Sanjay Krishna S R <sanjaykrishna1203@gmail.com>
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const {getMeetDetails} = require("../lib");

exports.getMeetDetails = function(request, response) {
  const email = request.body.data.Email;
  const onlyToday = request.body.data.OnlyToday;
  let status = 200;
  let result;
  let date = "";
  if (onlyToday) {
    date = formatDate(new Date());
  }
  const getMeetDetailsPromise = getMeetDetails(email, date).then((meetData) => {
    if (meetData) {
      result = {data: {status: "OK", data: meetData}};
    } else {
      result = {data: {status: "Not Found", data: undefined}};
    }
  }).catch((error) => {
    status = 500;
    console.error("Error:", error);
  });

  const promises = [getMeetDetailsPromise];
  Promise.all(promises).then(() => {
    console.log("Got Meetings Sucessfully", result);
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Getting Meetings", error);
    return response.status(status).send(result);
  });
};

/**
 * Description
 * @param {any} date
 * @return {any} Formatted Date as yyyy-mm-dd
 */
function formatDate(date) {
  const d = new Date(date);
  // @TODO Convert GMT to IST or Get time from the client machines
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join("-");
}
