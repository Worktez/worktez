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


const { updateUser, getUser } = require("../lib");
// const { sendMail } = require("../../email/lib");
const { profileMailer } = require("../../mailer/lib");

exports.updateUserSkill = function(request, response) {
  const uid = request.body.data.Uid;
  const displayName = request.body.data.DisplayName;
  const newSkill = request.body.data.Skill;
  const email = request.body.data.Email;

  let result;
  let status = 200;

  const promise1 = getUser(uid, "").then((userDoc) => {
    const prevSkill = userDoc.Skills;
    if (!prevSkill.includes(newSkill) && newSkill != "" && newSkill != undefined) {
      prevSkill.push(newSkill);
    }
    const updateUserInputJson = {
      Skills: prevSkill,
    };
    updateUser(updateUserInputJson, uid).then(() => {
      // sendMail(email, subjectMessage, htmlMessage);
      profileMailer("Update_Skill_Profile", uid, email, displayName);
    }).catch((error) => {
      status = 500;
      console.error("Error", error);
    });
  });
  return Promise.resolve(promise1).then(() => {
    result = { data: "User Skills updated successfully" };
    return response.status(status).send(result);
  }).catch((error) => {
    result = { data: error };
    status = 500;
    console.error("Error", error);
    return response.status(status).send(result);
  });
};