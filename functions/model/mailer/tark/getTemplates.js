/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Vivek Kumar <vvksindia@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/


 const fs = require("fs");

 const fsReadFileHtml = (fileAddress) => {
  return new Promise((resolve, reject) => {
      fs.readFile(fileAddress, "utf8", (error, htmlString) => {
          if (!error && htmlString) {
              resolve(htmlString);
          } else {
              reject(error);
          }
      });
  });
};

exports.getTemplate = function(templateFile) {
  const dir = "model/mailer/templates/";
  const fileAddress = dir + templateFile;

  const promise = fsReadFileHtml(fileAddress);
  return Promise.resolve(promise);
};