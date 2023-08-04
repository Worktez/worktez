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

const { db, currentDate } = require("../application/lib");

/**
 * Description
 * @param {any} AssetCreationDate
 *  @param {any} AssetId
 *  @param {any} AssetName
 *  @param {any} AssetSignature
 *  @param {any} AssetType
 *  @param {any} OrgDomain
 * * @return {any}
 */

exports.addDigitalAssets = (assetId, assetName, assetSignature, assetType, orgDomains, description)=>{
  const assetData = db.collection("DigitalAssets").doc(assetId).set({
    AssetCreationDate: currentDate,
    AssetId: assetId,
    AssetName: assetName,
    AssetSignature: assetSignature,
    AssetType: assetType,
    OrgDomains: orgDomains,
    Description: description,
  });
  return Promise.resolve(assetData);
};

/**
 * Description
 * @param {any} assetId
 * @return {any}
 */
exports.getDigitalAssets = function(assetId) {
  const getDigitalAssetPromise = db.collection("DigitalAssets").doc(assetId).get().then((doc) => {
    return doc.data();
  });
  return Promise.resolve(getDigitalAssetPromise);
};

/**
 * Description
 * @return {any}
 */
exports.getAllDigitalAssets = function() {
  const getDigitalAssetPromise = db.collection("DigitalAssets").get().then((doc) => {
    const data=[];
    doc.forEach((element) => {
      if (element.exists) {
        data.push( element.data());
      }
    });
    return data;
  });
  return Promise.resolve(getDigitalAssetPromise);
};


