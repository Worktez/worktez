/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Pon Raja Prabhu S K <ponrajaprabhusk@gmail.com>
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

 const { getTask, updateTask } = require("../../tasks/lib");
 const { removeLinkDoc, getLinkData } = require("../lib");

 exports.removeLink = function(request, response) {
     const orgDomain = request.body.data.OrgDomain;
     const taskId = request.body.data.TaskId;
     const linkId = request.body.data.LinkId;
     const linkType = request.body.data.LinkType;

     let status = 200;
     let result;
     const promise = getTask(taskId, orgDomain).then((taskDetail) => {
         if (taskDetail == undefined) {
             result = {data: {status: 500}};
         } else {
             removeLinkDoc(orgDomain, taskId, linkId);
             const p1 = getLinkData(orgDomain, taskId, linkId).then((linkDetail)=>{
                const linkdata = linkDetail.data();
                if (linkType == "PR" && linkdata.LinkURL == taskDetail.PrLink) {
                    const inputJson = {
                        PrNumber: null,
                        PrLink: "",
                        PrApiLink: "",
                    };
                    updateTask(inputJson, orgDomain, taskId);
                 }
             });
         }
     }).catch((error) => {
         status = 500;
         console.error("Error:", error);
     });
     Promise.resolve(promise).then(() => {
         result = { data: {status: "OK"} };
         console.log("Link Added Successfully");
         return response.status(status).send(result);
     })
     .catch((error) => {
         result = { data: error };
         console.error("Error Adding Link", error);
         return response.status(status).send(result);
     });
 };