/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Twinkle Chatterjee (ctwinkle2812@gmail.com)
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

 exports.getTemplate1 = function() {
    return new Promise((resolve, reject) => {
        const success = false;
        if (success) {
          const workDone = "Here is the thing I built";
          resolve(workDone);
        } else {
          const why = "Still working on something else";
          reject(why);
        }
      });
 };

exports.getTemplate = function(templateFile) {
  const dir = "model/mailer/templates/";
  const fileAddress = dir + templateFile;
  let result;
  const promise1 = fs.access(dir, fs.constants.F_OK, (err) => {
        if (err) {
            console.log("mailer doesn't exit", process.cwd());
        }
        const p1 = fs.readFile(fileAddress, (err, buff) => {
            // if any error
            if (err) {
                console.error(err);
                return;
            }
            // otherwise log contents
            // console.log(buff.toString());
            result = buff.toString();
            return result;
        });
        return Promise.resolve(p1);
        // buffer = fs.readFileSync(dir + templateFile).toString();
    });
    if (Promise.resolve(promise1)) {
        return result;
    }
};