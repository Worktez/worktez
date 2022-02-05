/***********************************************************
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
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const {setPatch, getPatchData} = require("../lib");

exports.setPatches = function() {
  getPatchData("Patch1").then((patch) => {
    if (patch == undefined) {
      setPatch("Patch1", "Counter Fix", "This patch Fixes all the counters for the team", "16/06/2021", "06/08/2021", "", "");
    }
  });

  getPatchData("Patch2").then((patch) => {
    if (patch == undefined) {
      setPatch("Patch2", "Patch2", "This patch adds a new field to all the tasks with a default value.", "18/07/2021", "06/08/2021", "", "");
    }
  });

  getPatchData("Patch3").then((patch) => {
    if (patch == undefined) {
      setPatch("Patch3", "Patch3", "This patch allows the user to change a particular field in relevent tasks, enter field name and field value to get the task details", "07/07/2021", "06/08/2021", "", "");
    }
  });

  getPatchData("Patch7").then((patch) => {
    if (patch == undefined) {
      setPatch("Patch7", "Patch7", "This patch allows the user to add new fields for Organization", "09/12/2021", "09/12/2021", "", "");
    }
  });

  getPatchData("Patch10").then((patch) => {
    if (patch == undefined) {
      setPatch("Patch10", "Patch10", "This patch allows the user to add new fields for my Organization", "31/12/2021", "31/12/2021", "", "");
    }
  });
};
