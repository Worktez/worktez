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

const { verificationMailer } = require("../../mailer/lib");

exports.sendVerificationEmail = function(teamName, teamManagerEmail, teamDescription, userEmail, organizationDomain, teamId) {
  verificationMailer("Verification_Mail", teamName, teamManagerEmail, userEmail, organizationDomain, teamId);
};