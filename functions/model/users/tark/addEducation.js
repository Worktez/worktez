/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

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


const { addUserEducation, getUser, updateUser } = require("../lib");
const { profileMailer } = require("../../mailer/lib");

exports.addEducation = function(request, response) {
  const uid = request.body.data.Uid;
  const instituteName = request.body.data.InstituteName;
  const degree = request.body.data.Degree;
  const start = request.body.data.Start;
  const end = request.body.data.End;
  const displayName = request.body.data.DisplayName;
  const email = request.body.data.Email;

  let result;
  let status = 200;

  const promise1 = getUser(uid, "").then((userData) => {
    let educationCounter = userData.EducationCounter;
    educationCounter += 1;
    const updateUserDocJson = {
      EducationCounter: educationCounter,
    };
    updateUser(updateUserDocJson, uid);
  });

  const promise2 = addUserEducation(uid, instituteName, degree, start, end).then(() => {
    profileMailer("Add_Education_Profile", uid, email, displayName);
    result = { data: "User Education updated successfully" };
  }).catch((error) => {
    result = { data: error };
    status = 500;
    console.error("Error", error);
  });

  const Promises = [promise1, promise2];
  return Promise.all(Promises).then(() => {
    result = { data: "User Education updated successfully" };
    return response.status(status).send(result);
  }).catch((error) => {
    result = { data: error };
    console.error("Error adding education", error);
    return response.status(status).send(result);
  });
};