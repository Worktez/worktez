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

const { getApplicationData, updateApplication, generateBase64String } = require("../../application/lib");
const { addDigitalAssets } = require("../lib");


exports.addDigitalAssets = function(req, res) {
  console.log(req.body);
  const orgDomain = req.body.data.OrgDomain;
  const assetName = req.body.data.AssetName;
  const assetSvgurl = req.body.data.AssetSvgUrl;
  const assetSignature = generateBase64String(assetSvgurl);
  console.log(assetSignature);
  const assetType = req.body.data.AssetType;
  const orgDomains = [];
  orgDomains.push(orgDomain);

  let status = 200;


  const promise1 = getApplicationData().then((appData) => {
    const totalNumberOfDigitalAsset = appData.TotalNumberOfDigitalAsset + 1;
    const appDetailsUpdateJson = {
      TotalNumberOfDigitalAsset: totalNumberOfDigitalAsset,
    };
    const digitalAssetId = "Da" + totalNumberOfDigitalAsset;
    updateApplication(appDetailsUpdateJson);
    addDigitalAssets(digitalAssetId, assetName, assetSignature, assetType, orgDomains);
  }).catch((error) => {
    console.log("Error:", error);
  });

  let result;
  const promises = [promise1];
  return Promise.all(promises).then(() => {
    const arr = ["Created Digital Asset Successfully"];
    result = { data: arr };
    console.log("Created Digital Asset Successfully");
    return res.status(status).send(result);
  })
      .catch((error) => {
        status = 500;
        result = { data: error };
        console.error("Error Creating  Digital Asset", error);
        return res.status(status).send(result);
      });
};