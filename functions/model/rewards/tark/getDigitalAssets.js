/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Aditya Khedekar <aditya3034@gmail.com>
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

const { getAllDigitalAssets } = require("../lib");

exports.getDigitalAssets = (req, res) => {
  let result;
  let status = 200;

  const promise1 = getAllDigitalAssets().then((Rewards)=>{
    result = { data: {status: "OK", data: Rewards} };
  }).catch((error) => {
    result = { data: error };
    status = 500;
    console.error("Error", error);
  });
  return Promise.resolve(promise1).then(() => {
    console.log("Rewards Fetched Successfully");
    return res.status(status).send(result);
  }).catch((error) => {
    console.error("Error Fetching Rewards", error);
    return res.status(status).send(result);
  });
};