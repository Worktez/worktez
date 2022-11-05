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

const { db } = require("../application/lib");

/**
 * Description
 * @param {any} userEmail
 * @param {any} subjectMessage
 * @param {any} htmlMessage
 * @return {any}
 */
exports.sendMail = function(userEmail, subjectMessage, htmlMessage) {
  const sendEmailPromise = db.collection("mail").add({
    to: userEmail,
    message: {
      subject: subjectMessage,
      html: htmlMessage,
    },
  });
  return Promise.resolve(sendEmailPromise);
};