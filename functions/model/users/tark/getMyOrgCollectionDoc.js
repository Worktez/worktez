/* eslint-disable linebreak-style */
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

/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
const { getOrgUseAppKey } = require("../../organization/lib");
const { getMyOrgCollectionDoc } = require("../lib");

exports.getMyOrgCollectionDocs = function(request, response) {
    const uid = request.body.data.Uid;
    const orgAppKey = request.body.data.OrgAppKey;

    let status = 200;

    getOrgUseAppKey(orgAppKey).then((data) => {
        const orgDomain = data.OrganizationDomain;
        getMyOrgCollectionDoc(uid, orgDomain).then((orgDoc)=>{
            result = { data: {status: "Ok", data: orgDoc} };
            return response.status(status).send(result);
        }).catch((err) => {
            status = 500;
            console.error(err);
            return response.status(status).send(err);
        });
    }).catch((err) => {
        status = 500;
        console.error(err);
        return response.status(status).send(err);
    });
};