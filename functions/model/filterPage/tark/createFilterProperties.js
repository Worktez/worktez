/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

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

const {setFilterProperties} = require("../lib");

exports.createFilterProperties = function(orgDomain, teamName, type, statusFilter, priorityFilter, teamFilter) {
  let scope;
  let filterName;
  let docNumber = 0;

  priorityFilter.forEach((element) => {
    filterName = element;
    scope = "Priority";
    docNumber++;
    const docID = "F" + docNumber;
    setFilterProperties(orgDomain, teamName, docID, filterName, scope);
  });

  statusFilter.forEach(() => {
    filterName = element;
    scope = "Status";
    docNumber++;
    const docId = "L" + docNumber;
    setFilterProperties(orgDomain, teamName, docId, filterName, scope);
  });
};

