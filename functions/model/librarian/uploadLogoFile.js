/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const { setFileToOrg} = require("./lib");
const { getOrgUseAppKey, updateOrg } = require("../organization/lib");

exports.uploadLogoFile = function(request, response) {
  const fileName = request.body.data.FileName;
  const fileUrl = request.body.data.FileUrl;
  const lastModified = request.body.data.LastModified;
  const size = request.body.data.Size;
  const appKey = request.body.data.AppKey;
  const uid = request.body.data.Uid;
  const date = request.body.data.Date;
  const time = request.body.data.Time;
  const basePath = request.body.data.BasePath;

  let result;
  let status = 200;
  
  const promise = getOrgUseAppKey(appKey).then((orgDetail) => {
    const orgDomain = orgDetail.OrganizationDomain;
    const orgId = orgDetail.OrganizationId;
    let logoCounter = orgDetail.LogoCounter;
    logoCounter++;
    const logoFileName = "Logo"+logoCounter;

    const updateLogoFileJson = {
      FileName: fileName,
      FileUrl: fileUrl,
      LastModified: lastModified,
      Size: size,
      Uid: uid,
      Date: date,
      Time: time,
      OrgId: orgId,
      LogoFileName: logoFileName,
      BasePath: basePath,
      FileStatus: "OK",
    };
    setFileToOrg(updateLogoFileJson, orgDomain, logoFileName);

    const updateLogoCounterJson = {
      LogoCounter: logoCounter,
    };

    updateOrg(orgDomain, updateLogoCounterJson);
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  Promise.resolve(promise).then(() => {
    result = { data: {status: "OK"} };
    console.log("Logo File Uploaded Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = { data: error };
        console.error("Error Uploading", error);
        return response.status(status).send(result);
      });
};
