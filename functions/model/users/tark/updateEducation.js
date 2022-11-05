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


const { updateUserEducation } = require("../lib");
const { profileMailer } = require("../../mailer/lib");

exports.updateEducation = function(request, response) {
  const educationDoc = request.body.data.EducationId;
  const uid = request.body.data.Uid;
  const instituteName = request.body.data.InstituteName;
  const degree = request.body.data.Degree;
  const start = request.body.data.Start;
  const end = request.body.data.End;
  const displayName = request.body.data.DisplayName;
  const email = request.body.data.Email;

  let result;

  const inputJson = {
    Start: start,
    End: end,
    InstituteName: instituteName,
    Degree: degree,
  };
  updateUserEducation(uid, educationDoc, inputJson).then(() => {
    profileMailer("Update_Education_Profile", uid, email, displayName);
    result = { data: "User Education updated successfully" };
    return response.status(200).send(result);
  }).catch((error) => {
    result = { data: error };
    console.error("Error", error);
    return response.status(500).send(result);
  });
};