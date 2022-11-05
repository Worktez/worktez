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


const { setApplication, getApplicationData, generateBase64String } = require("../../application/lib");
const { setUser, getUser } = require("../lib");

exports.createNewUser = function(request, response) {
  const user = request.body.data;
  const Uid = user.uid;
  const PhotoURL = user.photoURL;
  const DisplayName = user.displayName;
  const Email = user.email;
  const PhoneNumber = user.phoneNumber;
  const ProviderId = user.providerId;

  const date = new Date();
  const Username = generateBase64String(date.getMilliseconds() + "Random");

  let status = 200;

  const promise1 = getUser(Uid, "").then((data) => {
    if (data == undefined) {
      setUser(Uid, PhotoURL, DisplayName, Email, PhoneNumber, ProviderId, Username);
    }
  }).catch((err) => {
    status = 500;
    console.error("Error : " + err);
  });

  const promise2 = getApplicationData().then((data) => {
    console.log("Getting Application Data");
    if (data == undefined) {
      setApplication();
    }
  }).catch((err) => {
    status = 500;
    console.error("Error : " + err);
  });

  const Promises = [promise1, promise2];
  let result;
  return Promise.all(Promises).then(() => {
    result = { data: "User Logged In Successfully" };
    console.log("User Logged In Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = { data: error };
        console.error("Error LogIn/SignUp User", error);
        return response.status(status).send(result);
      });
};