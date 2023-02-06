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

const { setRequest, getDemoRequestData, setDemoRequestData, updateDemoRequestData} = require("../lib");
const { demoRequestMailer } = require("../../mailer/lib");

exports.addRequest = function(request, response) {
  const componentName = request.body.data.ComponentName;
  const personName = request.body.data.PersonName;
  const emailAddress = request.body.data.EmailAddress;
  const contactNumber = request.body.data.ContactNumber;
  const orgName = request.body.data.OrgName;
  const date = request.body.data.CreationDate;
  const time = request.body.data.CreationTime;

  //  console.log(personName, emailAddress, contactNumber, orgName, date, time);
  let result;
  let status = 200;

  let demoRequestCounter = 0;
  const promise1 = getDemoRequestData().then((rawData) => {
    if (rawData==undefined) {
      setDemoRequestData().then(() => {
        demoRequestCounter = 1;
        const requestId = "R" + demoRequestCounter;

        setRequest(componentName, personName, emailAddress, requestId, contactNumber, orgName, date, time).then((postData) => {
        }).catch((error) => {
          result = { data: error };
          status = 500;
          console.error("Error", error);
        });
      });
    } else {
      demoRequestCounter = rawData.DemoRequestCounter;
      demoRequestCounter = demoRequestCounter + 1;
      const requestId = "R" + demoRequestCounter;

      setRequest(componentName ,personName, emailAddress, requestId, contactNumber, orgName, date, time).then((postData) => {
      }).catch((error) => {
        result = { data: error };
        status = 500;
        console.error("Error", error);
      });
    }
    const inputJson = {
      DemoRequestCounter: demoRequestCounter,
    };
    updateDemoRequestData(inputJson);
  });

  const Promises = [promise1];
  return Promise.all(Promises).then(() => {
    result = { data: "Request Added successfully" };
    demoRequestMailer("Demo_Request", personName, emailAddress, contactNumber, orgName);
    return response.status(status).send(result);
  }).catch((error) => {
    result = { data: error };
    console.error("Error adding Post", error);
    return response.status(status).send(result);
  });
};